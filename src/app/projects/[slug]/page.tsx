import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GitFork } from "lucide-react";
import { notFound } from "next/navigation";
import { ProjectPreview } from "@/components/projects/project-preview";
import { SiteFooter } from "@/components/layout/site-footer";
import { TagRow } from "@/components/ui/section";
import { projects } from "@/data/profile";

type PageProps = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { slug } = await params; const project = projects.find((item) => item.slug === slug); return project ? { title: project.name, description: project.summary } : {}; }
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params; const projectIndex = projects.findIndex((item) => item.slug === slug); if (projectIndex === -1) notFound(); const project = projects[projectIndex];
  const primaryLink = project.links.find((link) => link.label === "View live"); const sourceLink = project.links.find((link) => link.label === "GitHub");
  return <><article className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:pb-32 sm:pt-40">
    <Link href="/#work" className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[.14em] text-muted uppercase transition-colors hover:text-accent"><ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />Back to projects</Link>
    <div className="mt-14 grid items-center gap-10 lg:grid-cols-[.94fr_1.06fr] lg:gap-16"><div><p className="label text-accent">{project.kind} / {project.year}</p><h1 className="mt-5 max-w-2xl text-5xl leading-[.94] font-medium tracking-[-.06em] text-fg sm:text-7xl">{project.name}</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-dim">{project.summary}</p><div className="mt-8 flex flex-wrap gap-3">{primaryLink ? <ProjectAction href={primaryLink.href} label={primaryLink.label} /> : null}{sourceLink ? <ProjectAction href={sourceLink.href} label="GitHub" source /> : null}</div></div><ProjectPreview project={project} index={projectIndex} priority className="shadow-2xl shadow-black/30" /></div>
    <div className="mt-20 grid gap-12 border-t border-line pt-12 lg:grid-cols-[1.25fr_.75fr]"><section><p className="label">Project brief</p><h2 className="mt-4 text-3xl font-medium tracking-[-.04em] text-fg">Built around the details that matter.</h2><p className="mt-5 max-w-2xl leading-relaxed text-fg-dim">{project.summary} The work focused on a clear, dependable experience that supports the product’s day-to-day goals without sacrificing performance or maintainability.</p></section><section><p className="label">Technology</p><TagRow items={project.stack} className="mt-5" /></section></div>
    <section className="mt-16 border-t border-line pt-12"><p className="label">Key contributions</p><ol className="mt-6 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2">{project.contributions.map((item, index) => <li key={item} className="bg-canvas p-6 sm:p-7"><span className="font-mono text-xs tracking-[.15em] text-accent">{String(index + 1).padStart(2, "0")}</span><p className="mt-6 text-base leading-relaxed text-fg-dim">{item}</p></li>)}</ol></section>
  </article><SiteFooter /></>;
}
function ProjectAction({ href, label, source = false }: { href: string; label: string; source?: boolean }) { return <a href={href} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-lg border border-line-2 px-5 py-3 font-mono text-[.6875rem] tracking-[.13em] text-fg uppercase transition-colors hover:border-accent hover:text-accent">{source ? <GitFork className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}{label}</a>; }
