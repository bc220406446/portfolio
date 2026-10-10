/**
 * @fileoverview OpeningSequence Component
 * Cinematic fullscreen animated opening titles and entry reveal for the portfolio.
 * Used in: src/components/motion/home-intro-manager.tsx
 */

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { profile } from "@/lib/profile";
import { EASE } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

const TIMELINE = [
  { at: 300, beat: 2 }, // Name reveal
  { at: 1200, beat: 3 }, // Role reveal
  { at: 2000, beat: 4 }, // Portrait reveal (shifts text up)
  { at: 2800, beat: 5 }, // Ambient settle
  { at: 3500, beat: 6 }, // Play / Enter button
];

export function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState(reduced ? 6 : 0);

  useEffect(() => {
    if (reduced) return;
    const timers = TIMELINE.map(({ at, beat }) =>
      window.setTimeout(() => setBeat(beat), at),
    );
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        onDone();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-hidden bg-canvas"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: EASE }}
      role="dialog"
      aria-label="Opening sequence"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[7vh] bg-canvas"
        initial={{ y: 0 }}
        animate={{ y: beat >= 6 ? "-100%" : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[7vh] bg-canvas"
        initial={{ y: 0 }}
        animate={{ y: beat >= 6 ? "100%" : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 55%, rgba(211,255,69,0.18), transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 2 ? [0, 0.9, 0.5, 1] : 0 }}
        transition={{ duration: 1.4 }}
      />

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-[4.5vh] sm:bottom-[6vh] z-0 mx-auto flex h-[62vh] sm:h-[66vh] max-w-[840px] items-end justify-center"
        initial={{ opacity: 0, scale: 1.08, filter: "blur(18px) brightness(0.25)" }}
        animate={
          beat >= 4
            ? { opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }
            : {}
        }
        transition={{ duration: 1.6, ease: EASE }}
      >
        <div className="relative h-full w-full max-w-[560px]">
          <Image
            src="/sequence-portrait.webp"
            alt={profile.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 840px"
            className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_45%,transparent_98%)]"
          />
        </div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(75%_65%_at_50%_45%,transparent_25%,rgba(7,8,10,0.85)_100%)]"
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="font-medium leading-[0.92] tracking-[-0.035em] text-fg drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]"
          style={{ fontSize: "clamp(2.2rem, 6.2vw, 5.2rem)" }}
          initial={{
            opacity: 0,
            scale: 1.15,
            filter: "blur(20px)",
            letterSpacing: "0.08em",
          }}
          animate={
            beat >= 2
              ? {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  letterSpacing: "-0.035em",
                  y: beat >= 4 ? "-32vh" : 0,
                }
              : {}
          }
          transition={{ duration: 1.3, ease: EASE }}
        >
          {profile.name}
        </motion.h1>

        <motion.p
          className="mt-3.5 font-mono text-xs sm:text-sm font-semibold text-accent uppercase tracking-[0.32em] [text-shadow:0_2px_20px_rgba(211,255,69,0.35)]"
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={
            beat >= 3
              ? {
                  opacity: 1,
                  letterSpacing: "0.32em",
                  y: beat >= 4 ? "-32vh" : 0,
                }
              : {}
          }
          transition={{ duration: 1.1, ease: EASE }}
        >
          {profile.role}
        </motion.p>
      </div>

      <div className="absolute inset-x-0 bottom-[9vh] z-20 flex flex-col items-center gap-6 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={beat >= 6 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={onDone}
              tabIndex={beat >= 6 ? 0 : -1}
              className={cn(
                "group flex items-center gap-3.5 rounded-full px-8 py-3.5 font-mono text-sm font-bold tracking-wider text-canvas",
                "bg-accent shadow-[0_0_50px_rgba(211,255,69,0.35)] transition-all duration-300",
                "hover:bg-white hover:text-black hover:shadow-[0_0_60px_rgba(255,255,255,0.45)] hover:scale-105 active:scale-95 cursor-pointer",
              )}
            >
              <span className="text-base transition-transform duration-300 group-hover:scale-125">
                ▶
              </span>{" "}
              ENTER PORTFOLIO
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </motion.div>
  );
}
