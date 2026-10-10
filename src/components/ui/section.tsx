/**
 * @fileoverview Section & SectionHeading UI Components
 * Layout containers providing standard spacing, view-constrained maxWidth grids, and motion typography headers.
 * Used across all landing and subpage sections (about, capabilities, experience, work, credentials, contact, explore).
 */

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
      className={cn("relative scroll-mt-24 py-16 sm:py-28 lg:py-32", className)}
    >
      <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-16 text-center sm:mb-20", className)}>
      <h2 className="mx-auto max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] sm:leading-[1.02] font-medium tracking-[-0.04em] text-balance text-fg">
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

