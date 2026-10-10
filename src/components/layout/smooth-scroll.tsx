/**
 * @fileoverview SmoothScroll Component
 * Provides momentum-based smooth scrolling via Lenis with reduced-motion fallback.
 * Used in: src/app/layout.tsx
 */

"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

import "lenis/dist/lenis.css";

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
