"use client";

import { motion, useReducedMotion } from "motion/react";

import { EASE } from "@/components/motion/reveal";

export type StatBar = { label: string; value: number };

/**
 * Horizontal distribution bars that grow from zero when scrolled into view.
 */
export function StatBars({
  items,
  total,
  className,
}: {
  items: StatBar[];
  total: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (!items.length) return null;

  return (
    <ul className={className}>
      {items.map((item, i) => {
        const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
        return (
          <li key={item.label} className="flex items-center gap-3">
            <span className="w-20 shrink-0 truncate font-mono text-[0.625rem] tracking-[0.1em] text-muted uppercase">
              {item.label}
            </span>
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent/70 to-accent"
                initial={reduce ? { width: `${pct}%` } : { width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.09 }}
              />
            </span>
            <span className="w-8 shrink-0 text-right font-mono text-[0.625rem] text-muted tabular-nums">
              {pct}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}
