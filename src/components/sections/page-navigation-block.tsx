"use client";

import Link from "next/link";
import { ArrowUpRight, Layers, Briefcase, Terminal, Award } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

interface PageDirectoryItem {
  title: string;
  badge: string;
  description: string;
  href: string;
  icon: typeof Layers;
}

const directoryPages: PageDirectoryItem[] = [
  {
    title: "Capabilities",
    badge: "Stack & Architecture",
    description:
      "Deep dive into full-stack engineering proficiencies: Next.js, React, Node.js, Python/Django, database schemas, and AI application workflows.",
    href: "/capabilities",
    icon: Layers,
  },
  {
    title: "Experience",
    badge: "Track Record",
    description:
      "Career journey, commercial freelance projects, engineering roles, and production systems delivered across international markets.",
    href: "/experience",
    icon: Briefcase,
  },
  {
    title: "Work",
    badge: "Shipped Products",
    description:
      "Explore 8 production applications, e-commerce architectures, query management systems, and open-source software with live previews.",
    href: "/work",
    icon: Terminal,
  },
  {
    title: "Credentials",
    badge: "Verified Proof",
    description:
      "Formal academic Computer Science education, verified university degree credentials, and official Coursera specialization certificates.",
    href: "/credentials",
    icon: Award,
  },
];

export function PageNavigationBlock() {
  return (
    <Section id="explore" className="border-t border-line" containerClassName="max-w-6xl">
      <SectionHeading
        title="Explore the Portfolio"
        description="Navigate to dedicated sections for technical skills, professional career history, featured case studies, and verified credentials."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {directoryPages.map((page, index) => {
          const Icon = page.icon;
          return (
            <Reveal key={page.href} delay={0.1 + index * 0.08} className="h-full">
              <Link
                href={page.href}
                className={cn(
                  "group panel relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-8",
                  "transition-all duration-500 hover:border-accent/60 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(211,255,69,0.12)]",
                )}
              >
                {/* Hairline sweep line on hover */}
                <span className="sweep z-10" />

                {/* Ambient glow behind card */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-accent/15 via-transparent to-accent/10 opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-40"
                />

                {/* Top Row: Index number, Badge, and Arrow Action */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[0.625rem] tracking-[0.14em] uppercase text-muted rounded-full border border-line-2/70 bg-surface/60 px-2.5 py-1">
                        {page.badge}
                      </span>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line-2/80 bg-surface/80 text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-canvas">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Header Title with Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-2/70 bg-canvas-2 text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
                      {page.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-fg-dim">
                    {page.description}
                  </p>
                </div>

              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
