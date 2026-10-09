"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ProjectPreview } from "@/components/projects/project-preview";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { SkillMark } from "@/components/ui/skill-mark";
import { projects, type Project } from "@/data/profile";
import { cn } from "@/lib/utils";

type Filter = "All" | Project["kind"];
const filters: Filter[] = ["All", "Client Work", "Open Source"];

export function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.kind === filter),
    [filter],
  );

  const INITIAL_SHOW = 4;
  const displayed = showAll ? visible : visible.slice(0, INITIAL_SHOW);
  const hasMore = !showAll && visible.length > INITIAL_SHOW;

  return (
    <Section id="work" className="border-t border-line" containerClassName="max-w-6xl">
      <SectionHeading
        title="Things I've built"
        description="A collection of products, experiments, and client work - built around real problems, practical solutions, and a lot of curiosity."
      />

      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Filter projects"
        className="mb-16 flex flex-wrap justify-center gap-2"
      >
        {filters.map((option) => {
          const active = option === filter;
          return (
            <button
              key={option}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => {
                setFilter(option);
                setShowAll(false);
              }}
              className={cn(
                "rounded-lg border px-4 py-2 font-mono text-[.625rem] tracking-[.14em] uppercase transition-colors",
                active
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line-2 text-muted hover:border-accent hover:text-accent",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Project Rows */}
      {displayed.length > 0 && (
        <div className="flex flex-col divide-y divide-line">
          <AnimatePresence initial={false} mode="popLayout">
            {displayed.map((project, index) => (
              <ProjectRow key={project.slug} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <Reveal className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-lg border border-line-2 px-8 py-3 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase transition-colors hover:border-accent hover:text-accent"
          >
            Load more work
          </button>
        </Reveal>
      )}
    </Section>
  );
}

/* ─── Alternating two-column row ─────────────────────────────────────── */
function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 4) * 0.05,
      }}
      className="group grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-16"
    >
      {/* Image */}
      <div className={cn(isEven ? "lg:order-first" : "lg:order-last")}>
        <Link href={`/projects/${project.slug}`} className="block">
          <ProjectPreview
            project={project}
            index={index}
            className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </Link>
      </div>

      {/* Content */}
      <div className={cn(isEven ? "lg:order-last" : "lg:order-first")}>
        {/* Kind badge */}
        <p className="label mb-4 text-accent">{project.kind}</p>

        {/* Title */}
        <Link href={`/projects/${project.slug}`}>
          <h2 className="text-2xl font-medium leading-snug tracking-[-0.04em] text-fg transition-colors hover:text-accent sm:text-3xl">
            {project.name}
          </h2>
        </Link>

        {/* Summary */}
        <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-dim">
          {project.summary}
        </p>

        {/* Tech stack (Reference style: icon on top, uppercase label centered below) */}
        <div className="mt-8 flex flex-wrap items-start gap-6 sm:gap-7">
          {project.stack.map((tech) => (
            <div
              key={tech}
              className="group/tech flex flex-col items-center gap-2"
              title={tech}
            >
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center transition-transform duration-300 group-hover/tech:scale-110">
                <SkillMark skill={tech} className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <span className="max-w-[4.5rem] font-mono text-[0.625rem] tracking-[0.08em] text-muted uppercase text-center leading-tight transition-colors group-hover/tech:text-fg">
                {tech}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Link
            href={`/projects/${project.slug}`}
            className="group/btn inline-flex items-center gap-2.5 rounded-lg border border-line-2 bg-surface/80 px-5 py-2.5 font-mono text-[0.6875rem] tracking-[0.14em] text-fg uppercase transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_20px_rgba(211,255,69,0.15)]"
          >
            <span>Learn More</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 text-accent" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
