"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "motion/react";
import { ActionLink } from "@/components/ui/action";
import { cn } from "@/lib/utils";

/* ─── SDLC Waterfall Phases ────────────────────────────────────────────── */

export interface WaterfallPhase {
  id: string;
  number: string;
  title: string;
  description: string;
  outputName: string;
  imageSrc: string;
}

export const waterfallPhases: WaterfallPhase[] = [
  {
    id: "phase-01",
    number: "01",
    title: "Requirements Analysis",
    description:
      "Gather and document the functional and non-functional requirements, understand user needs, define project scope, and establish the expected system behavior before development begins.",
    outputName: "Finalized Requirements",
    imageSrc: "/sdlc-01-requirements.webp",
  },
  {
    id: "phase-02",
    number: "02",
    title: "System Design",
    description:
      "Translate the approved requirements into a technical blueprint by defining the system architecture, database structure, interfaces, modules, and technologies.",
    outputName: "Approved System Design",
    imageSrc: "/sdlc-02-system-design.webp",
  },
  {
    id: "phase-03",
    number: "03",
    title: "Implementation",
    description:
      "Develop the system according to the approved design. Build the individual modules, integrate components, and write the code required to implement the defined functionality.",
    outputName: "Working Product",
    imageSrc: "/sdlc-03-implementation.webp",
  },
  {
    id: "phase-04",
    number: "04",
    title: "Testing",
    description:
      "Verify that the implemented system works as expected by identifying defects, validating functionality, testing integrations, and ensuring the software meets the defined requirements.",
    outputName: "Tested & Verified Product",
    imageSrc: "/sdlc-04-testing.webp",
  },
  {
    id: "phase-05",
    number: "05",
    title: "Deployment",
    description:
      "Release the tested software into the production environment, configure the required infrastructure, and make the system available to its intended users.",
    outputName: "Live Production System",
    imageSrc: "/sdlc-05-deployment.webp",
  },
  {
    id: "phase-06",
    number: "06",
    title: "Post-Launch Support",
    description:
      "Provide ongoing technical assistance, monitor system stability and performance, address updates and optimizations, and ensure smooth continuous operations as user needs evolve.",
    outputName: "Supported & Maintained System",
    imageSrc: "/sdlc-06-maintenance.webp",
  },
];

const deliverablesOverview = [
  {
    number: "01",
    title: "Clear Scope",
    body: "Requirements, priorities, and deliverables are defined before development begins.",
  },
  {
    number: "02",
    title: "Maintainable Code",
    body: "Reusable components, clean architecture, and documentation make future changes easier.",
  },
  {
    number: "03",
    title: "Production-Ready Delivery",
    body: "Responsive, optimized, tested, and prepared for real users and real traffic.",
  },
  {
    number: "04",
    title: "Post-Launch Support",
    body: "Deployment assistance, fixes, improvements, and technical support after launch.",
  },
];

/* ─── Premium Visual Image Card Component (No Dots, Calm & High-End) ──── */

