/**
 * @fileoverview Experience Section Component
 * Displays commercial experience cards, core focus areas, and the complete work process timeline.
 * Used in: src/app/experience/page.tsx.
 */

"use client";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { HowItWorksTimeline } from "@/components/sections/how-it-works-timeline";
import { experience } from "@/data/profile";

export function Experience() {
  return (
    <Section id="experience" className="border-t border-line py-20 sm:py-28">
      <SectionHeading
        title="From idea to production."
        description="I don't start with code. I start with the problem. I define the requirements, choose the right architecture, build in focused milestones, and validate everything before shipping."
        className="mb-12 sm:mb-16"
      />

      <Stagger>
        {experience.map((role) => (
          <StaggerItem key={role.role}>
            <div className="panel group relative overflow-hidden p-6 sm:p-8 lg:p-9 shadow-2xl">
              <span className="sweep" />

              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="mt-2 text-2xl font-medium tracking-[-0.025em] text-fg sm:text-3xl">
                    {role.role}
                  </h3>
                </div>
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                  {role.period}
                </p>
              </div>

              <div className="mt-5 space-y-3 text-base leading-relaxed text-fg-dim max-w-4xl">
                {role.summary.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-8 border-t border-line/60 pt-6">
                <p className="label mb-3.5">Core Focus</p>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {role.focus.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-lg border border-line-2/70 bg-surface/85 px-4 py-2 font-mono text-xs tracking-wide text-fg transition-all duration-200 hover:border-accent/50 hover:bg-surface-2 hover:text-accent shadow-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <HowItWorksTimeline />
    </Section>
  );
}

