/**
 * @fileoverview Experience Page Route
 * Dedicated route presenting professional engineering roles, commercial track record, and the SDLC work process.
 * Route: /experience
 */

import { Experience } from "@/components/sections/experience";

export default function ExperiencePage() {
  return (
    <div className="pt-24 pb-16">
      <Experience />
    </div>
  );
}

