"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType } from "react";

import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: (c: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: c.stagger, delayChildren: c.delay },
  }),
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: EASE },
  },
};

/**
 * Word-by-word mask reveal. Each word sits in an overflow-hidden box and slides
 * up into place.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "span",
  stagger = 0.045,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag as "span"];

  return (
    <MotionTag
      className={cn("inline", className)}
      variants={container}
      custom={{ stagger, delay: delay + 0.08 }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.12em]"
          aria-hidden
        >
          <motion.span variants={word} className="inline-block whitespace-pre">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Per-character reveal for short, high-impact strings such as the name.
 */
export function CharReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={cn("inline-flex overflow-hidden", className)} aria-label={text}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block whitespace-pre"
          initial={{ y: "115%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.035 }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}
