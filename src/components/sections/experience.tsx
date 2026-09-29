"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
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
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 45%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <Section id="experience" className="border-t border-line">
      <SectionHeading
        index="03"
        kicker="Experience"
        title="Nearly two years of delivering to real clients, on real deadlines."
      />

      {experience.map((role) => (
        <Stagger key={role.company} className="flex flex-col gap-6">
          <StaggerItem>
            <div className="panel group relative overflow-hidden p-7 sm:p-9">
              <span className="sweep" />

              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                <h3 className="text-2xl font-medium tracking-[-0.025em] text-fg sm:text-3xl">
                  {role.role}
                </h3>
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                  {role.period} · {role.duration}
                </p>
              </div>

              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
                  {role.company}
                </span>
                <span className="h-1 w-1 rounded-full bg-line-2" />
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                  {role.mode}
                </span>
              </p>

              <p className="mt-7 max-w-3xl text-base leading-relaxed text-fg-dim">
                {role.summary}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {role.highlights.map((highlight, i) => (
                  <motion.div
                    key={highlight}
                    initial={reduce ? undefined : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                    className="group/hl panel-inset flex gap-4 p-5 transition-colors duration-500 hover:border-line-2"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-line-2 transition-colors duration-500 group-hover/hl:bg-accent" />
                    <span className="text-sm leading-relaxed text-fg-dim">
                      {highlight}
                    </span>
                  </motion.div>
                ))}
              </div>

              <TagRow items={role.stack} className="mt-8" />
            </div>
          </StaggerItem>
        </Stagger>
      ))}

      {/* Workflow as a scroll-drawn timeline */}
      <div ref={timelineRef} className="mt-24">
        <Reveal direction="none">
          <div className="flex items-center gap-4">
            <p className="label">How an engagement runs</p>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="relative mt-10">
          <div className="absolute top-[13px] right-0 left-0 hidden h-px bg-line lg:block" />
          <motion.div
            aria-hidden
            style={reduce ? undefined : { scaleX: lineScale }}
            className="absolute top-[13px] right-0 left-0 hidden h-px origin-left bg-gradient-to-r from-accent via-accent to-accent/30 lg:block"
          />

          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {workflow.map((phase, i) => (
              <StaggerItem key={phase.step}>
                <div className="group relative">
                  <div className="flex items-center gap-3 lg:block">
                    <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg border border-line-2 bg-canvas font-mono text-[0.625rem] text-muted transition-all duration-500 group-hover:border-accent group-hover:text-accent">
                      {i + 1}
                    </span>
                    <h4 className="text-base font-medium text-fg lg:mt-6">
                      {phase.step}
                    </h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fg-dim lg:pr-4">
                    {phase.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
