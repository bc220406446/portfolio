import Image from "next/image";

import type { Project } from "@/data/profile";
import { cn } from "@/lib/utils";

const projectImages: Partial<Record<Project["slug"], string>> = {
  "sovereign-e-commerce-store": "/sovereign-e-commerce-store.vercel.app.webp",
  "student-management-web-application": "/smwa.freehosting.dev.webp",
  "smart-query-management": "/smart-query-management.vercel.app.webp",
  "community-skill-exchange": "/community-skill-exchange-platform.vercel.app.webp",
};

// Fallback for client projects that don't have a dedicated screenshot yet.
const clientSampleImage = "/sovereign-e-commerce-store.vercel.app.webp";

export function ProjectPreview({
  project,
  className,
  priority = false,
}: {
  project: Project;
  index: number;
  className?: string;
  priority?: boolean;
}) {
  const image = projectImages[project.slug] ?? clientSampleImage;

  return (
    <div
      className={cn(
        "group/preview relative isolate aspect-[16/10] w-full overflow-hidden rounded-xl border border-line-2/80 bg-surface shadow-xl",
        className,
      )}
    >
      <Image
        src={image}
        alt={`${project.name} website preview`}
        fill
        sizes="(min-width: 1280px) 50vw, (min-width: 640px) 50vw, 100vw"
        priority={priority}
        className="object-fit object-top transition-transform duration-700 ease-out group-hover/preview:scale-105"
      />
      {/* Subtle bottom fade so content below reads cleanly */}
      <div className="absolute inset-0 bg-gradient-to-t from-canvas/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
