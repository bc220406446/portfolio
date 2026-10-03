import Image from "next/image";

import type { Project } from "@/data/profile";
import { cn } from "@/lib/utils";

const projectImages: Partial<Record<Project["slug"], string>> = {
  "sovereign-e-commerce-store": "/sovereign-e-commerce-store.vercel.app.webp",
  "student-management-web-application": "/smwa.freehosting.dev.webp",
  "smart-query-management": "/smart-query-management.vercel.app.webp",
  "community-skill-exchange": "/community-skill-exchange-platform.vercel.app.webp",
};

// Client screenshots can replace this one independently as they become available.
const clientSampleImage = "/sovereign-e-commerce-store.vercel.app.webp";

export function ProjectPreview({ project, className, priority = false }: { project: Project; index: number; className?: string; priority?: boolean }) {
  const image = projectImages[project.slug] ?? clientSampleImage;
  const isSample = !projectImages[project.slug];
  return <div className={cn("group/preview relative isolate aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-surface", className)}>
    <Image src={image} alt={`${project.name} website preview`} fill sizes="(min-width: 1280px) 31vw, (min-width: 640px) 48vw, 100vw" priority={priority} className="object-contain p-1 transition-transform duration-700" />
    <div className="absolute inset-0 bg-linear-to-t from-canvas/80 via-transparent to-canvas/10" />
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4"><span className="font-mono text-[.625rem] tracking-[.14em] text-white/80 uppercase">{project.category}</span>{isSample ? <span className="rounded-md border border-white/25 bg-canvas/55 px-2 py-1 font-mono text-[.5rem] tracking-[.12em] text-white/75 uppercase">Sample image</span> : null}</div>
  </div>;
}
