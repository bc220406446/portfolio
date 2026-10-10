/**
 * @fileoverview Project Detail Dynamic Route
 * Dynamic case study page presenting individual project overview, live/source links, brief, and continuous tech marquee.
 * Route: /projects/[slug]
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GitFork } from "lucide-react";
import { notFound } from "next/navigation";
import { ProjectPreview } from "@/components/ui/project-preview";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { ActionLink } from "@/components/ui/action";
import { projects } from "@/data/profile";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? { title: project.name, description: project.summary }
    : {};
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  if (projectIndex === -1) notFound();
  const project = projects[projectIndex];

  const primaryLink = project.links.find((link) => link.label === "View live");
  const sourceLink = project.links.find((link) => link.label === "GitHub");

  return (
    <>
      <article className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:pb-32 sm:pt-40">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[.14em] text-muted uppercase transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back to projects
        </Link>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="label text-accent">{project.kind}</p>
            <h1 className="mt-4 max-w-2xl text-4xl leading-[1.02] font-medium tracking-[-.05em] text-fg sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-dim sm:text-lg">
              {project.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryLink ? (
                <ActionLink href={primaryLink.href} variant="primary" external>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {primaryLink.label}
                </ActionLink>
              ) : null}
              {sourceLink ? (
                <ActionLink href={sourceLink.href} variant="secondary" external>
                  <GitFork className="h-3.5 w-3.5" />
                  GitHub
                </ActionLink>
              ) : null}
            </div>
          </div>

          <div className="w-full">
            <ProjectPreview
              project={project}
              index={projectIndex}
              priority
              className="shadow-2xl shadow-black/40"
            />
          </div>
        </div>

        <section className="mt-20 border-t border-line pt-16">
          <h2 className="text-3xl font-medium tracking-[-.04em] text-fg sm:text-4xl">
            Project Brief
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-fg-dim sm:text-lg">
            <p>{project.brief}</p>
          </div>
        </section>

        <section className="mt-16 border-t border-line pt-16">
          <h2 className="mb-6 text-3xl font-medium tracking-[-.04em] text-fg sm:text-4xl">
            Tech Stack
          </h2>
          <TechMarquee stack={project.stack} />
        </section>
      </article>
    </>
  );
}

