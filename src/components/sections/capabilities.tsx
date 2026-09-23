import { Marquee } from "@/components/motion/marquee";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading, TagRow } from "@/components/ui/section";
import { skillGroups } from "@/data/profile";

const ticker = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Django",
  "PostgreSQL",
  "Shopify",
  "WooCommerce",
  "WordPress",
  "SureCart",
  "REST APIs",
  "SEO",
  "Performance",
  "Framer Motion",
];

export function Capabilities() {
  return (
    <Section id="capabilities" className="border-t border-line">
      <SectionHeading
        index="02"
        kicker="Capabilities"
        title="A stack chosen for shipping, not for résumé decoration."
        description="Frontend, backend, data and commerce — each layer picked because it survives contact with real traffic, real clients and real deadlines."
      />

      <Stagger className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <StaggerItem key={group.title} className="group bg-canvas">
            <div className="relative h-full p-7 transition-colors duration-500 hover:bg-surface/60">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
              />
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-medium tracking-[-0.01em] text-fg">
                  {group.title}
                </h3>
                <span className="font-mono text-[0.625rem] text-accent/70">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                {group.caption}
              </p>
              <TagRow items={group.skills} className="mt-6" />
            </div>
          </StaggerItem>
        ))}

        {/* Filler cell keeps the grid visually complete on 3-column layouts. */}
        <StaggerItem className="bg-canvas">
          <div className="flex h-full flex-col justify-between gap-6 p-7">
            <p className="text-sm leading-relaxed text-fg-dim">
              Currently deepening: AI-assisted workflows, automation pipelines
              and server-rendered application architecture.
            </p>
            <p className="label text-accent">Always shipping</p>
          </div>
        </StaggerItem>
      </Stagger>

      <Marquee speed={46} className="mt-16 border-y border-line py-4">
        {ticker.map((item) => (
          <span
            key={item}
            className="px-5 font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </Section>
  );
}
