import { NextResponse } from "next/server";

import {
  contactSchema,
  type ContactResponse,
} from "@/lib/contact-schema";

export const runtime = "nodejs";

/** Fallback address shown whenever an enquiry cannot be delivered. */
const RECIPIENT_EMAIL = process.env.CONTACT_TO || "muhammadkamranyar@gmail.com";

/**
 * Without this key there is no way to deliver an enquiry in production.
 */
const canDeliver = Boolean(process.env.RESEND_API_KEY);

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

interface AttachmentPayload {
  filename: string;
  content: string; // Base64 string
}

/**
 * Delivers the enquiry through Resend to muhammadkamranyar@gmail.com.
 */
async function deliver(payload: {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
  attachment?: AttachmentPayload;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = RECIPIENT_EMAIL;

  if (!apiKey) {
    console.info("[contact] enquiry received (no RESEND_API_KEY set):", {
      ...payload,
      attachment: payload.attachment
        ? `Attachment: ${payload.attachment.filename} (${payload.attachment.content.length} chars)`
        : "None",
    });
    return;
  }

  const plainText = [
    `New enquiry from ${payload.name}`,
    `----------------------------------------`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || "-"}`,
    `Project Type: ${payload.projectType || "-"}`,
    `Budget: ${payload.budget || "-"}`,
    payload.attachment ? `Attachment: ${payload.attachment.filename}` : "",
    "",
    "Project Details:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 20px; font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">
        📬 New Portfolio Enquiry
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 120px;">Name</td>
          <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${escapeHtml(payload.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email</td>
          <td style="padding: 8px 0; color: #0f172a;">
            <a href="mailto:${escapeHtml(payload.email)}" style="color: #2563eb; text-decoration: none; font-weight: 500;">
              ${escapeHtml(payload.email)}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company</td>
          <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(payload.company || "-")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Project Type</td>
          <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(payload.projectType || "-")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Budget</td>
          <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(payload.budget || "-")}</td>
        </tr>
        ${
          payload.attachment
            ? `<tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Attachment</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">📎 ${escapeHtml(
                  payload.attachment.filename,
                )} (Attached)</td>
              </tr>`
            : ""
        }
      </table>
      
      <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 16px; border-radius: 6px;">
        <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">
          Message
        </p>
        <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(
          payload.message,
        )}</p>
      </div>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center;">
        Reply directly to this email to respond to ${escapeHtml(payload.name)}.
      </div>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Muhammad Kamran <onboarding@resend.dev>",
      to: [to],
      reply_to: payload.email,
      subject: `New enquiry - ${payload.name} [Portfolio]`,
      text: plainText,
      html: htmlContent,
      attachments: payload.attachment
        ? [
            {
              filename: payload.attachment.filename,
              content: payload.attachment.content,
            },
          ]
        : undefined,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend responded with ${response.status}: ${errorText}`);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

  const contentType = request.headers.get("content-type") ?? "";
  let bodyData: Record<string, unknown> = {};
  let attachment: AttachmentPayload | undefined = undefined;

  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (key === "file" && value instanceof File && value.size > 0) {
          // 5MB limit
          if (value.size > 5 * 1024 * 1024) {
            return NextResponse.json<ContactResponse>(
              { ok: false, message: "File is too large. Maximum size is 5MB." },
              { status: 422 },
            );
          }
          const arrayBuffer = await value.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          attachment = {
            filename: value.name,
            content: buffer.toString("base64"),
          };
        } else if (typeof value === "string") {
          bodyData[key] = value;
        }
      }
    } catch {
      return NextResponse.json<ContactResponse>(
        { ok: false, message: "Failed to process form submission." },
        { status: 400 },
      );
    }
  } else {
    try {
      bodyData = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json<ContactResponse>(
        { ok: false, message: "Malformed request body." },
        { status: 400 },
      );
    }
  }

  const parsed = contactSchema.safeParse(bodyData);

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

  // Honeypot tripped - accept silently so bots do not learn anything.
  if (parsed.data.website) {
    return NextResponse.json<ContactResponse>({
      ok: true,
      message: "Thanks - your message is on its way.",
    });
  }

  const { name, email, company, projectType, budget, message } = parsed.data;

  if (!canDeliver && process.env.NODE_ENV === "production") {
    console.error(
      "[contact] RESEND_API_KEY is not configured - enquiry was NOT delivered. " +
        "Set RESEND_API_KEY, CONTACT_TO and CONTACT_FROM in the deployment environment.",
      { name, email, company, projectType, budget, message },
    );
    return NextResponse.json<ContactResponse>(
      {
        ok: false,
        message: `Message delivery is temporarily unavailable. Please email me directly at ${RECIPIENT_EMAIL} and I'll reply within one business day.`,
      },
      { status: 503 },
    );
  }

  try {
    await deliver({
      name,
      email,
      company,
      projectType,
      budget,
      message,
      attachment,
    });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json<ContactResponse>(
      {
        ok: false,
        message: `Something went wrong delivering your message. Email me directly at ${RECIPIENT_EMAIL}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json<ContactResponse>({
    ok: true,
    message: "Thanks for reaching out - I usually reply within one business day.",
  });
}
