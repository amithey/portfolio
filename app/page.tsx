import Link from 'next/link';
import { CATEGORIES, FEATURED, PROJECTS, getProject } from '@/data/projects';
import { SITE, embeddableCount } from '@/lib/site';
import { ProjectCard } from '@/components/ProjectCard';
import { RunDemo } from '@/components/RunDemo';

export default function Home() {
  const hero = getProject('dominion');
  const usedCategories = CATEGORIES.filter((c) =>
    PROJECTS.some((p) => p.category === c.id),
  );

  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero — the claim, then immediate proof of it. */}
      <section className="pt-16 pb-14 sm:pt-24">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          {SITE.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">{SITE.headline}</p>
        <p className="mt-3 max-w-2xl text-muted">
          {embeddableCount} of them start right in the browser — including the one below.
          No cloning, no install.
        </p>

        {hero && (
          <div className="mt-10">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-sm font-semibold">
                {hero.title} <span className="font-normal text-muted">— {hero.tagline}</span>
              </h2>
              <Link href={`/projects/${hero.slug}`} className="text-sm text-signal hover:underline">
                About this project
              </Link>
            </div>
            {hero.demo.note && (
              <p className="mb-3 rounded-lg border border-line bg-surface-sunken px-4 py-3 text-sm text-muted">
                {hero.demo.note}
              </p>
            )}
            <RunDemo demo={hero.demo} title={hero.title} />
          </div>
        )}
      </section>

      {/* Featured */}
      <section className="border-t border-line py-14">
        <h2 className="font-display text-2xl font-bold tracking-tight">Selected work</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((project) => (
            <ProjectCard key={project.slug} project={project} large />
          ))}
        </div>
      </section>

      {/* Everything else */}
      <section className="border-t border-line py-14">
        <h2 className="font-display text-2xl font-bold tracking-tight">Everything else</h2>
        <p className="mt-3 max-w-2xl text-muted">
          {PROJECTS.length} projects across {usedCategories.length} categories — a 3D strategy
          game, an AI trading system, a tax tool, a shop, and a couple of arcade games.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {usedCategories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/projects?category=${c.id}`}
                className="readout inline-block rounded border border-line px-2.5 py-1.5 text-muted hover:border-signal hover:text-signal"
              >
                {c.label} · {PROJECTS.filter((p) => p.category === c.id).length}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-7">
          <Link href="/projects" className="font-semibold text-signal hover:underline">
            Browse all {PROJECTS.length} projects →
          </Link>
        </p>
      </section>

      {/* Contact */}
      <section className="border-t border-line py-14">
        <h2 className="font-display text-2xl font-bold tracking-tight">Get in touch</h2>
        <p className="mt-3 max-w-2xl text-muted">
          I&rsquo;m looking for a junior developer role. The fastest way to reach me is email.
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${SITE.email}`} className="text-signal hover:underline">
              {SITE.email}
            </a>
          </li>
          <li>
            <a href={SITE.linkedin} className="text-signal hover:underline" rel="noreferrer noopener">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={SITE.github} className="text-signal hover:underline" rel="noreferrer noopener">
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
