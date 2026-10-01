import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { certifications, education } from "@/data/profile";

export function Credentials() {
  return <Section id="credentials" className="border-t border-line">
    <SectionHeading title="Credentials" description="The degree and the certificates behind the work." />
    <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div><p className="label mb-7">Education</p><Stagger className="flex flex-col gap-4">{education.map((entry) => <StaggerItem key={entry.institution}><div className="panel group relative overflow-hidden p-6 transition-colors duration-500 hover:border-line-2"><span className="sweep" /><div className="min-w-0"><h3 className="text-base font-medium tracking-[-0.015em] text-fg">{entry.qualification}</h3><p className="mt-1.5 text-sm text-fg-dim">{entry.institution}</p><div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5"><span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">{entry.field}</span><span className="h-1 w-1 rounded-full bg-line-2" /><span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">{entry.period}</span></div><span className="mt-3 inline-block rounded-md bg-surface-2/70 px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.14em] text-accent/90 uppercase">{entry.status}</span>{entry.grade || entry.percentage ? <p className="mt-3 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">{[entry.grade && `Grade: ${entry.grade}`, entry.percentage && `Percentage: ${entry.percentage}`].filter(Boolean).join(" · ")}</p> : null}{entry.credentialUrl ? <CredentialLink href={entry.credentialUrl} /> : null}</div></div></StaggerItem>)}</Stagger></div>
      <div><p className="label mb-7">Certifications</p><Stagger className="flex flex-col gap-3">{certifications.map((cert) => <StaggerItem key={cert.title}><div className="group rounded-2xl px-4 py-4 transition-colors duration-500 hover:bg-surface/60"><h3 className="text-sm leading-snug font-medium text-fg">{cert.title}</h3><p className="mt-1.5 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">{cert.issuer} · {cert.focus}</p>{cert.credentialUrl ? <CredentialLink href={cert.credentialUrl} /> : null}</div></StaggerItem>)}</Stagger></div>
    </div>
  </Section>;
}

function CredentialLink({ href }: { href: string }) { return <a href={href} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block font-mono text-[0.625rem] tracking-[0.14em] text-accent uppercase transition-colors hover:text-fg">View credential ↗</a>; }
