import { Section, SectionHeading } from "@/components/ui/section";
import { SkillCarousel } from "@/components/ui/skill-carousel";

/**
 * The stack, one layer per card, in a coverflow carousel: the centre card is
 * sharp, its neighbours recede into blur, and each card that takes the middle
 * arrives on a randomly drawn transition.
 */
export function Capabilities() {
  return (
    <Section id="capabilities" className="border-t border-line">
      <SectionHeading
        title="Capabilities"
        description="The languages, frameworks, databases and AI tooling I work with - one card per layer."
      />

      <SkillCarousel />
    </Section>
  );
}
