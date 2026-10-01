"use client";

import { Gauge, Layers, Network, type LucideIcon } from "lucide-react";

import { brandMarks, type BrandKey, type BrandMark } from "@/lib/brand-marks";
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

/** Every skill listed in `skillGroups`, resolved to a mark. */
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

export type SkillVisual = {
  /** Which of the three mark shapes was resolved. */
  kind: "glyph" | "path" | "svg";
  mark: BrandMark | null;
  Glyph: LucideIcon | null;
  /** Colour the mark should be painted in, already adjusted for this canvas. */
  colour: string;
  viewBox: string;
};

/** Resolves a skill name to its mark, glyph, colour and artboard. */
export function skillVisual(skill: string): SkillVisual {
  const visual = visuals[skill] ?? FALLBACK;
  const mark = "brand" in visual ? brandMarks[visual.brand] : null;
  const Glyph = "glyph" in visual ? glyphs[visual.glyph] : null;
  // Marks that ship their own palette are painted as-is; single-path marks are
  // tinted with the brand hex.
  const colour = mark && mark.path ? markColour(mark.hex) : NEUTRAL;

  return {
    kind: Glyph ? "glyph" : mark?.svg ? "svg" : "path",
    mark,
    Glyph,
    colour,
    viewBox: mark?.viewBox ?? "0 0 24 24",
  };
}

/**
 * A technology's logo, tinted in its own brand colour, at whatever size the
 * caller sets through `className`. Colour comes from the resolved brand hex
 * unless the logo brings its own palette (Matplotlib).
 */
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
