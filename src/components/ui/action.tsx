import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group/action relative inline-flex items-center justify-center gap-2.5 rounded-none border px-6 py-3.5 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "border-accent bg-accent text-accent-ink hover:bg-accent-dim hover:border-accent-dim",
  outline:
    "border-line-2 bg-transparent text-fg hover:border-accent hover:text-accent",
  ghost:
    "border-transparent bg-transparent text-fg-dim hover:border-line-2 hover:text-fg",
};

export function ActionLink({
  children,
  className,
  variant = "outline",
  external,
  ...props
}: ComponentProps<"a"> & {
  variant?: Variant;
  children: ReactNode;
  /** Force the new-tab treatment for non-http links (e.g. mailto). */
  external?: boolean;
}) {
  const isExternal =
    external ?? (typeof props.href === "string" && /^https?:/.test(props.href));

  return (
    <a
      {...props}
      className={cn(base, variants[variant], className)}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {children}
    </a>
  );
}

export function ActionButton({
  children,
  className,
  variant = "primary",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; children: ReactNode }) {
  return (
    <button {...props} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}

/** Small monospace call-to-action rendered as underlined text, not a pill. */
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
