"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Check,
} from "lucide-react";
import { ActionLink } from "@/components/ui/action";
import { cn } from "@/lib/utils";

/* ─── SDLC Waterfall Phases ────────────────────────────────────────────── */

export interface WaterfallPhase {
  id: string;
  number: string;
  phaseLabel: string;
  title: string;
  description: string;
  artifactTitle: string;
  outputName: string;
}

export const waterfallPhases: WaterfallPhase[] = [
  {
    id: "phase-01",
    number: "01",
    phaseLabel: "PHASE 01",
    title: "Requirements Analysis",
    description:
      "Gather and document the functional and non-functional requirements, understand user needs, define project scope, and establish the expected system behavior before development begins.",
    artifactTitle: "PROJECT REQUIREMENTS",
    outputName: "Software Requirements Specification (SRS)",
  },
  {
    id: "phase-02",
    number: "02",
    phaseLabel: "PHASE 02",
    title: "System Design",
    description:
      "Translate the approved requirements into a technical blueprint by defining the system architecture, database structure, interfaces, modules, and technologies.",
    artifactTitle: "SYSTEM DESIGN",
    outputName: "System Design Document (SDD)",
  },
  {
    id: "phase-03",
    number: "03",
    phaseLabel: "PHASE 03",
    title: "Implementation",
    description:
      "Develop the system according to the approved design. Build the individual modules, integrate components, and write the code required to implement the defined functionality.",
    artifactTitle: "IMPLEMENTATION",
    outputName: "Working Software",
  },
  {
    id: "phase-04",
    number: "04",
    phaseLabel: "PHASE 04",
    title: "Testing",
    description:
      "Verify that the implemented system works as expected by identifying defects, validating functionality, testing integrations, and ensuring the software meets the defined requirements.",
    artifactTitle: "TESTING",
    outputName: "Verified Software",
  },
  {
    id: "phase-05",
    number: "05",
    phaseLabel: "PHASE 05",
    title: "Deployment",
    description:
      "Release the tested software into the production environment, configure the required infrastructure, and make the system available to its intended users.",
    artifactTitle: "DEPLOYMENT",
    outputName: "Live Production System",
  },
  {
    id: "phase-06",
    number: "06",
    phaseLabel: "PHASE 06",
    title: "Maintenance",
    description:
      "Monitor system performance, address bug fixes and updates, optimize ongoing operations, and support the application as user needs evolve.",
    artifactTitle: "MAINTENANCE",
    outputName: "Stable & Optimized System",
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

/* ─── Workflow Visual Artifacts (Input → Work → Output) ─────────────────── */

function WorkflowVisual({ phase }: { phase: WaterfallPhase }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line-2/70 bg-gradient-to-b from-surface/90 to-canvas-2/95 p-4.5 sm:p-5 shadow-xl transition-all duration-300 group-hover:border-accent/40">
      <span className="sweep" />

      {/* Artifact Title */}
      <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-3.5">
        <span className="font-mono text-[0.6875rem] font-semibold tracking-wider text-accent uppercase">
          {phase.artifactTitle}
        </span>
        <span className="font-mono text-[0.5625rem] text-muted uppercase tracking-wider">
          WORKFLOW
        </span>
      </div>

      {/* Workflow Diagram Body */}
      <div className="min-h-[175px] flex flex-col justify-center">
        {/* Phase 01: Requirements Analysis */}
        {phase.number === "01" && (
          <div className="space-y-1 font-mono text-[0.6875rem]">
            <div className="rounded border border-line/60 bg-canvas/70 px-3 py-1.5 text-fg-dim">
              Business Goals
            </div>
            <div className="h-px w-full bg-line/40 my-1" />
            <div className="rounded border border-line/60 bg-canvas/70 px-3 py-1.5 text-fg-dim">
              User Requirements
            </div>
            <div className="h-px w-full bg-line/40 my-1" />
            <div className="rounded border border-line/60 bg-canvas/70 px-3 py-1.5 text-fg-dim">
              Functional Requirements
            </div>
            <div className="h-px w-full bg-line/40 my-1" />
            <div className="rounded border border-line/60 bg-canvas/70 px-3 py-1.5 text-fg-dim">
              Non-Functional Requirements
            </div>
            <div className="h-px w-full bg-line/40 my-1" />
            <div className="rounded border border-line/60 bg-canvas/70 px-3 py-1.5 text-fg-dim">
              Project Scope
            </div>
          </div>
        )}

        {/* Phase 02: System Design */}
        {phase.number === "02" && (
          <div className="space-y-1.5">
            <div className="space-y-1 text-center font-mono text-[0.6875rem]">
              <div className="rounded border border-line/60 bg-canvas/70 py-1 px-2 text-fg-dim">
                User Interface
              </div>
              <div className="flex justify-center text-accent/80">
                <ArrowDown className="h-3 w-3 stroke-[2.5]" />
              </div>
              <div className="rounded border border-line/60 bg-canvas/70 py-1 px-2 text-fg-dim">
                Application Logic
              </div>
              <div className="flex justify-center text-accent/80">
                <ArrowDown className="h-3 w-3 stroke-[2.5]" />
              </div>
              <div className="rounded border border-line/60 bg-canvas/70 py-1 px-2 text-fg-dim">
                API / Services
              </div>
              <div className="flex justify-center text-accent/80">
                <ArrowDown className="h-3 w-3 stroke-[2.5]" />
              </div>
              <div className="rounded border border-line/60 bg-canvas/70 py-1 px-2 text-fg-dim">
                Database
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-line/50 grid grid-cols-4 gap-1 text-center font-mono text-[0.5625rem] text-muted uppercase">
              <span>Architecture</span>
              <span>Database</span>
              <span>Components</span>
              <span>Interfaces</span>
            </div>
          </div>
        )}

        {/* Phase 03: Implementation */}
        {phase.number === "03" && (
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-1 text-center font-mono text-[0.5625rem] text-muted uppercase pb-1 border-b border-line/50">
              <span className="text-fg-dim">UI Comp.</span>
              <span>→</span>
              <span className="text-fg-dim">Logic</span>
              <span>→ APIs</span>
            </div>

            <div className="rounded-md border border-line/60 bg-canvas/80 p-2.5 font-mono text-[0.6875rem] leading-relaxed">
              <span className="text-muted">interface</span>{" "}
              <span className="text-fg font-medium">UserSession</span> &#123;
              <br />
              <span className="text-muted pl-3">id:</span>{" "}
              <span className="text-accent">string</span>;
              <br />
              <span className="text-muted pl-3">role:</span>{" "}
              <span className="text-emerald-400">&quot;admin&quot; | &quot;user&quot;</span>;
              <br />
              &#125;
              <br />
              <span className="text-muted">export async function</span>{" "}
              <span className="text-fg">execute</span>() &#123; ... &#125;
            </div>
          </div>
        )}

        {/* Phase 04: Testing */}
        {phase.number === "04" && (
          <div className="space-y-1.5 font-mono text-[0.6875rem]">
            <div className="flex items-center justify-between rounded border border-line/60 bg-canvas/70 px-3 py-1.5">
              <span className="text-fg-dim">Unit Tests</span>
              <span className="text-accent flex items-center gap-1 font-semibold">
                <Check className="h-3.5 w-3.5 stroke-[2.5]" /> Passed
              </span>
            </div>
            <div className="flex justify-center text-accent/80">
              <ArrowDown className="h-3 w-3 stroke-[2.5]" />
            </div>
            <div className="flex items-center justify-between rounded border border-line/60 bg-canvas/70 px-3 py-1.5">
              <span className="text-fg-dim">Integration Tests</span>
              <span className="text-accent flex items-center gap-1 font-semibold">
                <Check className="h-3.5 w-3.5 stroke-[2.5]" /> Passed
              </span>
            </div>
            <div className="flex justify-center text-accent/80">
              <ArrowDown className="h-3 w-3 stroke-[2.5]" />
            </div>
            <div className="flex items-center justify-between rounded border border-line/60 bg-canvas/70 px-3 py-1.5">
              <span className="text-fg-dim">System Tests</span>
              <span className="text-accent flex items-center gap-1 font-semibold">
                <Check className="h-3.5 w-3.5 stroke-[2.5]" /> Passed
              </span>
            </div>
            <div className="flex justify-center text-accent/80">
              <ArrowDown className="h-3 w-3 stroke-[2.5]" />
            </div>
            <div className="flex items-center justify-between rounded border border-line/60 bg-canvas/70 px-3 py-1.5">
              <span className="text-fg-dim">User Acceptance (UAT)</span>
              <span className="text-accent flex items-center gap-1 font-semibold">
                <Check className="h-3.5 w-3.5 stroke-[2.5]" /> Passed
              </span>
            </div>
          </div>
        )}

        {/* Phase 05: Deployment */}
        {phase.number === "05" && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between rounded border border-line/60 bg-canvas/70 px-2 py-1.5 font-mono text-[0.625rem] text-center">
              <span className="text-muted">Build</span>
              <ArrowRight className="h-3 w-3 text-accent" />
              <span className="text-muted">Test</span>
              <ArrowRight className="h-3 w-3 text-accent" />
              <span className="text-accent font-semibold">Production</span>
              <ArrowRight className="h-3 w-3 text-accent" />
              <span className="text-fg font-medium">Users</span>
            </div>

            <div className="rounded border border-line/50 bg-canvas/60 p-2 space-y-1 font-mono text-[0.625rem]">
              <div className="flex justify-between text-fg-dim">
                <span>Application Server</span>
                <span className="text-accent">Active</span>
              </div>
              <div className="flex justify-between text-fg-dim">
                <span>API Gateway</span>
                <span className="text-accent">Connected</span>
              </div>
              <div className="flex justify-between text-fg-dim">
                <span>Database Cluster</span>
                <span className="text-accent">Synchronized</span>
              </div>
            </div>
          </div>
        )}

        {/* Phase 06: Maintenance */}
        {phase.number === "06" && (
          <div className="space-y-1.5 font-mono text-[0.6875rem]">
            <div className="rounded border border-line/60 bg-canvas/70 px-3 py-1.5 text-fg-dim text-center">
              Telemetry &amp; Monitoring
            </div>
            <div className="flex justify-center text-accent/80">
              <ArrowDown className="h-3 w-3 stroke-[2.5]" />
            </div>
            <div className="rounded border border-line/60 bg-canvas/70 px-3 py-1.5 text-fg-dim text-center">
              Security Patches &amp; Updates
            </div>
            <div className="flex justify-center text-accent/80">
              <ArrowDown className="h-3 w-3 stroke-[2.5]" />
            </div>
            <div className="rounded border border-line/60 bg-canvas/70 px-3 py-1.5 text-fg-dim text-center">
              Performance Tuning
            </div>
            <div className="flex justify-center text-accent/80">
              <ArrowDown className="h-3 w-3 stroke-[2.5]" />
            </div>
            <div className="rounded border border-line/60 bg-canvas/70 px-3 py-1.5 text-fg-dim text-center">
              Iterative Enhancements
            </div>
          </div>
        )}
      </div>

      {/* Downward Transition to Output */}
      <div className="mt-3.5 pt-2.5 border-t border-line/60 flex items-center justify-between font-mono text-[0.625rem]">
        <span className="text-muted uppercase tracking-wider">OUTPUT</span>
        <span className="text-fg font-medium flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {phase.outputName}
        </span>
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
      <div className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
        <div
          className={cn(
            "relative flex h-9 w-9 items-center justify-center rounded-full border bg-surface transition-all duration-300",
            isActive
              ? "border-accent shadow-[0_0_16px_rgba(211,255,69,0.35)] scale-105"
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
      <div className="lg:hidden absolute left-4 sm:left-5 top-5 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
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
          {/* Phase Number Label */}
          <div
            className={cn(
              "flex items-center gap-2 mb-1.5",
              isEven ? "justify-start" : "justify-start lg:justify-end",
            )}
          >
            <span className="font-mono text-xs font-semibold tracking-wider text-accent">
              {phase.phaseLabel}
            </span>
          </div>

          {/* Phase Title */}
          <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] text-fg">
            {phase.title}
          </h3>

          {/* Simple Concise Description */}
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-fg-dim max-w-xl">
            {phase.description}
          </p>
        </motion.div>

        {/* Workflow Visual Side (Input → Work → Output) */}
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
            "group relative max-w-lg w-full",
            isEven
              ? "lg:order-1 lg:mr-auto lg:pr-8"
              : "lg:order-2 lg:ml-auto lg:pl-8",
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/10 via-transparent to-accent/5 opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-60"
          />

          <WorkflowVisual phase={phase} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main Work Process Section ────────────────────────────────────────── */

export function HowItWorksTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      waterfallPhases.forEach((phase, index) => {
        const el = document.getElementById(phase.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActivePhaseIndex(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mt-14 sm:mt-18" suppressHydrationWarning>
      {/* ─── Section Intro ─── */}
      <div className="mb-12 sm:mb-16">
        <div className="flex items-center gap-3">
          <p className="label">Software Development Life Cycle</p>
          <span className="h-px flex-1 bg-line" />
        </div>
        <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-fg sm:text-3xl">
          My Work Process
        </h3>
        <p className="mt-2 text-sm sm:text-base text-fg-dim max-w-2xl leading-relaxed">
          A structured process keeps requirements clear, decisions deliberate, and delivery predictable.
        </p>

        {/* Desktop Quick Indicator Line */}
        <div className="mt-6 hidden lg:flex items-center gap-2 border-b border-line/60 pb-3">
          {waterfallPhases.map((p, idx) => {
            const isActive = idx === activePhaseIndex;
            return (
              <a
                key={p.id}
                href={`#${p.id}`}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs tracking-wider transition-colors duration-200",
                  isActive
                    ? "bg-surface-2 text-accent border border-accent/40 font-medium"
                    : "text-muted hover:text-fg hover:bg-surface/50 border border-transparent",
                )}
              >
                <span
                  className={cn(
                    "text-[0.625rem]",
                    isActive ? "text-accent" : "text-muted",
                  )}
                >
                  {p.number}
                </span>
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

      {/* ─── "What you get" Section ─── */}
      <div className="mt-20 sm:mt-24 border-t border-line pt-12 sm:pt-16">
        <div className="max-w-xl">
          <p className="label">Deliverables &amp; Outcomes</p>
          <h3 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-fg sm:text-3xl">
            What you get
          </h3>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-fg-dim">
            Beyond the finished interface, you get a product that&apos;s
            structured, tested, documented, and ready to grow.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deliverablesOverview.map((item) => (
            <div
              key={item.number}
              className="panel relative overflow-hidden p-5 sm:p-6 transition-all duration-300 hover:border-line-2 hover:-translate-y-0.5"
            >
              <span className="sweep" />
              <div className="font-mono text-xs font-semibold text-accent mb-3">
                {item.number}
              </div>
              <h4 className="text-base font-medium tracking-tight text-fg">
                {item.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-fg-dim">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Final CTA ─── */}
      <div className="mt-14 sm:mt-18 rounded-2xl border border-line-2/70 bg-gradient-to-br from-surface/80 via-surface/40 to-canvas-2/90 p-8 sm:p-10 text-center relative overflow-hidden">
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
