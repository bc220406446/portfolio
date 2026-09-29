import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { certifications, education } from "@/data/profile";

export function Credentials() {
  return (
    <Section id="credentials" className="border-t border-line">
      <SectionHeading
        index="05"
        kicker="Credentials"
        title="Formal training in computer science, applied training in the tools."
      />

      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="label mb-7">Education</p>
          <Stagger className="flex flex-col gap-4">
            {education.map((entry, i) => (
              <StaggerItem key={entry.institution}>
                <div className="panel group relative overflow-hidden p-6 transition-colors duration-500 hover:border-line-2">
                  <span className="sweep" />
                  <div className="flex items-start gap-5">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2/70 font-mono text-[0.625rem] text-accent transition-colors duration-500 group-hover:bg-accent/15">
                      0{i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-medium tracking-[-0.015em] text-fg">
                        {entry.qualification}
                      </h3>
                      <p className="mt-1.5 text-sm text-fg-dim">
                        {entry.institution}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                          {entry.field}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-line-2" />
                        <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                          {entry.period}
                        </span>
                      </div>
                      <span className="mt-3 inline-block rounded-md bg-surface-2/70 px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.14em] text-accent/90 uppercase">
                        {entry.status}
                      </span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div>
          <p className="label mb-7">Certifications</p>
          <Stagger className="flex flex-col gap-3">
            {certifications.map((cert, i) => (
              <StaggerItem key={cert.title}>
                <div className="group flex items-start gap-5 rounded-2xl px-4 py-4 transition-colors duration-500 hover:bg-surface/60">
                  <span className="mt-0.5 font-mono text-[0.625rem] tracking-[0.16em] text-accent/70">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm leading-snug font-medium text-fg">
                      {cert.title}
                    </h3>
                    <p className="mt-1.5 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                      {cert.issuer} · {cert.focus}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-9">
            <div className="panel p-6">
              <p className="label mb-3.5">Also holds</p>
              <p className="text-sm leading-relaxed text-fg-dim">
                Industry certificates in WordPress site building, blog and
                business publishing, Shopify store setup, digital product design
                with Canva, and headless content architecture with Next.js and
                Strapi.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
