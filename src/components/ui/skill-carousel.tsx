"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
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

/** Gap between cards, in px. Kept in JS because the track step is measured. */
const GAP = 20;

/** How long a card holds the centre before the next one drifts in. */
const AUTOPLAY_MS = 6500;

/**
 * Card width as a share of the stage. The neighbours only read as "blurred
 * cards beside the active one" if they actually clear the stage edge - a card
 * much wider than half the stage pushes both of them fully out of sight.
 */
const CARD_WIDTH = "min(56%, 30rem)";

/**
 * Every key the flourish wrapper may touch. All of them are always animated
 * back to these values, otherwise a card keyed with `rotateY: -38` would keep
 * that rotation forever once its entrance ended.
 */
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
  /** Where the incoming card starts from. */
  from: Partial<Record<keyof typeof IDENTITY, number | string>>;
  transition: Transition;
};

/**
 * One is drawn at random on every move, so the card that takes the centre
 * never arrives the same way twice.
 */
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

/**
 * Where a card sits relative to the centre: the neighbours are pushed back,
 * shrunk and blurred so the eye lands on one card only.
 */
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

  /** Both widths drive the card offsets, so they are measured, not assumed. */
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

  /** One frame after the first measurement, so nothing slides in on load. */
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const mounted = useRef(false);

  /** A fresh random entrance for the card taking the centre. */
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

  /** Wraps in both directions, so the carousel has no ends. */
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
  /** Left offset that puts a card in the middle of the stage. */
  const centre = stageWidth / 2 - cardWidth / 2;

  /**
   * Signed distance to the centre on a ring, so the card to the left of the
   * first one is the last one - there is always a neighbour on both sides.
   */
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
        {/* Drag is a swipe on a wrapper that snaps back; each card positions
            itself, so the ring can wrap without the whole track re-shuffling. */}
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
      </div>

      {/* Controls: the arrows sit either side of a miniature of every card, so
          you can jump straight to one. */}
      <div className="mt-9 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <CarouselButton label="Previous layer" onClick={() => go(active - 1)}>
          <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
        </CarouselButton>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {skillGroups.map((group, i) => (
            <button
              key={group.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${group.title}`}
              aria-current={i === active}
              title={group.title}
              className={cn(
                "flex h-8 w-9 items-center justify-center gap-0.5 rounded-md border transition-all duration-300 sm:h-10 sm:w-14 sm:gap-1",
                i === active
                  ? "border-accent/50 bg-surface-2"
                  : "border-line-2/50 bg-surface/50 opacity-55 hover:opacity-100",
              )}
            >
              {group.skills.slice(0, 3).map((skill, s) => (
                <span
                  key={skill}
                  className={cn(
                    "items-center justify-center",
                    s === 2 ? "hidden sm:flex" : "flex",
                  )}
                >
                  <SkillMark
                    skill={skill}
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                  />
                </span>
              ))}
            </button>
          ))}
        </div>

        <CarouselButton label="Next layer" onClick={() => go(active + 1)}>
          <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
        </CarouselButton>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-2/60 bg-surface/60 text-fg-dim transition-colors duration-300 hover:border-line-2 hover:text-fg"
    >
      {children}
    </button>
  );
}

/**
 * One layer of the stack: title, a one-line brief and the layer's marks with
 * their names under them, each in an equal column.
 *
 * `play` is only non-null for the card in the centre, so the entrance replays
 * each time a card takes the middle - the key changes, the wrapper remounts and
 * the random flourish runs again.
 */
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
      {/* Flex rather than a grid: the columns are still equal, but a part-full
          last row centres under the others instead of hugging the left edge. */}
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
