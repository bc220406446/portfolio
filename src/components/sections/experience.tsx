"use client";

import { useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { TechMarquee } from "@/components/projects/tech-marquee";
import { Section, SectionHeading } from "@/components/ui/section";
import { experience } from "@/data/profile";
import { cn } from "@/lib/utils";
import { CharacterCarousel } from "@/shaders/character-carousel/CharacterCarousel";

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
        title="How I work"
        description="From the first idea to the final deployment, I focus on understanding the problem, building the right solution, and making sure it works in the real world."
      />

      {/* Experience Roles */}
      <Stagger>
        {experience.map((role) => (
          <StaggerItem key={role.role}>
            <div className="panel group relative overflow-hidden p-7 sm:p-9">
              <span className="sweep" />

              <p className="label">Role</p>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                <h3 className="text-2xl font-medium tracking-[-0.025em] text-fg sm:text-3xl">
                  {role.role}
                </h3>
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                  {role.period} · {role.duration}
                </p>
              </div>

              {/* Full Comprehensive Summary */}
              <p className="mt-6 text-base leading-relaxed text-fg-dim">
                {role.summary}
              </p>

              {/* Tech Stack Marquee Moving Addition */}
              <div className="mt-8 border-t border-line pt-6">
                <p className="label mb-4">Tools &amp; Tech Stack</p>
                <TechMarquee stack={role.stack} />
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* How an engagement runs — Character Filmstrip UI */}
      <div className="mt-20">
        <div className="mb-8 flex items-center gap-4">
          <p className="label">How an engagement runs</p>
          <span className="h-px flex-1 bg-line" />
        </div>

        {/* 3D Character Carousel — Filmstrip Scene */}
        <div className="relative mb-8 h-[460px] sm:h-[540px] w-full overflow-hidden rounded-2xl border border-line-2/80 bg-canvas-2 shadow-2xl">
          <CharacterCarousel
            variant="filmstrip"
            speed={1.0}
            scale={1.0}
            opacity={1.0}
            hue={0}
            saturation={1.0}
            brightness={1.0}
          />
        </div>

        <FilmstripWorkflow />
      </div>
    </Section>
  );
}

/* ─── Character Filmstrip Workflow ───────────────────────────────────── */
function FilmstripWorkflow() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative rounded-2xl border border-line-2/80 bg-canvas-2/90 p-5 sm:p-7 shadow-2xl overflow-hidden">
      {/* Top Filmstrip Perforation Holes */}
      <div aria-hidden className="mb-5 flex justify-between gap-1.5 opacity-60">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="h-2.5 w-3.5 rounded-xs border border-line-2/70 bg-surface/90 shrink-0"
          />
        ))}
      </div>

      {/* Filmstrip Track / Frames */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workflow.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "group relative cursor-pointer text-left flex flex-col justify-between rounded-xl border p-5 transition-all duration-300",
                isActive
                  ? "border-accent bg-surface/95 shadow-[0_0_30px_rgba(211,255,69,0.14)] -translate-y-1"
                  : "border-line-2/60 bg-surface/40 hover:border-line-2 hover:bg-surface/70",
              )}
            >
              {/* Active Top Glow Line */}
              {isActive && (
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-accent" />
              )}

              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between font-mono text-xs mb-3">
                  <span
                    className={cn(
                      "font-semibold tracking-[0.14em]",
                      isActive ? "text-accent" : "text-muted",
                    )}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-[0.5625rem] tracking-[0.18em] uppercase text-muted">
                    FRAME 0{index + 1}
                  </span>
                </div>

                {/* Step Title */}
                <h4 className="text-xl font-medium tracking-[-0.03em] text-fg transition-colors group-hover:text-accent">
                  {item.step}
                </h4>

                {/* Step Body */}
                <p className="mt-3 text-xs leading-relaxed text-fg-dim">
                  {item.body}
                </p>
              </div>

              {/* Bottom Frame Status */}
              <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-3 font-mono text-[0.5625rem] tracking-[0.14em] text-muted uppercase">
                <span>PHASE {index + 1}</span>
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    isActive ? "bg-accent animate-pulse" : "bg-line-2",
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Filmstrip Perforation Holes */}
      <div aria-hidden className="mt-5 flex justify-between gap-1.5 opacity-60">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="h-2.5 w-3.5 rounded-xs border border-line-2/70 bg-surface/90 shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
