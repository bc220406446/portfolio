/**
 * @fileoverview Skill Mark Icon Component
 * Vector tech mark renderer matching technologies to brand SVGs or fallback concept glyphs with dark canvas tint balancing.
 * Used in: src/components/ui/skill-carousel.tsx, src/components/sections/work.tsx, and src/components/ui/tech-marquee.tsx.
 */

"use client";

import {
  Gauge,
  Layers,
  Network,
  CreditCard,
  Droplets,
  Workflow,
  Brain,
  Sparkles,
  Bot,
  type LucideIcon,
} from "lucide-react";

import { brandMarks, type BrandKey, type BrandMark } from "@/lib/brand-marks";
import { cn } from "@/lib/utils";

const glyphs = {
  network: Network,
  performance: Gauge,
  payment: CreditCard,
  liquid: Droplets,
  workflow: Workflow,
  brain: Brain,
  sparkles: Sparkles,
  bot: Bot,
  fallback: Layers,
} satisfies Record<string, LucideIcon>;

type Visual = { brand: BrandKey } | { glyph: keyof typeof glyphs };

const visuals: Record<string, Visual> = {
  "Next.js": { brand: "nextjs" },
  React: { brand: "react" },
  TypeScript: { brand: "typescript" },
  JavaScript: { brand: "javascript" },
  "JavaScript (ES2023)": { brand: "javascript" },
  HTML: { brand: "html5" },
  HTML5: { brand: "html5" },
  CSS: { brand: "css3" },
  CSS3: { brand: "css3" },
  "Tailwind CSS": { brand: "tailwindcss" },
  "Framer Motion": { brand: "framer" },

  "Node.js": { brand: "nodedotjs" },
  Express: { brand: "express" },
  Python: { brand: "python" },
  Django: { brand: "django" },
  FastAPI: { brand: "fastapi" },
  PHP: { brand: "php" },
  "REST APIs": { glyph: "network" },
  JWT: { brand: "jsonwebtokens" },
  Prisma: { brand: "prisma" },
  Strapi: { brand: "strapi" },
  Apache: { brand: "apache" },
  XAMPP: { brand: "xampp" },

  NumPy: { brand: "numpy" },
  "scikit-learn": { brand: "scikitlearn" },
  PyTorch: { brand: "pytorch" },
  TensorFlow: { brand: "tensorflow" },
  Matplotlib: { brand: "matplotlib" },
  LLMs: { brand: "openai" },
  NLP: { glyph: "brain" },
  "Machine Learning": { glyph: "brain" },
  "AI Automation": { glyph: "sparkles" },

  PostgreSQL: { brand: "postgresql" },
  Supabase: { brand: "supabase" },
  MySQL: { brand: "mysql" },
  MongoDB: { brand: "mongodb" },
  Firebase: { brand: "firebase" },

  Azure: { brand: "azure" },
  Vercel: { brand: "vercel" },
  Render: { brand: "render" },
  Netlify: { brand: "netlify" },
  Cloudinary: { brand: "cloudinary" },

  Git: { brand: "git" },
  GitHub: { brand: "github" },
  "GitHub Actions": { brand: "githubactions" },
  "CI/CD": { glyph: "workflow" },
  Postman: { brand: "postman" },
  Sentry: { brand: "sentry" },
  Markdown: { brand: "markdown" },
  "Core Web Vitals": { glyph: "performance" },

  "Medusa JS": { brand: "medusa" },
  WordPress: { brand: "wordpress" },
  Shopify: { brand: "shopify" },
  WooCommerce: { brand: "woocommerce" },
  SureCart: { brand: "surecart" },
  PayFast: { glyph: "payment" },
  Liquid: { glyph: "liquid" },
};

const FALLBACK: Visual = { glyph: "fallback" };

const NEUTRAL = "#eef0f3";

function markColour(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.18 ? NEUTRAL : `#${hex}`;
}

export type SkillVisual = {
  kind: "glyph" | "path" | "svg";
  mark: BrandMark | null;
  Glyph: LucideIcon | null;
  colour: string;
  viewBox: string;
};

export function skillVisual(skill: string): SkillVisual {
  const visual = visuals[skill] ?? FALLBACK;
  const mark = "brand" in visual ? brandMarks[visual.brand] : null;
  const Glyph = "glyph" in visual ? glyphs[visual.glyph] : null;
  const colour = mark && mark.path ? markColour(mark.hex) : NEUTRAL;

  return {
    kind: Glyph ? "glyph" : mark?.svg ? "svg" : "path",
    mark,
    Glyph,
    colour,
    viewBox: mark?.viewBox ?? "0 0 24 24",
  };
}

export function SkillMark({
  skill,
  className,
  strokeWidth = 1.5,
}: {
  skill: string;
  className?: string;
  strokeWidth?: number;
}) {
  const { kind, mark, Glyph, colour, viewBox } = skillVisual(skill);

  return (
    <span
      aria-hidden
      style={{ color: colour }}
      className={cn("inline-flex items-center justify-center", className)}
    >
      {Glyph ? (
        <Glyph className="h-full w-full" strokeWidth={strokeWidth} />
      ) : kind === "svg" ? (
        <svg
          viewBox={viewBox}
          className="h-full w-full"
          dangerouslySetInnerHTML={{ __html: mark?.svg ?? "" }}
        />
      ) : (
        <svg viewBox={viewBox} className="h-full w-full fill-current">
          <path d={mark?.path} fillRule={mark?.fillRule ?? "nonzero"} />
        </svg>
      )}
    </span>
  );
}

