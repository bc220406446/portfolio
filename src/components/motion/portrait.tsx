"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { EASE } from "@/components/motion/reveal";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Portrait treatment: a curtain wipe on entry, a slow zoom-out, scroll-linked
 * parallax and a rotating accent halo. Used both in the hero and in About - the
 * differing column widths give each instance its own presence.
 *
 * IMPORTANT: the reveal is driven by a *curtain* sibling, never by clipping the
 * image itself. An element whose own `clip-path` hides it is reported by
 * IntersectionObserver as never intersecting, so a `whileInView` that would
 * remove that clip can never fire - the reveal deadlocks and the image stays
 * invisible forever. The curtain is always fully intersecting, so it animates
 * reliably and the photograph is never gated behind an observer.
 */
export function Portrait({
  priority = false,
  sizes = "(max-width: 1024px) 80vw, 460px",
  className,
  delay = 0,
}: {
  priority?: boolean;
  sizes?: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.1, 0.96]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Rotating accent halo */}
      {reduce ? null : (
        <motion.span
          aria-hidden
          className="absolute -inset-6 hidden rounded-[2.5rem] opacity-40 blur-2xl will-change-transform sm:block"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(211,255,69,0.35), rgba(139,124,255,0.28), rgba(255,107,61,0.22), rgba(211,255,69,0.35))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
        />
      )}

      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[2rem] blur-[70px]"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(211,255,69,0.22), transparent 62%)",
          scale: reduce ? undefined : glowScale,
        }}
      />

      <motion.div style={reduce ? undefined : { y }} className="relative">
        <div className="panel group relative overflow-hidden rounded-[2rem] p-2.5">
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-surface">
            <motion.div
              className="h-full w-full"
              initial={reduce ? undefined : { scale: 1.1 }}
              whileInView={reduce ? undefined : { scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.7, ease: EASE, delay }}
            >
              <Image
                src="/portrait.webp"
                alt={`${profile.name}, ${profile.role}`}
                width={1024}
                height={1024}
                priority={priority}
                sizes={sizes}
                loading="eager"
                className="h-full w-full object-cover object-center brightness-[0.92] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:brightness-105"
              />
            </motion.div>

            {/* Curtain: a sibling that is always visible, so its observer always
                fires. Bottom origin means it sweeps downward as it collapses. */}
            {reduce ? null : (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-canvas"
                style={{ originY: 1 }}
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.05, ease: EASE, delay }}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
