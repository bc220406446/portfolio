"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

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
        title="Platforms, storefronts and tools — built, launched, still running."
        description="A mix of client engagements and open-source builds. Every entry below shipped with a live deployment or a working handoff."
      />

      {/* Rectangular filter controls — deliberately not pills. */}
      <div
        role="tablist"
        aria-label="Filter projects"
        className="mb-10 flex flex-wrap gap-px border border-line bg-line"
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
                "relative flex-1 px-5 py-3.5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-300",
                isActive
                  ? "bg-canvas text-fg"
                  : "bg-canvas/40 text-muted hover:text-fg",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute inset-x-0 bottom-0 h-px bg-accent"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              ) : null}
              {option}
              <span className="ml-2 text-accent/60">{count}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="border-t border-line">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.04 }}
      className="group relative border-b border-line"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100"
      />

      <div className="grid gap-8 py-10 lg:grid-cols-[1.05fr_1.35fr_0.85fr] lg:gap-12">
        <div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.625rem] text-accent/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="label">{project.kind}</span>
            <span className="label">{project.year}</span>
          </div>

          <h3 className="mt-5 text-2xl leading-tight font-medium tracking-[-0.025em] text-fg transition-colors duration-500 group-hover:text-accent sm:text-3xl">
            {project.name}
          </h3>

          <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
            {project.category}
          </p>
        </div>

        <div>
          <p className="text-base leading-relaxed text-fg-dim">
            {project.summary}
          </p>

          <ul className="mt-5 space-y-2.5">
            {project.contributions.map((item) => (
              <li
                key={item}
                className="flex gap-3.5 text-sm leading-relaxed text-muted"
              >
                <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-line-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-6">
          <TagRow items={project.stack} />
          <div className="flex flex-col items-start gap-3">
            {project.links.map((link) => (
              <TextLink key={link.href} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </div>
        </div>
      </div>
    </motion.li>
  );
}
