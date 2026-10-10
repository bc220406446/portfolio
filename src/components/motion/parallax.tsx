/**
 * @fileoverview Parallax Motion & Scroll Progress Components
 * Provides scroll-linked parallax motion effects and a pinned page-level progress bar.
 * Used in: src/app/layout.tsx (ScrollProgress) and reusable across pages.
 */

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

