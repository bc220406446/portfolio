"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Scroll-linked vertical parallax. Positive `distance` moves the child down as
 * the section travels up the viewport.
 */
export function Parallax({
  children,
  className,
  distance = 60,
  spring = true,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  spring?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={reduce ? undefined : { y: spring ? y : raw }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Thin scroll-progress indicator pinned under the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-accent"
    />
  );
}

/**
 * Section wrapper that fades its content in and leaves a tick on the shared
 * scroll timeline. Used for the full-bleed statement blocks.
 */
export function ScrollFade({
  children,
  className,
  amount = 0.4,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0.15 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
