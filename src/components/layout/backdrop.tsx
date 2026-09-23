"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Fixed ambient backdrop: blueprint grid, a slow drifting accent bloom, and a
 * faint film grain. Purely decorative and pointer-transparent.
 */
export function Backdrop() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-[0.55]" />

      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_35%,var(--color-canvas)_100%)]" />

      <motion.div
        className="absolute -top-40 -left-40 h-[42rem] w-[42rem] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(211,255,69,0.13) 0%, transparent 68%)",
        }}
        animate={reduce ? undefined : { x: [0, 90, -30, 0], y: [0, 60, 110, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/3 -right-52 h-[38rem] w-[38rem] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,61,0.10) 0%, transparent 68%)",
        }}
        animate={reduce ? undefined : { x: [0, -70, 20, 0], y: [0, -40, 70, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 opacity-[0.035] mix-blend-soft-light [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22/></filter><rect width=%22140%22 height=%22140%22 filter=%22url(%23n)%22/></svg>')]" />
    </div>
  );
}
