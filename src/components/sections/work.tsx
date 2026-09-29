"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import { SpotlightCard } from "@/components/motion/magnetic";
import { EASE } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/action";
import { Section, SectionHeading, TagRow } from "@/components/ui/section";
import { projects, type Project } from "@/data/profile";
import { cn } from "@/lib/utils";

type Filter = "All" | Project["kind"];

const filters: Filter[] = ["All", "Client Work", "Open Source"];

export function Work() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.kind === filter)),
    [filter],
  );

  return (
    <Section id="work" className="border-t border-line">
      <SectionHeading
        index="04"
        kicker="Selected work"
        title="Platforms, storefronts and tools - built, launched, still running."
        description="A mix of client engagements and open-source builds. Every entry below shipped with a live deployment or a working handoff."
      />

      <div
        role="tablist"
        aria-label="Filter projects"
        className="panel mb-10 inline-flex gap-1 p-1.5"
      >
        {filters.map((option) => {
          const isActive = filter === option;
          const count =
            option === "All"
              ? projects.length
              : projects.filter((p) => p.kind === option).length;

          return (
            <button
              key={option}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setFilter(option)}
              className={cn(
                "relative rounded-xl px-4 py-2.5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-300",
                isActive ? "text-accent-ink" : "text-muted hover:text-fg",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="filter-chip"
                  className="absolute inset-0 rounded-xl bg-accent"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              ) : null}
              <span className="relative z-10">
                {option}
                <span className={cn("ml-2", isActive ? "text-accent-ink/60" : "text-accent/50")}>
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="flex flex-col gap-5">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14, scale: 0.98 }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.05 }}
    >
      <SpotlightCard className="group panel overflow-hidden" intensity={3.5}>
        <span className="sweep" />

        <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.05fr_1.35fr_0.8fr] lg:gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-accent/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-md bg-surface-2/70 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                {project.kind}
              </span>
              <span className="label">{project.year}</span>
            </div>

            <h3 className="mt-5 text-2xl leading-tight font-medium tracking-[-0.025em] text-fg transition-colors duration-500 group-hover:text-accent sm:text-3xl">
              {project.name}
            </h3>

            <p className="mt-3 font-mono text-[0.625rem] tracking-[0.14em] text-muted uppercase">
              {project.category}
            </p>
          </div>

          <div>
            <p className="text-base leading-relaxed text-fg-dim">
              {project.summary}
            </p>

            <ul className="mt-6 space-y-2.5">
              {project.contributions.map((item) => (
                <li
                  key={item}
                  className="group/li flex gap-3.5 text-sm leading-relaxed text-muted transition-colors duration-500 hover:text-fg-dim"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line-2 transition-colors duration-500 group-hover/li:bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-7">
            <TagRow items={project.stack} />
            <div className="flex flex-col items-start gap-3.5">
              {project.links.map((link) => (
                <TextLink key={link.href} href={link.href}>
                  {link.label}
                </TextLink>
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.li>
  );
}
