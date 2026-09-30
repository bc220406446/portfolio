"use client";

import { Gauge, Layers, Network, type LucideIcon } from "lucide-react";

import { brandMarks, type BrandKey } from "@/lib/brand-marks";
import { cn } from "@/lib/utils";

/**
 * Concept glyphs for the few entries that are not a product and so have no
 * published logo of their own.
 */
const glyphs = {
  network: Network,
  performance: Gauge,
  // Used for anything newly added to `skillGroups` before it gets a real mark.
  fallback: Layers,
} satisfies Record<string, LucideIcon>;

type Visual = { brand: BrandKey } | { glyph: keyof typeof glyphs };

/** Every skill currently listed in `skillGroups`, resolved to a mark. */
const visuals: Record<string, Visual> = {
  "Next.js": { brand: "nextjs" },
  React: { brand: "react" },
  TypeScript: { brand: "typescript" },
  "JavaScript (ES2023)": { brand: "javascript" },
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

  NumPy: { brand: "numpy" },
  "scikit-learn": { brand: "scikitlearn" },
  PyTorch: { brand: "pytorch" },
  TensorFlow: { brand: "tensorflow" },
  Matplotlib: { brand: "matplotlib" },

  PostgreSQL: { brand: "postgresql" },
  Supabase: { brand: "supabase" },
  MySQL: { brand: "mysql" },
  MongoDB: { brand: "mongodb" },
  Firebase: { brand: "firebase" },

  Azure: { brand: "azure" },
  Vercel: { brand: "vercel" },
  Render: { brand: "render" },
  Netlify: { brand: "netlify" },

  Git: { brand: "git" },
  GitHub: { brand: "github" },
  "GitHub Actions": { brand: "githubactions" },
  Postman: { brand: "postman" },
  Sentry: { brand: "sentry" },
  Markdown: { brand: "markdown" },
  "Core Web Vitals": { glyph: "performance" },

  "Medusa JS": { brand: "medusa" },
  WordPress: { brand: "wordpress" },
  Shopify: { brand: "shopify" },
  WooCommerce: { brand: "woocommerce" },
  SureCart: { brand: "surecart" },
};

const FALLBACK: Visual = { glyph: "fallback" };

/** Neutral tone for entries that are concepts rather than branded products. */
const NEUTRAL = "#eef0f3";

/**
 * Brand hexes run from near-white to pure black. The black ones (Next.js,
 * Vercel, GitHub, Render, Medusa, Markdown, JWT, Express, Django) would be
 * invisible on this canvas, so those fall back to the light tone those brands
 * themselves use on dark backgrounds.
 */
function markColour(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.18 ? NEUTRAL : `#${hex}`;
}

/**
 * A single skill rendered as an icon tile. The name is carried on `title` for
 * pointer users and repeated in `sr-only` text for screen readers, so dropping
 * the visible label costs no accessibility.
 */
export function SkillTile({
  skill,
  className,
}: {
  skill: string;
  className?: string;
}) {
  const visual = visuals[skill] ?? FALLBACK;
  const mark = "brand" in visual ? brandMarks[visual.brand] : null;
  const Glyph = "glyph" in visual ? glyphs[visual.glyph] : null;
  // Marks that ship their own palette are painted as-is; single-path marks are
  // tinted with the brand hex.
  const colour = mark && mark.path ? markColour(mark.hex) : NEUTRAL;

  return (
    <span
      title={skill}
      style={{ color: colour }}
      className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-lg border border-line-2/50 bg-surface/50 transition-all duration-500 hover:-translate-y-1 hover:border-line-2 hover:bg-surface hover:brightness-125 sm:h-14 sm:w-14",
        className,
      )}
    >
      {Glyph ? (
        <Glyph
          aria-hidden
          className="h-5 w-5 sm:h-6 sm:w-6"
          strokeWidth={1.5}
        />
      ) : mark?.svg ? (
        <svg
          aria-hidden
          viewBox={mark.viewBox ?? "0 0 24 24"}
          className="h-6 w-6 sm:h-7 sm:w-7"
          dangerouslySetInnerHTML={{ __html: mark.svg }}
        />
      ) : (
        <svg
          aria-hidden
          viewBox={mark?.viewBox ?? "0 0 24 24"}
          className="h-5 w-5 fill-current sm:h-6 sm:w-6"
        >
          <path d={mark?.path} fillRule={mark?.fillRule ?? "nonzero"} />
        </svg>
      )}
      <span className="sr-only">{skill}</span>
    </span>
  );
}
