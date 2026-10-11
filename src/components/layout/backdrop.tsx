/**
 * @fileoverview Backdrop Component
 * Renders the global ambient animated background gradient and interactive pointer glow.
 * Used in: src/app/layout.tsx
 */

"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, type CSSProperties } from "react";

export function Backdrop() {
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.2);
  const sx = useSpring(px, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      px.set(event.clientX / window.innerWidth);
      py.set(event.clientY / window.innerHeight);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  const xPct = useTransform(sx, (value) => value * 100);
  const yPct = useTransform(sy, (value) => value * 100);
  const pointerGlow = useMotionTemplate`radial-gradient(620px circle at ${xPct}% ${yPct}%, rgba(211,255,69,0.08), transparent 62%)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_-15%,color-mix(in_oklab,var(--color-surface)_55%,transparent)_0%,transparent_55%,var(--color-canvas)_100%)]" />

      <div
        className="animate-aurora absolute -top-56 -left-40 h-[46rem] w-[46rem] rounded-full blur-[120px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(211,255,69,0.16) 0%, rgba(211,255,69,0.05) 42%, transparent 70%)",
        }}
      />

      <div
        className="animate-aurora absolute top-[28%] -right-52 h-[42rem] w-[42rem] rounded-full blur-[130px] will-change-transform"
        style={
          {
            "--aurora-duration": "34s",
            background:
              "radial-gradient(circle, rgba(139,124,255,0.15) 0%, rgba(139,124,255,0.05) 45%, transparent 70%)",
          } as CSSProperties
        }
      />

      <div
        className="animate-aurora absolute bottom-[-18%] left-[18%] h-[40rem] w-[40rem] rounded-full blur-[140px] will-change-transform"
        style={
          {
            "--aurora-duration": "40s",
            background:
              "radial-gradient(circle, rgba(255,107,61,0.11) 0%, rgba(255,107,61,0.04) 45%, transparent 72%)",
          } as CSSProperties
        }
      />

      {reduce ? null : (
        <motion.div
          className="absolute inset-0 hidden lg:block"
          style={{ backgroundImage: pointerGlow }}
        />
      )}

      <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22/></svg>')]" />
    </div>
  );
}
