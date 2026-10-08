"use client";

import { SkillMark } from "@/components/ui/skill-mark";
import { cn } from "@/lib/utils";

export function TechMarquee({
  stack,
  className,
}: {
  stack: string[];
  className?: string;
}) {
  if (!stack || stack.length === 0) return null;

  // Multiply the stack items so there are enough items to loop seamlessly
  const minItems = 12;
  const repeatCount = Math.max(2, Math.ceil(minItems / stack.length));
  const items = Array(repeatCount).fill(stack).flat();

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden mask-fade-x py-3 select-none",
        className,
      )}
    >
      {/* Primary track */}
      <div className="flex shrink-0 animate-marquee-left items-center gap-4 group-hover:[animation-play-state:paused] [animation-duration:28s]">
        {items.map((tech, i) => (
          <TechChip key={`${tech}-${i}`} tech={tech} />
        ))}
      </div>

      {/* Duplicate track for continuous loop */}
      <div
        className="flex shrink-0 animate-marquee-left items-center gap-4 group-hover:[animation-play-state:paused] [animation-duration:28s]"
        aria-hidden
      >
        {items.map((tech, i) => (
          <TechChip key={`dup-${tech}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function TechChip({ tech }: { tech: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-xl border border-line-2/70 bg-surface/80 px-4 py-3 shadow-sm transition-colors hover:border-accent/60 hover:bg-surface">
      <SkillMark skill={tech} className="h-5 w-5 shrink-0" />
      <span className="font-mono text-xs font-medium tracking-[0.1em] text-fg-dim uppercase whitespace-nowrap">
        {tech}
      </span>
    </div>
  );
}
