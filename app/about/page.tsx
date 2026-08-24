import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { SITE, embeddableCount } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${SITE.name}.`,
};

/** Counted from the data so these numbers can never go stale. */
const languages = ['TypeScript', 'Python', 'JavaScript', 'Java'];

export default function AboutPage() {
  const tested = PROJECTS.find((p) => p.slug === 'capital-gains-tax-report-generator');

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">About</h1>

      <div className="mt-6 space-y-5 leading-relaxed text-muted">
        <p>
          I&rsquo;m {SITE.name}, a developer looking for a junior role. This site is the
          honest version of what I&rsquo;ve built: {PROJECTS.length} projects, {embeddableCount}{' '}
          of which you can start without leaving the page.
        </p>
        <p>
          The work spans further than I expected it to when I laid it out.{' '}
          {languages.slice(0, -1).join(', ')} and {languages.at(-1)} — from a Pong clone that
          fits in one HTML file to a Python trading system of roughly 21,000 lines with a
          retrieval-augmented decision engine behind it. In between there&rsquo;s a 3D strategy
          game running on Three.js, a working shop with real orders going through it, and a tax
          tool that parses Israeli broker exports.
        </p>
        <p>
          They are not all equally polished, and the site says so. Each project carries a status,
          and where something isn&rsquo;t running the reason is written down rather than hidden —
          including one project whose database was on a free tier that paused and now wants
          $25 a month to come back.
        </p>
        {tested && (
          <p>
            The one I&rsquo;d point at first is{' '}
            <Link href={`/projects/${tested.slug}`} className="text-signal hover:underline">
              {tested.title}
            </Link>
            . It solves a problem I actually had, it runs entirely in the browser so no financial
            data leaves your machine, and it has 103 tests behind it.
          </p>
        )}
      </div>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="font-display text-xl font-bold tracking-tight">Contact</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
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
