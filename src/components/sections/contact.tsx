"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { EASE, Reveal } from "@/components/motion/reveal";
import { ActionButton } from "@/components/ui/action";
import { profile } from "@/data/profile";
import {
  budgetOptions,
  contactSchema,
  projectTypes,
  type ContactInput,
  type ContactResponse,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border border-line-2/60 bg-surface/60 px-4 py-3.5 text-sm text-fg placeholder:text-muted transition-all duration-300 focus:border-accent focus:bg-surface focus:outline-none";

const initial: ContactInput = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
  website: "",
};

export function Contact() {
  const [status, setStatus] = useState<ContactResponse | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ defaultValues: initial });

  async function onSubmit(values: ContactInput) {
    setStatus(null);

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      for (const [field, messages] of Object.entries(
        parsed.error.flatten().fieldErrors,
      )) {
        setError(field as keyof ContactInput, {
          type: "validate",
          message: messages?.[0] ?? "Invalid value.",
        });
      }
      setStatus({ ok: false, message: "Please check the highlighted fields." });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result: ContactResponse = await response.json();
      setStatus(result);
      if (result.ok) reset(initial);
    } catch {
      setStatus({
        ok: false,
        message: `Network error. Reach me directly at ${profile.email}.`,
      });
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal direction="none">
          <div className="flex items-center gap-4">
            <span className="label text-accent">06</span>
            <span className="h-px flex-1 bg-line" />
            <span className="label">Contact</span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="text-4xl leading-[1.03] font-medium tracking-[-0.035em] text-fg sm:text-5xl">
                Let&apos;s build something
                <span className="block font-serif italic text-accent">
                  worth shipping.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <p className="max-w-md text-base leading-relaxed text-fg-dim">
                Tell me about the project - the goal, the timeline and anything
                already in progress. I reply to every serious enquiry within one
                business day.
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-12">
              <dl className="divide-y divide-line/70">
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="label">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm break-all text-fg-dim transition-colors hover:text-accent"
                    >
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="label">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${profile.phoneHref}`}
                      className="text-sm text-fg-dim transition-colors hover:text-accent"
                    >
                      {profile.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="label">Location</dt>
                  <dd className="text-sm text-fg-dim">{profile.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="label">LinkedIn</dt>
                  <dd>
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-fg-dim transition-colors hover:text-accent"
                    >
                      dev-muhammad-kamran ↗
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.12} direction="left">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="panel p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name?.message} required>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    className={fieldBase}
                  />
                </Field>

                <Field label="Email" error={errors.email?.message} required>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    className={fieldBase}
                  />
                </Field>

                <Field label="Company" error={errors.company?.message}>
                  <input
                    {...register("company")}
                    type="text"
                    placeholder="Optional"
                    autoComplete="organization"
                    className={fieldBase}
                  />
                </Field>

                <Field label="Project type" error={errors.projectType?.message}>
                  <select {...register("projectType")} className={cn(fieldBase, "appearance-none pr-10")}>
                    <option value="">Select one</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-surface">
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Budget range"
                  error={errors.budget?.message}
                  className="sm:col-span-2"
                >
                  <select {...register("budget")} className={cn(fieldBase, "appearance-none pr-10")}>
                    <option value="">Select a range</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option} className="bg-surface">
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Project details"
                  error={errors.message?.message}
                  required
                  className="sm:col-span-2"
                >
                  <textarea
                    {...register("message")}
                    rows={6}
                    placeholder="What are you building, and what does success look like?"
                    className={cn(fieldBase, "resize-y")}
                  />
                </Field>

                {/* Honeypot - hidden from users, tempting to bots. */}
                <input
                  {...register("website")}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <ActionButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send enquiry"}
                </ActionButton>
                <p className="label max-w-[16rem] leading-relaxed">
                  Your details stay private and are never shared.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {status ? (
                  <motion.p
                    key={status.message}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    role="status"
                    aria-live="polite"
                    className={cn(
                      "mt-6 border-l-2 py-2 pl-4 text-sm",
                      status.ok
                        ? "border-accent text-fg"
                        : "border-ember text-ember",
                    )}
                  >
                    {status.message}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  required,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="label mb-2.5 flex items-center gap-2">
        {label}
        {required ? <span className="text-accent">*</span> : null}
      </span>
      {children}
      {error ? (
        <span className="mt-2 block font-mono text-[0.625rem] tracking-[0.08em] text-ember">
          {error}
        </span>
      ) : null}
    </label>
  );
}
