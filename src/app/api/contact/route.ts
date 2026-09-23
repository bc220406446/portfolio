import { NextResponse } from "next/server";

import {
  contactSchema,
  type ContactResponse,
} from "@/lib/contact-schema";

export const runtime = "nodejs";

/** Small in-memory throttle: 5 submissions per IP per 10 minutes. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t > WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

/**
 * Delivers the enquiry through Resend when RESEND_API_KEY is configured.
 * Without it the message is still validated and accepted, so the form works in
 * development and preview deployments.
 */
async function deliver(payload: {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "muhammadkamranyar@gmail.com";

  if (!apiKey) {
    console.info("[contact] enquiry received (no RESEND_API_KEY set)", payload);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: payload.email,
      subject: `New enquiry — ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company || "—"}`,
        `Project type: ${payload.projectType || "—"}`,
        `Budget: ${payload.budget || "—"}`,
        "",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded with ${response.status}`);
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json<ContactResponse>(
      { ok: false, message: "Too many messages sent. Please try again later." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json<ContactResponse>(
      { ok: false, message: "Malformed request body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return NextResponse.json<ContactResponse>(
      {
        ok: false,
        message: "Please correct the highlighted fields.",
        errors: errors as Record<string, string[]>,
      },
      { status: 422 },
    );
  }

  // Honeypot tripped — accept silently so bots do not learn anything.
  if (parsed.data.website) {
    return NextResponse.json<ContactResponse>({
      ok: true,
      message: "Thanks — your message is on its way.",
    });
  }

  const { name, email, company, projectType, budget, message } = parsed.data;

  try {
    await deliver({ name, email, company, projectType, budget, message });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json<ContactResponse>(
      {
        ok: false,
        message:
          "Something went wrong on my side. Email me directly at muhammadkamranyar@gmail.com.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json<ContactResponse>({
    ok: true,
    message: "Thanks for reaching out — I usually reply within one business day.",
  });
}
