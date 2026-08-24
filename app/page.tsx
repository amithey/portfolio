import Link from 'next/link';
import { FEATURED, PROJECTS, sortedProjects } from '@/data/projects';
import { SITE, embeddableCount } from '@/lib/site';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { WinterScene } from '@/components/WinterScene';

export default function Home() {
  const featuredSlugs = new Set(FEATURED.map((p) => p.slug));
  const rest = sortedProjects(PROJECTS.filter((p) => !featuredSlugs.has(p.slug)));

  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero — who, then the scene that says the rest. */}
      <section className="pt-14 pb-12 sm:pt-20">
        <p className="readout text-muted">Developer · Israel</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          {SITE.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">{SITE.headline}</p>
        <p className="mt-3 max-w-2xl text-muted">
          Everything I&rsquo;ve built is on this page, and {embeddableCount} of them start
          right in the browser.{' '}
          <Link href="/about" className="text-signal hover:underline">
            More about me →
          </Link>
        </p>

        <div className="mt-9">
          <WinterScene />
        </div>
      </section>

      {/* Selected work. */}
      <section className="border-t border-line py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl font-bold tracking-tight">Selected work</h2>
          <p className="readout text-muted">{PROJECTS.length} projects, nothing hidden</p>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80} className="h-full">
              <div className="lift h-full">
                <ProjectCard project={project} large />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Everything else — visible, not behind a link. */}
      <section className="border-t border-line py-12">
        <h2 className="font-display text-2xl font-bold tracking-tight">Everything else</h2>
        <p className="mt-3 max-w-2xl text-muted">
          A tax tool that solves a problem I actually had, and the two arcade games that
          taught me the basics.
        </p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={i * 70} className="h-full">
              <div className="lift h-full">
                <ProjectCard project={project} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8">
          <Link href="/projects" className="font-semibold text-signal hover:underline">
            Filter them by stack or category →
          </Link>
        </p>
      </section>

      {/* Contact. */}
      <section className="border-t border-line py-12">
        <h2 className="font-display text-2xl font-bold tracking-tight">Get in touch</h2>
        <p className="mt-3 max-w-2xl text-muted">
          I&rsquo;m looking for a junior developer role. Email is the fastest way to reach me.
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
