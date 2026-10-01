"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ProjectPreview } from "@/components/projects/project-preview";
import { EASE } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { projects, type Project } from "@/data/profile";
import { cn } from "@/lib/utils";

type Filter = "All" | Project["kind"];
const filters: Filter[] = ["All", "Client Work", "Open Source"];

export function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.kind === filter), [filter]);
  return <Section id="work" className="border-t border-line" containerClassName="max-w-7xl">
    <header className="mb-10 flex flex-col justify-between gap-7 border-b border-line pb-7 sm:flex-row sm:items-end"><div><p className="label text-accent">Selected work / {String(projects.length).padStart(2, "0")} projects</p><h2 className="mt-4 text-4xl font-medium tracking-[-.055em] text-fg sm:text-6xl">Project index</h2></div><p className="max-w-sm text-sm leading-relaxed text-fg-dim sm:text-right">A selection of client launches and open-source products. Open a project to see the brief, build decisions and stack.</p></header>
    <div role="tablist" aria-label="Filter projects" className="mb-9 flex flex-wrap gap-2">{filters.map((option) => { const active = option === filter; const count = option === "All" ? projects.length : projects.filter((project) => project.kind === option).length; return <button key={option} role="tab" aria-selected={active} type="button" onClick={() => setFilter(option)} className={cn("border px-3 py-2 font-mono text-[.625rem] tracking-[.14em] uppercase transition-colors", active ? "border-accent bg-accent text-accent-ink" : "border-line-2 text-muted hover:border-accent hover:text-accent")}>{option} <span className="ml-1 opacity-65">{String(count).padStart(2, "0")}</span></button>; })}</div>
    <motion.ul layout className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3"><AnimatePresence initial={false} mode="popLayout">{visible.map((project) => <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />)}</AnimatePresence></motion.ul>
  </Section>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <motion.li layout initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .55, ease: EASE }}><Link href={`/projects/${project.slug}`} className="group block border border-line bg-canvas-2 p-3 transition-colors duration-300 hover:border-accent/70"><ProjectPreview project={project} index={index} /><div className="border-x border-b border-line p-4 transition-colors group-hover:border-accent/50"><div className="flex items-center justify-between gap-3 font-mono text-[.625rem] tracking-[.14em] text-muted uppercase"><span>{project.kind}</span><span>{project.year}</span></div><div className="mt-6 flex items-start justify-between gap-3"><div><h3 className="text-xl font-medium tracking-[-.04em] text-fg transition-colors group-hover:text-accent">{project.name}</h3><p className="mt-1.5 font-mono text-[.625rem] tracking-[.12em] text-muted uppercase">{project.category}</p></div><ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" /></div><p className="mt-4 line-clamp-3 text-sm leading-relaxed text-fg-dim">{project.summary}</p><span className="mt-5 inline-block font-mono text-[.625rem] tracking-[.14em] text-accent uppercase">{project.kind === "Client Work" ? "View case study →" : "View project →"}</span></div></Link></motion.li>;
}
