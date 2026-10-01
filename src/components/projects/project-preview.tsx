import type { Project } from "@/data/profile";
import { cn } from "@/lib/utils";

const palettes = [
  "from-emerald-300/80 via-cyan-400/55 to-blue-600/65", "from-amber-200/90 via-orange-300/70 to-rose-500/60", "from-violet-300/75 via-fuchsia-500/55 to-indigo-700/70", "from-sky-200/85 via-blue-400/65 to-indigo-600/70", "from-stone-200/85 via-amber-300/60 to-orange-500/60", "from-pink-300/80 via-fuchsia-500/55 to-purple-700/70", "from-lime-200/85 via-emerald-400/60 to-teal-700/65", "from-slate-200/80 via-slate-400/65 to-zinc-700/75",
];

/** Lightweight project covers, designed in-house without borrowed screenshots. */
export function ProjectPreview({ project, index, className, priority = false }: { project: Project; index: number; className?: string; priority?: boolean }) {
  const initials = project.name.split(" ").filter((word) => word.length > 2).slice(0, 2).map((word) => word[0]).join("");
  return <div aria-label={`${project.name} project preview`} className={cn("relative isolate aspect-[16/10] overflow-hidden border border-white/10 bg-[#0a0d12]", className)}>
    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", palettes[index % palettes.length])} />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(7,8,10,.42)_1px,transparent_1px),linear-gradient(90deg,rgba(7,8,10,.42)_1px,transparent_1px)] bg-size-[22px_22px]" />
    <div className="absolute inset-[7%] border border-white/30 bg-[#0b0d12]/86 shadow-[0_20px_60px_rgba(0,0,0,.38)]">
      <div className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3"><i className="h-1.5 w-1.5 rounded-full bg-rose-300/80" /><i className="h-1.5 w-1.5 rounded-full bg-amber-200/80" /><i className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" /><span className="ml-auto font-mono text-[7px] tracking-[.13em] text-white/35 uppercase">{priority ? "Featured build" : project.category}</span></div>
      <div className="grid h-[calc(100%-1.75rem)] grid-cols-[1.05fr_.95fr]"><div className="flex flex-col justify-between p-4 sm:p-5"><div><span className="font-mono text-[7px] tracking-[.18em] text-white/50 uppercase">{project.kind}</span><p className="mt-3 max-w-[12ch] text-xl leading-[.85] font-semibold tracking-[-.08em] text-white sm:text-2xl">{project.name}</p></div><div className="flex gap-1.5">{project.stack.slice(0, 2).map((item) => <span key={item} className="border border-white/15 px-1.5 py-1 font-mono text-[6px] text-white/55 uppercase">{item}</span>)}</div></div><div className="relative overflow-hidden border-l border-white/10 p-3"><div className="absolute right-3 top-3 grid h-13 w-13 place-items-center rounded-full border border-white/20 bg-white/10 text-lg font-semibold tracking-[-.08em] text-white/90 backdrop-blur-sm">{initials}</div><div className="absolute bottom-3 left-3 right-3 space-y-2"><div className="h-1.5 w-4/5 bg-white/65" /><div className="h-1 w-full bg-white/20" /><div className="h-1 w-3/4 bg-white/20" /><div className="mt-4 grid grid-cols-2 gap-2"><div className="h-12 border border-white/15 bg-white/5" /><div className="h-12 border border-white/15 bg-white/5" /></div></div></div></div>
    </div>
  </div>;
}
