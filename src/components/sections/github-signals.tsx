import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { StatBars } from "@/components/motion/stat-bars";
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
 * Server component: reads the GitHub REST API at build/revalidate time and
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
        .map(([label, value]) => ({ label, value }))
    : [];
  const total = languages.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="border-t border-line py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal direction="none">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label mb-4">Open source signals</p>
              <p className="text-2xl font-medium tracking-[-0.025em] text-fg sm:text-3xl">
                Straight from GitHub -{" "}
                <span className="text-muted">no vanity metrics.</span>
              </p>
            </div>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl border border-line-2 px-4 py-2.5 font-mono text-[0.6875rem] tracking-[0.14em] text-fg-dim uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              github.com/{USERNAME} ↗
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal delay={0.05}>
            <div className="panel h-full p-7">
              <p className="label">Public repositories</p>
              <p className="mt-5 text-5xl font-medium tracking-[-0.04em] text-fg tabular-nums">
                {repos ? (
                  <Counter value={repos.length} decimals={0} />
                ) : (
                  "-"
                )}
              </p>
              <p className="mt-4 text-sm text-muted">
                Excluding forks - only work I actually wrote.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="panel h-full p-7">
              <p className="label">Latest push</p>
              <p className="mt-5 text-3xl font-medium tracking-[-0.03em] text-fg">
                {latest ? relativeDays(latest.pushed_at) : "-"}
              </p>
              {latest ? (
                <a
                  href={latest.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-block font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase transition-colors hover:text-accent"
                >
                  {latest.name} ↗
                </a>
              ) : (
                <p className="mt-4 text-sm text-muted">
                  GitHub API unavailable right now.
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.19}>
            <div className="panel h-full p-7">
              <p className="label">Language mix</p>
              <p className="mt-5 text-3xl font-medium tracking-[-0.03em] text-fg">
                {languages[0]?.label ?? "-"}
              </p>
              <StatBars items={languages} total={total} className="mt-6 space-y-3" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
