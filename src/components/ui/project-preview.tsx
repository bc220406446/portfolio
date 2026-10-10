/**
 * @fileoverview Project Preview Component
 * Responsive image preview display for project work cards with zoom transition and bottom vignette gradient.
 * Used in: src/components/sections/work.tsx and src/app/projects/[slug]/page.tsx.
 */

import Image from "next/image";

import type { Project } from "@/data/profile";
import { cn } from "@/lib/utils";

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
  const image = project.image || clientSampleImage;

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
      <div className="absolute inset-0 bg-gradient-to-t from-canvas/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

