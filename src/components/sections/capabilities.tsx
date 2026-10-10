/**
 * @fileoverview Capabilities Section Component
 * Skills presentation section showcasing tech stack categories through interactive 3D skill carousels.
 * Used in: src/app/capabilities/page.tsx.
 */

import { Section, SectionHeading } from "@/components/ui/section";
import { SkillCarousel } from "@/components/ui/skill-carousel";

export function Capabilities() {
  return (
    <Section id="capabilities" className="border-t border-line">
      <SectionHeading
        title="What I build with"
        description="The core technologies I work with across frontend, backend, data, AI, e-commerce, and infrastructure, backed by hands-on development experience."
      />

      <SkillCarousel />
    </Section>
  );
}

