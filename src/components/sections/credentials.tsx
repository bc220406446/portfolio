import { Award, Calendar, ExternalLink, GraduationCap, Hash } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { certifications, education } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Credentials() {
  const featured = education.filter((e) => e.featured);
  const remaining = education.filter((e) => !e.featured);

  return (
    <Section id="credentials" className="border-t border-line">
      <SectionHeading
        title="The foundation"
        description="My academic background and certifications are part of the journey - but the real learning has always happened while building."
      />

      {/* ── Featured education cards ─────────────────────────────── */}
      {featured.length > 0 && (
        <Stagger className="mb-16 grid gap-6 sm:grid-cols-3">
          {featured.map((entry) => (
            <StaggerItem key={entry.institution}>
              <div
                className={cn(
                  "panel group relative flex flex-col overflow-hidden p-7 transition-colors duration-500 hover:border-line-2",
                  "border-l-[3px]",
                  entry.accentColor
                    ? `${entry.accentColor.replace("bg-", "border-l-")}`
                    : "border-l-accent",
                )}
              >
                <span className="sweep" />

                {/* Title */}
                <h3 className="text-lg font-medium leading-snug tracking-[-0.015em] text-fg">
                  {entry.qualification}
                </h3>

                {/* Institution + date */}
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                    {entry.institution}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                    <Calendar className="h-3 w-3" />
                    {entry.period}
                  </span>
                </div>

                {/* Description */}
                {entry.description && (
                  <p className="mt-4 text-sm leading-relaxed text-fg-dim">
                    {entry.description}
                  </p>
                )}

                {/* Grade / percentage */}
                {(entry.grade || entry.percentage) && (
                  <p className="mt-3 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                    {[
                      entry.grade && `Grade: ${entry.grade}`,
                      entry.percentage && `Percentage: ${entry.percentage}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}

                {/* Credential link */}
                {entry.credentialUrl && (
                  <a
                    href={entry.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.14em] text-accent uppercase transition-colors hover:text-fg"
                  >
                    View Credential
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {/* ── Remaining education entries ──────────────────────────── */}
      {remaining.length > 0 && (
        <div className="mb-16">
          <div className="mb-7 flex items-center gap-4">
            <GraduationCap className="h-5 w-5 text-accent" />
            <p className="label">Education</p>
            <span className="h-px flex-1 bg-line" />
          </div>

          <Stagger className="flex flex-col gap-3">
            {remaining.map((entry) => (
              <StaggerItem key={entry.institution}>
                <div className="group rounded-2xl border border-transparent px-5 py-4 transition-colors duration-500 hover:border-line hover:bg-surface/50">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium leading-snug text-fg">
                        {entry.qualification}
                      </h3>
                      <p className="mt-1.5 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                        {entry.institution} · {entry.field}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                      {entry.period}
                    </span>
                  </div>

                  <span className="mt-2.5 inline-block rounded-md bg-surface-2/70 px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.14em] text-accent/90 uppercase">
                    {entry.status}
                  </span>

                  {entry.credentialUrl && (
                    <a
                      href={entry.credentialUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-accent uppercase transition-colors hover:text-fg"
                    >
                      View credential <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}

      {/* ── Certifications ──────────────────────────────────────── */}
      <div>
        <div className="mb-7 flex items-center gap-4">
          <Award className="h-5 w-5 text-accent" />
          <p className="label">Certifications</p>
          <span className="h-px flex-1 bg-line" />
        </div>

        <Stagger className="flex flex-col gap-2">
          {certifications.map((cert) => (
            <StaggerItem key={cert.title}>
              <div className="group relative rounded-2xl border border-transparent px-5 py-5 transition-colors duration-500 hover:border-line hover:bg-surface/50 sm:px-6">
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-violet sm:flex">
                    <Award className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    {/* Title row */}
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <h3 className="text-base font-medium leading-snug tracking-[-0.01em] text-fg">
                        {cert.title}
                      </h3>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-0.5 shrink-0 font-mono text-[0.625rem] tracking-[0.14em] text-accent uppercase transition-colors hover:text-fg"
                        >
                          verify ↗
                        </a>
                      )}
                    </div>

                    {/* Issuer + date */}
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                        {cert.issuer}
                      </span>
                      {cert.date && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-line-2" />
                          <span className="flex items-center gap-1 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                            <Calendar className="h-3 w-3" />
                            {cert.date}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <p className="mt-3 flex items-center gap-1.5 font-mono text-[0.5625rem] tracking-[0.12em] text-muted uppercase">
                        <Hash className="h-3 w-3" />
                        Credential ID: {cert.credentialId}
                      </p>
                    )}

                    {/* Tags */}
                    {cert.tags && cert.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cert.tags.map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.1em] uppercase bg-surface text-fg-dim"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

