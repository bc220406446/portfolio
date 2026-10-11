/**
 * @fileoverview Experience Page Route
 * Dedicated route presenting professional engineering roles, commercial track record, and the SDLC work process.
 * Route: /experience
 */

import type { Metadata } from "next";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional work experience, commercial track record, and software development lifecycle process.",
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <div className="pt-24 pb-16">
      <Experience />
    </div>
  );
}

