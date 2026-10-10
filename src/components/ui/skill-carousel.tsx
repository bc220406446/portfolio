/**
 * @fileoverview Skill Carousel Component
 * 3D coverflow carousel showcasing tech stack layers with procedural spring transitions and gesture swipe support.
 * Used in: src/components/sections/capabilities.tsx.
 */

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { SkillMark } from "@/components/ui/skill-mark";
import { skillGroups, type SkillGroup } from "@/data/profile";
import { cn } from "@/lib/utils";

const GAP = 20;
const AUTOPLAY_MS = 6500;
const CARD_WIDTH = "min(56%, 30rem)";

const IDENTITY = {
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  opacity: 1,
  filter: "blur(0px)",
} as const;

type Flourish = {
  name: string;
  from: Partial<Record<keyof typeof IDENTITY, number | string>>;
  transition: Transition;
};

const FLOURISHES: Flourish[] = [
  {
    name: "lift",
    from: { y: 56, scale: 0.94, rotate: -1.4, opacity: 0 },
    transition: { type: "spring", stiffness: 190, damping: 24, mass: 0.9 },
  },
  {
    name: "flip",
    from: { rotateY: -38, scale: 0.9, opacity: 0 },
    transition: { type: "spring", stiffness: 150, damping: 22 },
  },
  {
    name: "sweep",
    from: { x: -64, opacity: 0, filter: "blur(12px)" },
    transition: { type: "spring", stiffness: 200, damping: 26 },
  },
  {
    name: "drop",
    from: { y: -48, scale: 1.05, opacity: 0 },
    transition: { type: "spring", stiffness: 210, damping: 25, mass: 0.8 },
  },
  {
    name: "tilt",
    from: { rotate: 2.6, rotateX: 16, opacity: 0 },
    transition: { type: "spring", stiffness: 165, damping: 21 },
  },
  {
    name: "focus",
    from: { scale: 0.8, filter: "blur(16px)", opacity: 0 },
    transition: { type: "spring", stiffness: 175, damping: 23 },
  },
];

function frame(offset: number) {
  const depth = Math.abs(offset);
  const toward = offset > 0 ? -1 : 1;

  if (depth === 0) {
    return { scale: 1, opacity: 1, blur: 0, y: 0, rotateY: 0, z: 30 };
  }
  if (depth === 1) {
    return {
      scale: 0.86,
      opacity: 0.5,
      blur: 5,
      y: 12,
      rotateY: toward * 12,
      z: 20,
    };
  }
  if (depth === 2) {
    return {
      scale: 0.76,
      opacity: 0.18,
      blur: 13,
      y: 26,
      rotateY: toward * 18,
      z: 10,
    };
  }
  return { scale: 0.72, opacity: 0, blur: 18, y: 36, rotateY: 0, z: 0 };
}

export function SkillCarousel() {
  const reduce = useReducedMotion();
  const count = skillGroups.length;

  const [active, setActive] = useState(0);
  const [draw, setDraw] = useState(0);
  const [serial, setSerial] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const card = firstCardRef.current;
      if (stage) setStageWidth(stage.offsetWidth);
      if (card) setCardWidth(card.offsetWidth);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (stageRef.current) observer.observe(stageRef.current);
    if (firstCardRef.current) observer.observe(firstCardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setDraw((previous) => {
      let next = previous;
      while (next === previous) {
        next = Math.floor(Math.random() * FLOURISHES.length);
      }
      return next;
    });
    setSerial((n) => n + 1);
  }, [active]);

  const go = useCallback(
    (next: number) => setActive(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, go, paused, reduce]);

  const step = cardWidth + GAP;
  const centre = stageWidth / 2 - cardWidth / 2;

  const offsetFor = (i: number) => {
    const raw = (i - active + count) % count;
    return raw > count / 2 ? raw - count : raw;
  };

  const settle: Transition = reduce
    ? { duration: 0 }
    : { type: "spring", stiffness: 170, damping: 30, mass: 1 };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") go(active + 1);
    else if (event.key === "ArrowLeft") go(active - 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(count - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Skill layers"
      className="relative"
    >
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative overflow-hidden py-6 outline-offset-8"
      >
        <motion.div
          drag={reduce ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70 || info.velocity.x < -420) go(active + 1);
            else if (info.offset.x > 70 || info.velocity.x > 420) go(active - 1);
          }}
          style={{ touchAction: "pan-y" }}
        >
          <div className="flex items-stretch" style={{ gap: GAP }}>
            {skillGroups.map((group, i) => {
              const offset = offsetFor(i);
              const depth = Math.abs(offset);
              const { scale, opacity, blur, y, rotateY, z } = frame(offset);

              return (
                <motion.div
                  key={group.title}
                  ref={i === 0 ? firstCardRef : undefined}
                  aria-hidden={depth > 2 ? true : undefined}
                  onClick={depth > 0 && depth <= 2 ? () => go(i) : undefined}
                  animate={{
                    x: centre + (offset - i) * step,
                    scale,
                    opacity,
                    y,
                    rotateY,
                    filter: `blur(${blur}px)`,
                  }}
                  transition={ready ? settle : { duration: 0 }}
                  className={cn(
                    "shrink-0",
                    depth > 0 && depth <= 2 && "cursor-pointer",
                  )}
                  style={
                    {
                      width: CARD_WIDTH,
                      zIndex: z,
                      pointerEvents: depth > 2 ? "none" : undefined,
                      transformPerspective: 1500,
                    } as CSSProperties
                  }
                >
                  <SkillCard
                    group={group}
                    play={offset === 0 ? FLOURISHES[draw] : null}
                    serial={serial}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <CarouselButton
          label="Previous layer"
          onClick={() => go(active - 1)}
          className="absolute top-1/2 left-1 z-20 -translate-y-1/2 sm:left-3"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </CarouselButton>
        <CarouselButton
          label="Next layer"
          onClick={() => go(active + 1)}
          className="absolute top-1/2 right-1 z-20 -translate-y-1/2 sm:right-3"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </CarouselButton>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn("flex h-10 w-10 items-center justify-center rounded-lg border border-line-2/60 bg-surface/90 text-fg-dim shadow-lg shadow-black/30 backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent", className)}
    >
      {children}
    </button>
  );
}

function SkillCard({
  group,
  play,
  serial,
}: {
  group: SkillGroup;
  play: Flourish | null;
  serial: number;
}) {
  const reduce = useReducedMotion();

  const card = (
    <article className="relative flex h-full flex-col justify-center overflow-hidden rounded-panel border border-line bg-surface/80 px-6 py-10 text-center shadow-[0_36px_90px_-46px_rgba(0,0,0,0.95)] sm:px-8 sm:py-12">
      <h3 className="text-2xl leading-tight font-medium tracking-[-0.02em] text-fg sm:text-[1.75rem]">
        {group.title}
      </h3>
      <ul className="mt-9 flex flex-wrap justify-center gap-x-2 gap-y-7 sm:gap-x-3 sm:gap-y-8">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="flex w-[calc((100%-1rem)/3)] flex-col items-center gap-3 sm:w-[calc((100%-2.25rem)/4)]"
          >
            <SkillMark skill={skill} className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="font-mono text-[0.5625rem] leading-tight tracking-[0.06em] text-fg-dim uppercase break-words">
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );

  if (!play || reduce) return card;

  return (
    <motion.div
      key={`${play.name}-${serial}`}
      initial={play.from}
      animate={IDENTITY}
      transition={play.transition}
      className="h-full"
    >
      {card}
    </motion.div>
  );
}

