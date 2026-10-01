import { SiteFooter } from "@/components/layout/site-footer";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { profile } from "@/data/profile";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  description:
    "Full Stack Web Developer specialising in Next.js, React, TypeScript, Node.js, Django and e-commerce platforms.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressCountry: "PK",
  },
  sameAs: [profile.links.github, profile.links.linkedin],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Django",
    "PostgreSQL",
    "WordPress",
    "Shopify",
    "WooCommerce",
    "SureCart",
    "Technical SEO",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Structured data helps the profile surface correctly in search results.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Hero />
      <About />
      <Capabilities />
      <Experience />
      <Work />
      <Credentials />
      <Contact />
      <SiteFooter />
    </>
  );
}
