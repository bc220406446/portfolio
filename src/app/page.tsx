/**
 * @fileoverview Home Page Route
 * Renders the primary landing experience, including cinematic opening sequence, hero, about, and explore navigation blocks.
 * Route: /
 */

import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { PageNavigationBlock } from "@/components/sections/page-navigation-block";
import { HomeIntroManager } from "@/components/motion/home-intro-manager";
import { profile } from "@/lib/profile";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  description:
    "I'm a full-stack web developer focused on building modern, scalable, and user-focused digital products. My work spans full-stack applications, e-commerce, CMS platforms, and AI-powered solutions.",
  sameAs: [profile.links.github, profile.links.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HomeIntroManager />
      <Hero />
      <About />
      <PageNavigationBlock />
    </>
  );
}