function PulsingImageCard({ phase }: { phase: WaterfallPhase }) {
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-line-2/80 bg-canvas-2 shadow-2xl transition-all duration-500 hover:border-accent/60 hover:shadow-[0_0_35px_rgba(211,255,69,0.14)] hover:-translate-y-1">
      {/* Ambient Glow behind card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-accent/15 via-transparent to-accent/10 opacity-30 blur-2xl transition-all duration-700 group-hover:opacity-70 group-hover:scale-105"
      />

      {/* Hairline sweep on hover */}
      <span className="sweep z-20" />

      {/* 3D Image Canvas */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-canvas">
        <Image
          src={phase.imageSrc}
          alt={`${phase.title} — ${phase.outputName}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          priority={phase.number === "01"}
        />

        {/* Scrim Gradient Overlays - subtle edge vignette so the diagrams and UI remain crisp */}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/30 via-transparent to-transparent pointer-events-none" />

        {/* Bottom Waterfall Output Artifact Plaque (Clean, No Technical Acronyms) */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4.5 z-10">
          <div className="flex items-center justify-between gap-2 rounded-xl border border-line-2/80 bg-surface/90 backdrop-blur-md px-4 py-2.5 shadow-xl transition-colors group-hover:border-accent/40">
            <span className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-muted font-medium">
              OUTPUT
            </span>
            <span className="font-mono text-xs sm:text-[0.8125rem] font-medium text-accent tracking-tight">
              {phase.outputName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Waterfall Timeline Row ───────────────────────────────────────────── */

function WaterfallRow({
  phase,
  index,
  isActive,
}: {
  phase: WaterfallPhase;
  index: number;
  isActive: boolean;
}) {
  const isEven = index % 2 === 1; // Alternating layout on desktop

  return (
    <div
      id={phase.id}
      className="relative mb-14 last:mb-0 sm:mb-18 lg:mb-22 scroll-mt-28"
    >
      {/* ─── Desktop Centered Milestone Node ─── */}
      <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
        <div
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-full border bg-surface transition-all duration-300",
            isActive
              ? "border-accent shadow-[0_0_18px_rgba(211,255,69,0.35)] scale-110"
              : "border-line-2 hover:border-line-2/90",
          )}
        >
          <span
            className={cn(
              "font-mono text-xs font-semibold transition-colors",
              isActive ? "text-accent" : "text-muted",
            )}
          >
            {phase.number}
          </span>
        </div>
      </div>

      {/* ─── Mobile Left Milestone Node ─── */}
      <div className="lg:hidden absolute left-4 sm:left-5 top-6 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
        <div
          className={cn(
            "relative flex h-8 w-8 items-center justify-center rounded-full border bg-surface transition-all duration-300",
            isActive ? "border-accent shadow-sm" : "border-line-2",
          )}
        >
          <span
            className={cn(
              "font-mono text-[0.6875rem] font-semibold",
              isActive ? "text-accent" : "text-muted",
            )}
          >
            {phase.number}
          </span>
        </div>
      </div>

      {/* ─── Alternating Two-Column Grid ─── */}
      <div
        className={cn(
          "grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-14 items-center",
          "pl-9 sm:pl-12 lg:pl-0",
        )}
      >
        {/* Theory / Text Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex flex-col justify-center",
            isEven ? "lg:order-2 lg:pl-8" : "lg:order-1 lg:pr-8 lg:text-right",
          )}
        >
          {/* Phase Title */}
          <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] text-fg">
            {phase.title}
          </h3>

          {/* Concise Description */}
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-fg-dim max-w-xl">
            {phase.description}
          </p>
        </motion.div>

        {/* Visual Image Card Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.55,
            delay: 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn(
            "w-full max-w-lg",
            isEven
              ? "lg:order-1 lg:mr-auto lg:pr-8"
              : "lg:order-2 lg:ml-auto lg:pl-8",
          )}
        >
          <PulsingImageCard phase={phase} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main Work Process Section ────────────────────────────────────────── */

export function HowItWorksTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Default initially to index 0 (01 Requirements Analysis)
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  // Progressive Waterfall scroll line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Accurate active phase tracking using getBoundingClientRect
  useEffect(() => {
    const updateActivePhase = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.45;

      // If the timeline hasn't reached the trigger line yet, always keep index 0 active
      if (containerRect.top > triggerLine) {
        setActivePhaseIndex(0);
        return;
      }

      // Find the latest phase that has scrolled past the trigger line
      let bestIndex = 0;
      waterfallPhases.forEach((phase, index) => {
        const el = document.getElementById(phase.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            bestIndex = index;
          }
        }
      });

      setActivePhaseIndex(bestIndex);
    };

    // Initialize immediately on mount
    updateActivePhase();

    window.addEventListener("scroll", updateActivePhase, { passive: true });
    window.addEventListener("resize", updateActivePhase, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActivePhase);
      window.removeEventListener("resize", updateActivePhase);
    };
  }, []);

  return (
    <div className="mt-14 sm:mt-18" suppressHydrationWarning>
      {/* ─── Section Intro (Center Aligned) ─── */}
      <div className="mx-auto max-w-4xl text-center mb-14 sm:mb-18">
        <h3 className="mt-3 text-3xl font-medium tracking-[-0.03em] text-fg sm:text-4xl">
          My Work Process
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-fg-dim text-pretty">
          A structured process keeps requirements clear, decisions deliberate, and delivery predictable.
        </p>

        {/* Center-Aligned Premium Process Navigation Pills (Fully Responsive & Wrapping on Mobile) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-2">
          {waterfallPhases.map((p, idx) => {
            const isActive = idx === activePhaseIndex;
            return (
              <a
                key={p.id}
                href={`#${p.id}`}
                className={cn(
                  "rounded-lg border px-3 py-1.5 sm:px-3.5 sm:py-2 font-mono text-[0.625rem] tracking-[0.1em] sm:tracking-[0.14em] uppercase transition-all duration-200 text-center select-none",
                  isActive
                    ? "border-accent bg-accent text-accent-ink font-semibold shadow-[0_0_16px_rgba(211,255,69,0.25)]"
                    : "border-line-2 bg-surface/50 text-muted hover:border-accent hover:text-accent hover:bg-surface",
                )}
              >
                <span>{p.title}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* ─── Central Waterfall Timeline ─── */}
      <div ref={containerRef} className="relative">
        {/* Desktop Center Vertical Beam */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-line-2/40"
        >
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute inset-x-0 top-0 w-full h-full bg-gradient-to-b from-accent via-accent to-accent-dim shadow-[0_0_10px_rgba(211,255,69,0.4)]"
          />
        </div>

        {/* Mobile Left Vertical Beam */}
        <div
          aria-hidden="true"
          className="lg:hidden absolute left-4 sm:left-5 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-line-2/40"
        >
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute inset-x-0 top-0 w-full h-full bg-gradient-to-b from-accent via-accent to-accent-dim shadow-[0_0_10px_rgba(211,255,69,0.4)]"
          />
        </div>

        {/* Alternating Waterfall Rows */}
        <div className="relative">
          {waterfallPhases.map((phase, index) => (
            <WaterfallRow
              key={phase.id}
              phase={phase}
              index={index}
              isActive={index === activePhaseIndex}
            />
          ))}
        </div>
      </div>

      {/* ─── Final CTA ─── */}
      <div className="mt-14 sm:mt-18 rounded-2xl border border-line-2/70 bg-gradient-to-br from-surface/80 via-surface/40 to-canvas-2/90 p-6 sm:p-10 text-center relative overflow-hidden">
        <span className="sweep" />
        <div className="mx-auto max-w-xl">
          <p className="label text-accent">Ready To Build?</p>
          <h3 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg sm:text-3xl">
            Have a product in mind?
          </h3>
          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-fg-dim text-pretty">
            Let&apos;s turn the idea into something real, useful, and ready for
            production.
          </p>
          <div className="mt-6 flex justify-center">
            <ActionLink href="/contact" variant="primary">
              Start a project →
            </ActionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
