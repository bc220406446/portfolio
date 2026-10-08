import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GitFork } from "lucide-react";
import { notFound } from "next/navigation";
import { ProjectPreview } from "@/components/projects/project-preview";
import { TechMarquee } from "@/components/projects/tech-marquee";
import { SiteFooter } from "@/components/layout/site-footer";
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
        {/* Back Link */}
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[.14em] text-muted uppercase transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back to projects
        </Link>

        {/* Hero Section - 2 Columns (Content Left, Preview Right) */}
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
                <ProjectAction href={primaryLink.href} label={primaryLink.label} />
              ) : null}
              {sourceLink ? (
                <ProjectAction href={sourceLink.href} label="GitHub" source />
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

        {/* Project Brief Section */}
        <section className="mt-20 border-t border-line pt-16">
          <h2 className="text-3xl font-medium tracking-[-.04em] text-fg sm:text-4xl">
            Project Brief
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-fg-dim sm:text-lg">
            <p>{project.brief}</p>
          </div>
        </section>

        {/* Tech Stack Section - Continuous Marquee */}
        <section className="mt-16 border-t border-line pt-16">
          <h2 className="mb-6 text-3xl font-medium tracking-[-.04em] text-fg sm:text-4xl">
            Tech Stack
          </h2>
          <TechMarquee stack={project.stack} />
        </section>
      </article>
      <SiteFooter />
    </>
  );
}

function ProjectAction({
  href,
  label,
  source = false,
}: {
  href: string;
  label: string;
  source?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-2 rounded-lg border border-line-2 px-5 py-3 font-mono text-[.6875rem] tracking-[.13em] text-fg uppercase transition-colors hover:border-accent hover:text-accent"
    >
      {source ? (
        <GitFork className="h-3.5 w-3.5" />
      ) : (
        <ArrowUpRight className="h-3.5 w-3.5" />
      )}
      {label}
    </a>
  );
}
