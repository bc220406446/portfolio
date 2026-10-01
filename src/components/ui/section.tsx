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
 * Editorial section header. The section's own name carries the heading, and a
 * single short line says what the section holds underneath it.
 *
 * The name is the heading on purpose: a long, comma-balanced sentence ("formal
 * training in computer science, applied training in the tools") is hard to read
 * at display size, tells you nothing the section does not, and reads like a
 * slogan. Two or three words sit better big and let the line below do the
 * explaining.
 */
export function SectionHeading({
  title,
  description,
  className,
}: {
  /** The section's name - what it is called, not what it argues. */
  title: string;
  /** One short line on what the section covers. */
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-16 text-center sm:mb-20", className)}>
      <h2 className="mx-auto max-w-4xl text-5xl leading-[1.02] font-medium tracking-[-0.04em] text-balance text-fg sm:text-6xl lg:text-7xl">
        <TextReveal text={title} />
      </h2>

      {description ? (
        <Reveal delay={0.12} className="mx-auto mt-6 max-w-xl">
          <p className="text-base leading-relaxed text-pretty text-fg-dim">
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
