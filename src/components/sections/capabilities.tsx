"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { Marquee } from "@/components/motion/marquee";
import { EASE, Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { SkillTile } from "@/components/ui/skill-tile";
import { skillGroups } from "@/data/profile";
import { cn } from "@/lib/utils";

const ticker = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Django",
  "FastAPI",
  "PyTorch",
  "TensorFlow",
  "NumPy",
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "Firebase",
  "Azure",
  "Vercel",
  "Shopify",
  "WooCommerce",
  "WordPress",
  "Medusa JS",
  "GitHub Actions",
  "Sentry",
];

export function Capabilities() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <Section id="capabilities" className="border-t border-line">
      <SectionHeading
        index="02"
        kicker="Capabilities"
        title="A stack chosen for shipping, not for résumé decoration."
        description="Proficient in the languages, frameworks, databases and AI tooling named below. Open any row to see the full list for that layer."
      />

      <div className="flex flex-col gap-3">
        {skillGroups.map((group, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={group.title} delay={i * 0.06} amount={0.15}>
              <div
                className={cn(
                  "group panel overflow-hidden transition-all duration-500",
                  isOpen
                    ? "border-[color-mix(in_oklab,var(--color-accent)_38%,transparent)]"
                    : "hover:border-line-2",
                )}
              >
                <span className="sweep" />

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`capability-${i}`}
                  className="flex w-full items-center gap-5 px-6 py-5 text-left sm:px-8 sm:py-6"
                >
                  <motion.span
                    className="font-mono text-[0.6875rem] tracking-[0.2em]"
                    animate={{ color: isOpen ? "#d3ff45" : "#737b88" }}
                    transition={{ duration: 0.4 }}
                  >
                    0{i + 1}
                  </motion.span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-lg font-medium tracking-[-0.015em] transition-colors duration-500 sm:text-xl",
                        isOpen ? "text-fg" : "text-fg-dim group-hover:text-fg",
                      )}
                    >
                      {group.title}
                    </span>
                    <span className="mt-1.5 block font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                      {group.caption}
                    </span>
                  </span>

                  <span className="hidden font-mono text-[0.625rem] tracking-[0.14em] text-muted uppercase sm:block">
                    {group.skills.length} skills
                  </span>

                  <motion.span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line-2 text-fg-dim"
                    animate={{
                      rotate: isOpen ? 135 : 0,
                      borderColor: isOpen ? "#d3ff45" : "#333a48",
                      color: isOpen ? "#d3ff45" : "#a7aeb9",
                    }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`capability-${i}`}
                      key="content"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-7 sm:px-8">
                        <div className="h-px w-full bg-line" />
                        {/* Icon wall: marks instead of names. Hover reveals the
                            name, and sr-only text keeps it for screen readers. */}
                        <motion.ul
                          className="mt-6 flex flex-wrap gap-2.5"
                          initial="hidden"
                          animate="show"
                          variants={{
                            hidden: {},
                            show: {
                              transition: {
                                staggerChildren: 0.03,
                                delayChildren: 0.08,
                              },
                            },
                          }}
                        >
                          {group.skills.map((skill) => (
                            <motion.li
                              key={skill}
                              variants={{
                                hidden: { opacity: 0, y: 12, scale: 0.88 },
                                show: {
                                  opacity: 1,
                                  y: 0,
                                  scale: 1,
                                  transition: { duration: 0.45, ease: EASE },
                                },
                              }}
                            >
                              <SkillTile skill={skill} />
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10" direction="none">
        <div className="panel flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-xl text-sm leading-relaxed text-fg-dim">
            Currently deepening: AI-assisted workflows, automation pipelines and
            server-rendered application architecture.
          </p>
          <span className="flex shrink-0 items-center gap-2.5">
            <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="label text-fg-dim">Always shipping</span>
          </span>
        </div>
      </Reveal>

      <Marquee speed={46} className="mt-14 border-y border-line py-5">
        {ticker.map((item) => (
          <span
            key={item}
            className="px-5 font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </Section>
  );
}
