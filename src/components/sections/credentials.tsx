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

      <div className="grid gap-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="label mb-8">Education</p>
          <Stagger className="relative">
            <span
              aria-hidden
              className="absolute top-3 bottom-3 left-0 w-px bg-line"
            />
            {education.map((entry) => (
              <StaggerItem key={entry.institution} className="relative pb-10 pl-8">
                <span
                  aria-hidden
                  className="absolute top-2.5 left-[-3px] h-[7px] w-[7px] bg-accent"
                />
                <h3 className="text-lg font-medium tracking-[-0.015em] text-fg">
                  {entry.qualification}
                </h3>
                <p className="mt-1.5 text-sm text-fg-dim">{entry.institution}</p>
                <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                  {entry.field} · {entry.period}
                </p>
                <p className="mt-2 font-mono text-[0.625rem] tracking-[0.16em] text-accent/80 uppercase">
                  {entry.status}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div>
          <p className="label mb-8">Certifications</p>
          <Stagger className="divide-y divide-line border-y border-line">
            {certifications.map((cert, i) => (
              <StaggerItem key={cert.title}>
                <div className="group flex items-start gap-5 py-5 transition-colors duration-500 hover:bg-surface/50">
                  <span className="mt-0.5 font-mono text-[0.625rem] text-accent/70">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm leading-snug font-medium text-fg">
                      {cert.title}
                    </h3>
                    <p className="mt-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-muted uppercase">
                      {cert.issuer} · {cert.focus}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-10">
            <div className="border border-line bg-surface/40 p-6">
              <p className="label mb-3">Also holds</p>
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
