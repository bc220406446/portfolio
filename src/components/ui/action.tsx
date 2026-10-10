/**
 * @fileoverview Action Button & Link Components
 * Stylized interactive controls for links, primary/secondary action triggers, and inline text links.
 * Used throughout section CTAs, header navigation, hero actions, and project links.
 */

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type Variant = "primary" | "secondary" | "outline" | "ghost";

export const actionBase =
  "group/action relative inline-flex items-center justify-center gap-2.5 rounded-lg border px-6 py-3.5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

export const actionVariants: Record<Variant, string> = {
  primary:
    "border-accent bg-accent text-accent-ink font-semibold hover:bg-accent-dim hover:border-accent-dim shadow-sm hover:shadow-[0_0_24px_rgba(211,255,69,0.28)]",
  secondary:
    "border-line-2 bg-surface/80 text-fg hover:border-accent hover:text-accent hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(211,255,69,0.15)]",
  outline:
    "border-line-2 bg-transparent text-fg hover:border-accent hover:text-accent",
  ghost:
    "border-transparent bg-transparent text-fg-dim hover:border-line-2 hover:text-fg",
};

export function ActionLink({
  children,
  className,
  variant = "secondary",
  external,
  href = "#",
  ...props
}: ComponentProps<"a"> & {
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
}) {
  const isExternal =
    external ??
    (typeof href === "string" &&
      (/^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")));

  if (isExternal) {
    const isNewTab =
      external ?? (typeof href === "string" && /^https?:\/\//.test(href));
    return (
      <a
        href={href}
        className={cn(actionBase, actionVariants[variant], className)}
        {...(isNewTab ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(actionBase, actionVariants[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ActionButton({
  children,
  className,
  variant = "primary",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; children: ReactNode }) {
  return (
    <button
      {...props}
      className={cn(actionBase, actionVariants[variant], className)}
    >
      {children}
    </button>
  );
}

export function TextLink({
  children,
  className,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={cn(
        "group/link inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-fg uppercase",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-line-2 transition-colors duration-300 group-hover/link:bg-accent" />
      </span>
      <span
        aria-hidden
        className="translate-x-0 transition-transform duration-300 group-hover/link:translate-x-1.5"
      >
        →
      </span>
    </a>
  );
}

