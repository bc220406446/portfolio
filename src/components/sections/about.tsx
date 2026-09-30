import { Portrait } from "@/components/motion/portrait";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        kicker="About"
        title="I build the whole path - from database schema to the last hover state."
      />

      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Portrait sizes="(max-width: 1024px) 80vw, 460px" />

        <div className="space-y-6">
          <Reveal>
            <p className="text-base leading-relaxed text-fg-dim sm:text-lg">
              I&apos;m a full stack web developer focused on building modern,
              scalable and user-focused web solutions. My experience spans
              full-stack development, e-commerce, CMS platforms and AI-powered
              applications.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-base leading-relaxed text-fg-dim sm:text-lg">
              I work with{" "}
              <span className="text-fg">
                Next.js, React, TypeScript, Node.js, Python, Django, PostgreSQL
                and REST APIs
              </span>{" "}
              across modern deployment platforms, alongside hands-on WordPress,
              Shopify, WooCommerce and SureCart work - including SEO,
              performance optimization and third-party integrations.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-base leading-relaxed text-fg-dim sm:text-lg">
              I&apos;ve shipped community platforms, management systems,
              e-commerce applications and intelligent web solutions, plus
              real-world sites for academic, retail, furniture and fashion
              businesses.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="text-base leading-relaxed text-fg-dim sm:text-lg">
              I&apos;m open to{" "}
              <span className="text-fg">
                remote full-time roles, freelance projects and contract work
              </span>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
