import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 sm:py-32", className)}
    >
      <div className={cn("mx-auto w-full max-w-6xl px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

/**
 * Editorial section header: monospace index, uppercase title, and a rule that
 * draws itself in. No pills, no badges.
 */
export function SectionHeading({
  index,
  title,
  kicker,
  description,
  className,
}: {
  index: string;
  title: string;
  kicker?: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-14 sm:mb-20", className)}>
      <Reveal direction="none" duration={0.5}>
        <div className="flex items-center gap-4">
          <span className="label text-accent">{index}</span>
          <span className="h-px flex-1 origin-left bg-line" />
          {kicker ? <span className="label">{kicker}</span> : null}
        </div>
      </Reveal>

      <h2 className="mt-7 max-w-4xl text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-fg sm:text-5xl">
        <TextReveal text={title} />
      </h2>

      {description ? (
        <Reveal delay={0.12} className="mt-6 max-w-2xl">
          <p className="text-base leading-relaxed text-fg-dim sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}

/** Square-cornered tag list. Replaces the usual rounded "pill" chips. */
export function TagRow({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item} className="tag">
          {item}
        </li>
      ))}
    </ul>
  );
}
