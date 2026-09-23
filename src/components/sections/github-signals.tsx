import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";

type Repo = {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
};

const USERNAME = "bc220406446";

async function getRepos(): Promise<Repo[] | null> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );
    if (!response.ok) return null;
    const data: Repo[] = await response.json();
    return data.filter((repo) => !repo.fork);
  } catch {
    return null;
  }
}

function relativeDays(iso: string) {
  const days = Math.max(
    0,
    Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000),
  );
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return months === 1 ? "last month" : `${months} months ago`;
}

/**
 * Server component: hits the GitHub REST API at build/revalidate time and
 * degrades to a plain link when the API is unreachable or rate limited.
 */
export async function GithubSignals() {
  const repos = await getRepos();
  const latest = repos?.[0];
  const languages = repos
    ? Array.from(
        repos.reduce((acc, repo) => {
          if (!repo.language) return acc;
          acc.set(repo.language, (acc.get(repo.language) ?? 0) + 1);
          return acc;
        }, new Map<string, number>()),
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
    : [];
  const total = languages.reduce((sum, [, count]) => sum + count, 0);

  return (
    <section className="border-t border-line py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal direction="none">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label mb-3">Open source signals</p>
              <p className="text-xl font-medium tracking-[-0.02em] text-fg">
                Straight from GitHub —{" "}
                <span className="text-muted">no vanity metrics.</span>
              </p>
            </div>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="border-b border-line-2 pb-1 font-mono text-[0.6875rem] tracking-[0.14em] text-fg-dim uppercase transition-colors hover:border-accent hover:text-accent"
            >
              github.com/{USERNAME} ↗
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          <div className="bg-canvas p-6">
            <p className="label">Public repositories</p>
            <p className="mt-3 text-3xl font-medium tracking-[-0.03em] text-fg tabular-nums">
              {repos ? String(repos.length).padStart(2, "0") : "—"}
            </p>
          </div>
          <div className="bg-canvas p-6">
            <p className="label">Latest push</p>
            <p className="mt-3 text-3xl font-medium tracking-[-0.03em] text-fg">
              {latest ? relativeDays(latest.pushed_at) : "—"}
            </p>
            {latest ? (
              <p className="mt-2 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                {latest.name}
              </p>
            ) : null}
          </div>
          <div className="bg-canvas p-6">
            <p className="label">Primary language</p>
            <p className="mt-3 text-3xl font-medium tracking-[-0.03em] text-fg">
              {languages[0]?.[0] ?? "—"}
            </p>
            <div className="mt-3 flex flex-col gap-1.5">
              {languages.map(([language, count]) => (
                <div
                  key={language}
                  className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.1em] text-muted uppercase"
                >
                  <span className="w-20 shrink-0 truncate">{language}</span>
                  <span
                    className="h-1 bg-accent/60"
                    style={{
                      width: `${total ? Math.max(8, (count / total) * 100) : 0}%`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
