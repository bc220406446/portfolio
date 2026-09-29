import { SpotlightCard } from "@/components/motion/magnetic";
import { Portrait } from "@/components/motion/portrait";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const principles = [
  {
    title: "Clean, maintainable code",
    body: "Typed where it matters, small modules, and components reused rather than duplicated. A codebase the next developer can read without a handover call.",
  },
  {
    title: "Performance as a feature",
    body: "Core Web Vitals treated as a requirement, not a polish pass - image pipelines, trimmed queries, cached fragments and measured budgets.",
  },
  {
    title: "Business-aligned builds",
    body: "Every screen maps back to a requirement: more qualified traffic, fewer abandoned carts, less manual admin work after launch.",
  },
];

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

      {/* Floating principle cards - offset so they read as objects, not cells. */}
      <Stagger className="mt-24 grid gap-6 lg:grid-cols-3 lg:gap-7">
        {principles.map((principle, i) => (
          <StaggerItem
            key={principle.title}
            className={cn(
              i === 1 && "lg:translate-y-8",
              i === 2 && "lg:translate-y-3",
            )}
          >
            <SpotlightCard
              className="group panel h-full overflow-hidden"
              intensity={5}
            >
              <div className="relative p-7">
                <span className="sweep" />
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-accent">
                    0{i + 1}
                  </span>
                  <span className="h-px w-10 bg-line-2 transition-all duration-700 group-hover:w-16 group-hover:bg-accent" />
                </div>
                <h3 className="mt-6 text-lg font-medium tracking-[-0.01em] text-fg">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-dim">
                  {principle.body}
                </p>
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
