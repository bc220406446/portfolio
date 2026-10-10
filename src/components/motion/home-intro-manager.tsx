/**
 * @fileoverview HomeIntroManager Component
 * Manages session-based visibility of the cinematic opening intro on the home page.
 * Used in: src/app/page.tsx
 */

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { OpeningSequence } from "@/components/motion/opening-sequence";

export function HomeIntroManager() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("intro_played_v1");
    const urlParams = new URLSearchParams(window.location.search);
    const forceIntro = urlParams.get("intro") === "1";

    if (!hasPlayed || forceIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleDone = () => {
    sessionStorage.setItem("intro_played_v1", "true");
    setShowIntro(false);
  };

  return (
    <AnimatePresence>
      {showIntro ? <OpeningSequence onDone={handleDone} /> : null}
    </AnimatePresence>
  );
}
