"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

import "lenis/dist/lenis.css";

/**
 * Momentum scrolling via Lenis. Disabled when the visitor prefers reduced
 * motion, in which case the browser's native scrolling is left untouched.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        duration: 1.15,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        smoothWheel: true,
        anchors: { offset: -88 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
