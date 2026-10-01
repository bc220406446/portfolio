import { profile } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-8">
        <p className="label">© {year} {profile.name}</p>
        <a href={`mailto:${profile.email}`} className="font-mono text-[.625rem] tracking-[.12em] text-muted uppercase transition-colors hover:text-accent">Get in touch</a>
      </div>
    </footer>
  );
}
