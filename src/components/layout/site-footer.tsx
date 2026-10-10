import { Mail } from "lucide-react";
import { profile } from "@/data/profile";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    </svg>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.186 8.186 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Email",
      href: `mailto:${profile.email}`,
      icon: Mail,
      external: false,
    },
    {
      name: "GitHub",
      href: profile.links.github,
      icon: GithubIcon,
      external: true,
    },
    {
      name: "LinkedIn",
      href: profile.links.linkedin,
      icon: LinkedinIcon,
      external: true,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/${profile.phoneHref.replace(/[^0-9]/g, "")}`,
      icon: WhatsappIcon,
      external: true,
    },
  ];

  return (
    <footer className="border-t border-line bg-canvas/40 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-col sm:flex-row items-center justify-between gap-6 px-6 py-8">
        {/* Left side: Copyright claim */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono tracking-[0.06em] text-fg-dim">
          <span>© {year} {profile.name}.</span>
          <span className="hidden sm:inline text-line-2">•</span>
          <span>All rights reserved.</span>
        </div>

        {/* Right side: Social & contact icon links */}
        <div className="flex items-center gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              aria-label={item.name}
              title={item.name}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-2/70 bg-surface/50 text-muted transition-all duration-300 hover:border-accent hover:bg-surface hover:text-accent hover:shadow-[0_0_16px_rgba(211,255,69,0.22)]"
            >
              <item.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
