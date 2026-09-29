import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { navigation, profile } from "@/data/profile";

const marqueeItems = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "Django",
  "PostgreSQL",
  "Tailwind CSS",
  "Shopify",
  "WooCommerce",
  "WordPress",
  "SureCart",
  "REST APIs",
  "Technical SEO",
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <Marquee speed={52} className="border-b border-line py-5">
        {marqueeItems.map((item) => (
          <span
            key={item}
            className="flex items-center gap-6 px-6 font-mono text-xs tracking-[0.2em] text-muted uppercase"
          >
            {item}
            <span aria-hidden className="text-accent">
              /
            </span>
          </span>
        ))}
      </Marquee>

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <Reveal>
            <p className="text-2xl leading-snug font-medium tracking-[-0.02em] text-fg">
              {profile.name}
              <span className="block text-muted">
                Building for the web from {profile.location}.
              </span>
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-block border-b border-line-2 pb-1 font-mono text-xs tracking-[0.14em] text-fg-dim uppercase transition-colors hover:border-accent hover:text-accent"
            >
              {profile.email}
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="label mb-5">Navigate</p>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-fg-dim transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="label mb-5">Elsewhere</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-fg-dim transition-colors hover:text-accent"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-fg-dim transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.links.liveStore}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-fg-dim transition-colors hover:text-accent"
                >
                  Live store
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phoneHref}`}
                  className="text-sm text-fg-dim transition-colors hover:text-accent"
                >
                  {profile.phone}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {year} {profile.name} - All rights reserved
          </p>
          <p className="label">
            Next.js 16 · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
