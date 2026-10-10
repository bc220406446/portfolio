/**
 * @fileoverview HomeIntroManager Component
 * Manages session-based visibility of the cinematic opening intro on the home page.
 * Used in: src/app/page.tsx
 */

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { OpeningSequence } from "@/components/motion/opening-sequence";

export function HomeIntroManager() {
  const [showIntro, setShowIntro] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("intro_played_v1");
    const urlParams = new URLSearchParams(window.location.search);
    const forceIntro = urlParams.get("intro") === "1";

    if (!hasPlayed || forceIntro) {
      setShowIntro(true);
    }
    setChecked(true);
  }, []);

  const handleDone = () => {
    sessionStorage.setItem("intro_played_v1", "true");
    setShowIntro(false);
  };

  return (
    <>
      {/* Seamless black shield to prevent any flash of hero while checking session */}
      {!checked && (
        <div className="fixed inset-0 z-[140] bg-canvas" aria-hidden="true" />
      )}

      <AnimatePresence>
        {showIntro ? <OpeningSequence onDone={handleDone} /> : null}
      </AnimatePresence>
    </>
  );
}

