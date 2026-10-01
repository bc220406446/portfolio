"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { Portrait } from "@/components/motion/portrait";
import { EASE, Reveal } from "@/components/motion/reveal";
import { CharReveal } from "@/components/motion/text-reveal";
import { ActionLink } from "@/components/ui/action";
import { profile } from "@/data/profile";

const rotating = [
  "Full Stack Web Developer",
  "NLP & Machine Learning Developer",
  "LLM Application Developer",
  "AI Automation Engineer",
  "Generative AI Developer",
  "AI-Powered Product Engineer",
  "E-commerce Solutions Engineer",
  "Intelligent Systems Developer",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % rotating.length),
      2800,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Kept deliberately subtle - enough to soften the edge as the hero leaves,
  // never enough to read as a blur.
  const blur = useTransform(scrollYProgress, [0, 0.8], [0, 1.5]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center pt-32 pb-24"
    >
      <motion.div
        style={reduce ? undefined : { y, opacity, filter }}
        className="mx-auto w-full max-w-6xl px-6"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Reveal direction="none" duration={0.6}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="panel inline-flex items-center gap-2.5 rounded-lg px-4 py-2">
                  <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="label text-fg-dim">
                    Available for new work
                  </span>
                </span>
                <span className="label">{profile.location}</span>
              </div>
            </Reveal>

            <h1 className="mt-9 text-[clamp(3rem,9vw,6.5rem)] leading-[0.94] font-medium tracking-[-0.045em]">
              <span className="block text-fg">
                <CharReveal text="Muhammad" delay={0.25} />
              </span>
              <span className="block text-fg">
                <CharReveal text="Kamran" delay={0.5} />
                <span className="animate-blink-caret ml-1 inline-block h-[0.72em] w-[3px] translate-y-[0.02em] bg-accent align-baseline" />
              </span>
            </h1>

            {/* Rotating role line */}
            <Reveal delay={0.62} className="mt-7">
              <div className="flex h-8 items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={roleIndex}
                    initial={reduce ? false : { y: 18, opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={reduce ? undefined : { y: -18, opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="font-mono text-sm tracking-[0.18em] text-accent uppercase sm:text-base"
                  >
                    {rotating[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </Reveal>

            <Reveal delay={0.72} className="mt-5 max-w-xl">
              <p className="text-lg leading-relaxed text-fg-dim sm:text-xl">
                I build{" "}
                <span className="font-serif text-[1.15em] italic text-accent">
                  modern, scalable
                </span>{" "}
                web products - commerce, platforms and AI-assisted tooling, from
                database schema to the last hover state.
              </p>
            </Reveal>

            <Reveal delay={0.84} className="mt-10">
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic strength={0.22}>
                  <ActionLink href="#contact" variant="primary">
                    Start a project
                  </ActionLink>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <ActionLink href="#work" variant="outline">
                    View selected work
                  </ActionLink>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Not wrapped in Reveal: the portrait runs its own curtain wipe and
              zoom, and an invisible animated parent would hide both. */}
          <div className="mx-auto w-full max-w-[23rem] lg:mx-0 lg:max-w-none">
            <Portrait
              priority
              delay={0.35}
              sizes="(max-width: 1024px) 72vw, 420px"
            />
          </div>
        </div>

      </motion.div>
    </section>
  );
}
