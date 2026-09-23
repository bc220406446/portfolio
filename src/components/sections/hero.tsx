"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Counter } from "@/components/motion/counter";
import { EASE, Reveal } from "@/components/motion/reveal";
import { CharReveal } from "@/components/motion/text-reveal";
import { ActionLink } from "@/components/ui/action";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center pt-32 pb-20"
    >
      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="mx-auto w-full max-w-6xl px-6"
      >
        <div className="grid items-end gap-14 lg:grid-cols-[1.55fr_1fr]">
          <div>
            <Reveal direction="none" duration={0.6}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="inline-flex items-center gap-2.5">
                  <span className="animate-pulse-dot h-1.5 w-1.5 bg-accent" />
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

            <Reveal delay={0.7} className="mt-8 max-w-xl">
              <p className="text-lg leading-relaxed text-fg-dim sm:text-xl">
                <span className="text-fg">{profile.role}</span> building{" "}
                <span className="font-serif text-[1.15em] italic text-accent">
                  modern, scalable
                </span>{" "}
                web products — commerce, platforms and AI-assisted tooling.
              </p>
            </Reveal>

            <Reveal delay={0.82} className="mt-10">
              <div className="flex flex-wrap items-center gap-3">
                <ActionLink href="#contact" variant="primary">
                  Start a project
                </ActionLink>
                <ActionLink href="#work" variant="outline">
                  View selected work
                </ActionLink>
                <ActionLink
                  href={profile.links.github}
                  variant="ghost"
                  className="px-3"
                >
                  GitHub ↗
                </ActionLink>
              </div>
            </Reveal>
          </div>

          {/* Contact / availability panel */}
          <Reveal delay={0.9} direction="left">
            <div className="relative border border-line bg-surface/40 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="label">Profile</span>
                <span className="label text-accent">001</span>
              </div>

              <dl className="divide-y divide-line">
                <div className="flex items-start justify-between gap-6 px-5 py-4">
                  <dt className="label pt-0.5">Based</dt>
                  <dd className="text-right text-sm text-fg-dim">
                    {profile.location}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6 px-5 py-4">
                  <dt className="label pt-0.5">Email</dt>
                  <dd className="text-right">
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm break-all text-fg-dim transition-colors hover:text-accent"
                    >
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6 px-5 py-4">
                  <dt className="label pt-0.5">Phone</dt>
                  <dd className="text-right">
                    <a
                      href={`tel:${profile.phoneHref}`}
                      className="text-sm text-fg-dim transition-colors hover:text-accent"
                    >
                      {profile.phone}
                    </a>
                  </dd>
                </div>
                <div className="px-5 py-4">
                  <dt className="label">Open to</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-1.5">
                      {profile.availability.map((item) => (
                        <li key={item} className="tag">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Stat readout */}
        <motion.dl
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } },
          }}
          className="mt-20 grid grid-cols-2 border-t border-line lg:grid-cols-4"
        >
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: EASE },
                },
              }}
              className={cn(
                "border-line py-6",
                i % 2 === 1 && "border-l pl-6 sm:pl-8",
                i >= 2 && "border-t lg:border-t-0",
                i > 0 && "lg:border-l lg:pl-8",
              )}
            >
              <dt className="label">{stat.label}</dt>
              <dd className="mt-3 text-3xl font-medium tracking-[-0.03em] text-fg sm:text-4xl">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>

      <Reveal
        direction="none"
        delay={1.4}
        className="absolute inset-x-0 bottom-8 hidden justify-center lg:flex"
      >
        <a href="#about" className="group flex flex-col items-center gap-2">
          <span className="label">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-line-2 to-transparent" />
        </a>
      </Reveal>
    </section>
  );
}
