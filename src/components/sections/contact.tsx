"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FileText, Paperclip, UploadCloud, X } from "lucide-react";

import { EASE, Reveal } from "@/components/motion/reveal";
import { ActionButton } from "@/components/ui/action";
import { Section, SectionHeading } from "@/components/ui/section";
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    defaultValues: initial,
    mode: "onTouched",
  });

  function handleFileSelect(selectedFile: File | null | undefined) {
    setFileError(null);
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFileError("File is too large. Maximum size is 5MB.");
      return;
    }

    setFile(selectedFile);
  }

  function handleFileRemove() {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

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
      const formData = new FormData();
      formData.append("name", parsed.data.name);
      formData.append("email", parsed.data.email);
      if (parsed.data.company) formData.append("company", parsed.data.company);
      if (parsed.data.projectType) formData.append("projectType", parsed.data.projectType);
      if (parsed.data.budget) formData.append("budget", parsed.data.budget);
      formData.append("message", parsed.data.message);
      if (parsed.data.website) formData.append("website", parsed.data.website);
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result: ContactResponse = await response.json();
      setStatus(result);
      if (result.ok) {
        reset(initial);
        setFile(null);
        setFileError(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch {
      setStatus({
        ok: false,
        message: `Network error. Reach me directly at ${profile.email}.`,
      });
    }
  }

  return (
    <Section id="contact" className="border-t border-line">
      <SectionHeading
        title="Let's build something"
        description="Have a product idea, a project in mind, or an interesting problem to solve? Let's talk."
      />

      <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <Reveal delay={0.18}>
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
                  <dt className="label">WhatsApp</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${profile.phoneHref}`}
                      target="_blank"
                      rel="noreferrer noopener"
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
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="label">GitHub</dt>
                  <dd>
                    <a href={profile.links.github} target="_blank" rel="noreferrer noopener" className="text-sm text-fg-dim transition-colors hover:text-accent">
                      github.com/bc220406446 ↗
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
                    {...register("name", {
                      required: "Please enter your name.",
                      minLength: { value: 2, message: "Please enter your name." },
                    })}
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    className={cn(
                      fieldBase,
                      errors.name && "border-ember/70 focus:border-ember",
                    )}
                  />
                </Field>

                <Field label="Email" error={errors.email?.message} required>
                  <input
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email address.",
                      },
                    })}
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    className={cn(
                      fieldBase,
                      errors.email && "border-ember/70 focus:border-ember",
                    )}
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
                    {...register("message", {
                      required: "Please enter your project details.",
                      minLength: {
                        value: 20,
                        message: "A little more detail helps — 20 characters minimum.",
                      },
                    })}
                    rows={6}
                    placeholder="What are you building, and what does success look like?"
                    className={cn(
                      fieldBase,
                      "resize-y",
                      errors.message && "border-ember/70 focus:border-ember",
                    )}
                  />
                </Field>

                {/* File Attachment */}
                <div className="sm:col-span-2">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="label flex items-center gap-1.5">
                      <Paperclip className="h-3 w-3 text-muted" />
                      Attachment
                    </span>
                    <span className="font-mono text-[0.625rem] text-muted">
                      Max 5MB • PDF, DOCX, ZIP, PNG, JPG
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.zip,.png,.jpg,.jpeg"
                    onChange={(e) => handleFileSelect(e.target.files?.[0])}
                  />

                  {!file ? (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const droppedFile = e.dataTransfer.files?.[0];
                        if (droppedFile) handleFileSelect(droppedFile);
                      }}
                      className={cn(
                        "group relative flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed px-4 py-3.5 transition-all duration-300",
                        isDragging
                          ? "border-accent bg-accent/10"
                          : "border-line-2/70 bg-surface/40 hover:border-accent/60 hover:bg-surface/70",
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-2/60 bg-surface text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                          <UploadCloud className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-fg-dim transition-colors group-hover:text-fg">
                            Attach project brief, wireframe, or scope
                          </p>
                          <p className="truncate text-[0.6875rem] text-muted">
                            Drag & drop or click to browse from device
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-lg border border-line-2/80 bg-surface px-2.5 py-1 text-[0.6875rem] font-mono text-muted transition-colors group-hover:border-accent/40 group-hover:text-fg">
                        Browse
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-accent/40 bg-accent/5 px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-fg">
                            {file.name}
                          </p>
                          <p className="font-mono text-[0.625rem] text-muted">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleFileRemove}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line-2/60 bg-surface text-muted transition-colors hover:border-ember hover:bg-ember/10 hover:text-ember"
                        title="Remove file"
                        aria-label="Remove file"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  {fileError ? (
                    <span className="mt-2 block font-mono text-[0.625rem] tracking-[0.08em] text-ember">
                      {fileError}
                    </span>
                  ) : null}
                </div>

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
    </Section>
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
