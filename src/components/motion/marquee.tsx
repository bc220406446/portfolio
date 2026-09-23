import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Continuous marquee. The track holds two identical copies and translates by
 * exactly -50%, so the loop is seamless regardless of item widths.
 *
 * Driven by CSS keyframes rather than a JS animation loop: it runs on the
 * compositor, survives hydration, and pauses on hover with one rule.
 */
export function Marquee({
  children,
  className,
  speed = 38,
  direction = "left",
  pauseOnHover = true,
  fade = true,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds for one full cycle. */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  fade?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        pauseOnHover && "[&:hover_.marquee-track]:[animation-play-state:paused]",
        className,
      )}
    >
      <div
        className={cn(
          "marquee-track flex w-max shrink-0 items-center will-change-transform",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
        style={{ "--marquee-duration": `${speed}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>

      {fade ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-canvas to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-canvas to-transparent" />
        </>
      ) : null}
    </div>
  );
}
