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
          const count =
            option === "All"
              ? projects.length
              : projects.filter((p) => p.kind === option).length;
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
                "rounded-lg border px-3 py-2 font-mono text-[.625rem] tracking-[.14em] uppercase transition-colors",
                active
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line-2 text-muted hover:border-accent hover:text-accent",
              )}
            >
              {option}{" "}
              <span className="ml-1 opacity-65">
                {String(count).padStart(2, "0")}
              </span>
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
  const liveLink = project.links.find((l) => l.label === "View live");

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

        {/* Tech icons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1.5 rounded-md border border-line-2 bg-surface px-2.5 py-1.5"
              title={tech}
            >
              <SkillMark skill={tech} className="h-3.5 w-3.5" />
              <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-muted uppercase">
                {tech}
              </span>
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={liveLink ? liveLink.href : `/projects/${project.slug}`}
          target={liveLink ? "_blank" : undefined}
          rel={liveLink ? "noreferrer noopener" : undefined}
          className="mt-7 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-accent uppercase transition-opacity hover:opacity-70"
        >
          {liveLink ? "View live" : "Read more"}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  );
}
