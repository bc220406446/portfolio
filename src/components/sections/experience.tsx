"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { EASE, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { SkillMark } from "@/components/ui/skill-mark";
import { experience } from "@/data/profile";

const workflow = [
  { step: "Scope", body: "Clarify the requirement, the constraints and what success looks like before a line of code is written." },
  { step: "Design", body: "Map the flows and the interface so structure is agreed while changes are still cheap." },
  { step: "Build", body: "Ship in reviewable increments with typed contracts and reusable components." },
  { step: "Launch", body: "Deploy, measure Core Web Vitals and SEO, then hand over documentation and support." },
];

export function Experience() {
  const reduce = useReducedMotion();
  return <Section id="experience" className="border-t border-line">
    <SectionHeading title="How I work" description="From the first idea to the final deployment, I focus on understanding the problem, building the right solution, and making sure it works in the real world." />
    {experience.map((role) => <Stagger key={role.company} className="flex flex-col gap-6"><StaggerItem><div className="panel group relative overflow-hidden p-7 sm:p-9"><span className="sweep" /><div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3"><h3 className="text-2xl font-medium tracking-[-0.025em] text-fg sm:text-3xl">{role.role}</h3><p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{role.period} · {role.duration}</p></div><p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2"><span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">{role.company}</span><span className="h-1 w-1 rounded-full bg-line-2" /><span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{role.mode}</span></p><p className="mt-7 max-w-3xl text-base leading-relaxed text-fg-dim">{role.summary}</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{role.highlights.map((highlight, i) => <motion.div key={highlight} initial={reduce ? undefined : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }} className="group/hl panel-inset flex gap-4 p-5 transition-colors duration-500 hover:border-line-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-line-2 transition-colors duration-500 group-hover/hl:bg-accent" /><span className="text-sm leading-relaxed text-fg-dim">{highlight}</span></motion.div>)}</div><div className="mt-9 border-t border-line pt-6"><p className="label mb-5">Tools used</p><ul className="flex flex-wrap gap-3">{role.stack.map((skill) => <li key={skill} className="flex items-center gap-2 rounded-lg border border-line-2 bg-surface/50 px-3 py-2"><SkillMark skill={skill} className="h-4 w-4" /><span className="font-mono text-[.625rem] tracking-[.08em] text-fg-dim uppercase">{skill}</span></li>)}</ul></div></div></StaggerItem></Stagger>)}
    <div className="mt-24"><div className="mb-8 flex items-center gap-4"><p className="label">How an engagement runs</p><span className="h-px flex-1 bg-line" /></div><WorkflowCarousel /></div>
  </Section>;
}

function WorkflowCarousel() {
  const [active, setActive] = useState(0); const move = (direction: number) => setActive((current) => (current + direction + workflow.length) % workflow.length);
  const nearby = (direction: number) => workflow[(active + direction + workflow.length) % workflow.length];
  return <div className="relative overflow-hidden py-6 sm:py-10"><div className="grid grid-cols-[minmax(12rem,1fr)_minmax(20rem,1.7fr)_minmax(12rem,1fr)] items-center gap-4 sm:gap-7"><PhasePreview phase={nearby(-1)} direction="left" onClick={() => move(-1)} /><AnimatePresence mode="wait"><motion.article key={workflow[active].step} initial={{ opacity: 0, y: 16, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: .97 }} transition={{ duration: .48, ease: EASE }} className="relative z-10 min-h-65 rounded-panel border border-line-2 bg-surface px-7 py-10 shadow-[0_30px_80px_-42px_rgba(0,0,0,.95)] sm:px-12"><span className="font-mono text-xs tracking-[.18em] text-accent">0{active + 1}</span><p className="mt-8 label">Engagement phase</p><h4 className="mt-5 text-4xl font-medium tracking-[-.05em] text-fg sm:text-5xl">{workflow[active].step}</h4><p className="mt-6 max-w-xl text-base leading-relaxed text-fg-dim">{workflow[active].body}</p></motion.article></AnimatePresence><PhasePreview phase={nearby(1)} direction="right" onClick={() => move(1)} /></div><CarouselButton label="Previous phase" onClick={() => move(-1)} className="absolute top-1/2 left-1 z-20 -translate-y-1/2 sm:left-4"><ChevronLeft className="h-6 w-6" /></CarouselButton><CarouselButton label="Next phase" onClick={() => move(1)} className="absolute top-1/2 right-1 z-20 -translate-y-1/2 sm:right-4"><ChevronRight className="h-6 w-6" /></CarouselButton></div>;
}
function PhasePreview({ phase, direction, onClick }: { phase: (typeof workflow)[number]; direction: "left" | "right"; onClick: () => void }) { return <button type="button" aria-label={`Show ${phase.step}`} onClick={onClick} className={`hidden min-h-48 rounded-xl border border-line bg-canvas-2 p-6 ${direction === "left" ? "text-right" : "text-left"} opacity-40 blur-[2px] transition-all hover:opacity-70 hover:blur-0 sm:block`}><p className="label">Next phase</p><p className="mt-6 text-2xl font-medium tracking-[-.04em] text-fg">{phase.step}</p></button>; }
function CarouselButton({ label, onClick, children, className }: { label: string; onClick: () => void; children: React.ReactNode; className?: string }) { return <button type="button" aria-label={label} onClick={onClick} className={`flex h-11 w-11 items-center justify-center border border-line-2 bg-surface/90 text-fg-dim shadow-lg shadow-black/30 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent ${className ?? ""}`}>{children}</button>; }
