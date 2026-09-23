import { SpotlightCard } from "@/components/motion/magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Section, SectionHeading, TagRow } from "@/components/ui/section";
import { languages, topSkills } from "@/data/profile";

const principles = [
  {
    title: "Clean, maintainable code",
    body: "Typed where it matters, small modules, and components reused rather than duplicated. A codebase the next developer can read without a handover call.",
  },
  {
    title: "Performance as a feature",
    body: "Core Web Vitals treated as a requirement, not a polish pass — image pipelines, trimmed queries, cached fragments and measured budgets.",
  },
  {
    title: "Business-aligned builds",
    body: "Every screen maps back to a requirement: more qualified traffic, fewer abandoned carts, less manual admin work after launch.",
  },
];

const focus = [
  "Full-stack web applications",
  "E-commerce storefronts",
  "AI-powered automation",
  "CMS & headless platforms",
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        kicker="About"
        title="I build the whole path — from database schema to the last hover state."
      />

      <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
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
              Shopify, WooCommerce and SureCart work — including SEO,
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

          <Reveal delay={0.22} className="pt-4">
            <blockquote className="border-l border-accent pl-6">
              <p className="font-serif text-2xl leading-snug italic text-fg sm:text-3xl">
                &ldquo;Write it once, write it clearly, and make sure it still
                loads fast on a three-year-old phone.&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>

        <div className="space-y-10">
          <Reveal direction="left">
            <div>
              <p className="label mb-4">Focus</p>
              <ul className="divide-y divide-line border-y border-line">
                {focus.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-4 py-3.5 text-sm text-fg-dim"
                  >
                    <span className="font-mono text-[0.625rem] text-accent/70">
                      0{i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div>
              <p className="label mb-4">Top skills</p>
              <TagRow items={topSkills} />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.18}>
            <div>
              <p className="label mb-4">Languages</p>
              <ul className="space-y-3">
                {languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-fg">{lang.name}</span>
                    <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <Stagger className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-3">
        {principles.map((principle, i) => (
          <StaggerItem key={principle.title} className="group bg-canvas">
            <SpotlightCard className="h-full p-7">
              <span className="label text-accent">0{i + 1}</span>
              <h3 className="mt-5 text-lg font-medium tracking-[-0.01em] text-fg">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-dim">
                {principle.body}
              </p>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-16">
        <p className="max-w-3xl text-xl leading-snug font-medium tracking-[-0.02em] text-fg sm:text-2xl">
          <TextReveal
            text="Open to remote full-time roles, freelance projects, contract work and long-term partnerships in full-stack development, e-commerce and AI-powered web solutions."
            stagger={0.02}
          />
        </p>
      </Reveal>
    </Section>
  );
}
