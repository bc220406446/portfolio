"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
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
    <SectionHeading title="Experience" description="Where I have worked, and what an engagement with me looks like end to end." />
    {experience.map((role) => <Stagger key={role.company} className="flex flex-col gap-6"><StaggerItem><div className="panel group relative overflow-hidden p-7 sm:p-9"><span className="sweep" /><div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3"><h3 className="text-2xl font-medium tracking-[-0.025em] text-fg sm:text-3xl">{role.role}</h3><p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{role.period} · {role.duration}</p></div><p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2"><span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">{role.company}</span><span className="h-1 w-1 rounded-full bg-line-2" /><span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{role.mode}</span></p><p className="mt-7 max-w-3xl text-base leading-relaxed text-fg-dim">{role.summary}</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{role.highlights.map((highlight, i) => <motion.div key={highlight} initial={reduce ? undefined : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }} className="group/hl panel-inset flex gap-4 p-5 transition-colors duration-500 hover:border-line-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-line-2 transition-colors duration-500 group-hover/hl:bg-accent" /><span className="text-sm leading-relaxed text-fg-dim">{highlight}</span></motion.div>)}</div><div className="mt-9 border-t border-line pt-6"><p className="label mb-5">Tools used</p><ul className="flex flex-wrap gap-3">{role.stack.map((skill) => <li key={skill} className="flex items-center gap-2 border border-line-2 bg-surface/50 px-3 py-2"><SkillMark skill={skill} className="h-4 w-4" /><span className="font-mono text-[.625rem] tracking-[.08em] text-fg-dim uppercase">{skill}</span></li>)}</ul></div></div></StaggerItem></Stagger>)}
    <div className="mt-24"><div className="mb-8 flex items-center gap-4"><p className="label">How an engagement runs</p><span className="h-px flex-1 bg-line" /></div><WorkflowCarousel /></div>
  </Section>;
}

function WorkflowCarousel() {
  const [active, setActive] = useState(0); const phase = workflow[active]; const move = (direction: number) => setActive((current) => (current + direction + workflow.length) % workflow.length);
  return <div className="overflow-hidden"><div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><div className="flex items-end justify-between border border-line bg-surface/50 p-6 sm:p-8"><div><span className="font-mono text-xs tracking-[.18em] text-accent">0{active + 1}</span><p className="mt-5 text-sm leading-relaxed text-fg-dim">Use the controls to move through the engagement.</p></div><div className="flex gap-2"><CarouselButton label="Previous phase" onClick={() => move(-1)}><ArrowLeft className="h-4 w-4" /></CarouselButton><CarouselButton label="Next phase" onClick={() => move(1)}><ArrowRight className="h-4 w-4" /></CarouselButton></div></div><AnimatePresence mode="wait"><motion.article key={phase.step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .45, ease: EASE }} className="border border-line bg-canvas-2 p-8 sm:p-10"><p className="label">Engagement phase</p><h4 className="mt-5 text-4xl font-medium tracking-[-.05em] text-fg">{phase.step}</h4><p className="mt-6 max-w-xl text-base leading-relaxed text-fg-dim">{phase.body}</p></motion.article></AnimatePresence></div><div className="mt-5 flex gap-2">{workflow.map((item, index) => <button key={item.step} type="button" aria-label={`View ${item.step}`} aria-current={active === index ? "step" : undefined} onClick={() => setActive(index)} className={`h-1 flex-1 transition-colors ${active === index ? "bg-accent" : "bg-line-2 hover:bg-muted"}`} />)}</div></div>;
}
function CarouselButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) { return <button type="button" aria-label={label} onClick={onClick} className="flex h-10 w-10 items-center justify-center border border-line-2 text-fg-dim transition-colors hover:border-accent hover:text-accent">{children}</button>; }
