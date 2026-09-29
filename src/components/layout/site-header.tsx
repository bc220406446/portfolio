"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";

import { EASE } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action";
import { navigation, profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const lenis = useLenis();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  // Track the section currently in the middle band of the viewport.
  useEffect(() => {
    const ids = navigation.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /** Return to the hero from the wordmark, through Lenis when it is running. */
  const backToHero = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-line bg-canvas/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-6 px-6">
          <a
            href="#top"
            onClick={backToHero}
            aria-label={`${profile.name} - back to top`}
            className="group text-lg font-medium tracking-[-0.03em] text-fg sm:text-xl"
          >
            {profile.name}
            <span className="text-accent">.</span>
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative px-3 py-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-300",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-px bg-accent"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ActionLink
              href="#contact"
              variant="outline"
              className="hidden px-5 py-2.5 sm:inline-flex"
            >
              Start a project
            </ActionLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center border border-line-2 text-fg transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-all duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-40 bg-canvas/97 backdrop-blur-lg lg:hidden"
          >
            <nav className="flex h-full flex-col justify-center gap-1 px-8 pt-20">
              {navigation.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.05 * i }}
                  className="border-b border-line py-5 text-3xl font-medium tracking-[-0.02em] text-fg"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                className="mt-10"
              >
                <ActionLink href={`mailto:${profile.email}`} variant="primary">
                  {profile.email}
                </ActionLink>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
