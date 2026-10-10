/**
 * @fileoverview Magnetic and SpotlightCard Components
 * Interactive motion primitives providing magnetic cursor pull and 3D tilting spotlight cards.
 * Used in: Hero, OpeningSequence, ProjectPreview, and ActionButton components.
 */

"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Magnetic({
  children,
  className,
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 220, damping: 18, mass: 0.5 });
  const y = useSpring(py, { stiffness: 220, damping: 18, mass: 0.5 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    py.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      style={{ x, y }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

export function SpotlightCard({
  children,
  className,
  intensity = 7,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 140, damping: 18 });
  const sy = useSpring(my, { stiffness: 140, damping: 18 });

  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const glow = useTransform(
    [sx, sy],
    ([a, b]: number[]) =>
      `radial-gradient(520px circle at ${a * 100}% ${b * 100}%, rgba(211,255,69,0.10), transparent 62%)`,
  );

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width);
    my.set((event.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1100 }
      }
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundImage: glow }}
      />
      {children}
    </motion.div>
  );
}
