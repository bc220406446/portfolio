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
        title="What I build with"
        description="The technologies, frameworks, and AI tools I use to turn ideas into reliable, production-ready products."
      />

      <SkillCarousel />
    </Section>
  );
}
