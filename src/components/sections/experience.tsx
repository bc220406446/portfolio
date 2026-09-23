import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading, TagRow } from "@/components/ui/section";
import { experience } from "@/data/profile";

const workflow = [
  {
    step: "Scope",
    body: "Clarify the requirement, the constraints and what success looks like before a line of code is written.",
  },
  {
    step: "Design",
    body: "Map the flows and the interface so structure is agreed while changes are still cheap.",
  },
  {
    step: "Build",
    body: "Ship in reviewable increments with typed contracts and reusable components.",
  },
  {
    step: "Launch",
    body: "Deploy, measure Core Web Vitals and SEO, then hand over documentation and support.",
  },
];

export function Experience() {
  return (
    <Section id="experience" className="border-t border-line">
      <SectionHeading
        index="03"
        kicker="Experience"
        title="Nearly two years of delivering to real clients, on real deadlines."
      />

      <div className="relative">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-0 hidden w-px bg-line sm:block"
        />

        {experience.map((role) => (
          <Stagger key={role.company} className="relative sm:pl-10">
            <StaggerItem>
              <span
                aria-hidden
                className="absolute top-2 left-[-3px] hidden h-[7px] w-[7px] bg-accent sm:block"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <h3 className="text-2xl font-medium tracking-[-0.025em] text-fg sm:text-3xl">
                  {role.role}
                </h3>
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                  {role.period} · {role.duration}
                </p>
              </div>

              <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
                {role.company} · {role.mode}
              </p>

              <p className="mt-7 max-w-3xl text-base leading-relaxed text-fg-dim">
                {role.summary}
              </p>

              <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
                {role.highlights.map((highlight, i) => (
                  <li
                    key={highlight}
                    className="flex gap-4 bg-canvas px-5 py-5 text-sm leading-relaxed text-fg-dim"
                  >
                    <span className="font-mono text-[0.625rem] text-accent/70">
                      0{i + 1}
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <TagRow items={role.stack} className="mt-8" />
            </StaggerItem>
          </Stagger>
        ))}
      </div>

      <div className="mt-20">
        <p className="label mb-8">How an engagement runs</p>
        <Stagger className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((phase, i) => (
            <StaggerItem key={phase.step} className="group bg-canvas">
              <div className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.625rem] text-accent">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <h4 className="mt-5 text-base font-medium text-fg">
                  {phase.step}
                </h4>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-dim">
                  {phase.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
