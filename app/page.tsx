import Link from 'next/link';
import { FEATURED, PROJECTS, sortedProjects } from '@/data/projects';
import { SITE, embeddableCount } from '@/lib/site';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { WinterScene } from '@/components/WinterScene';
import { CodeCard } from '@/components/CodeCard';

export default function Home() {
  const featuredSlugs = new Set(FEATURED.map((p) => p.slug));
  const rest = sortedProjects(PROJECTS.filter((p) => !featuredSlugs.has(p.slug)));

  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero — who, then the scene that says the rest. */}
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-16">
        <p className="readout text-muted">Developer · Israel</p>
        <h1 className="mt-4 font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight sm:text-7xl">
          {SITE.name}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-snug text-ink sm:text-2xl">{SITE.headline}</p>
        <p className="mt-4 max-w-prose leading-relaxed text-muted">
          Everything I&rsquo;ve built is on this page, and {embeddableCount} of them start
          right in the browser.{' '}
          <Link href="/about" className="link-signal">
            More about me →
          </Link>
        </p>

        <div className="mt-10 sm:mt-12">
          <WinterScene />
        </div>

        <Reveal delay={120} className="mt-6 block">
          <CodeCard />
        </Reveal>
      </section>

      {/* Selected work. */}
      <section className="border-t border-line py-16 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">Selected work</h2>
          <p className="readout text-muted">{PROJECTS.length} projects, nothing hidden</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80} className="h-full">
              <div className="h-full">
                <ProjectCard project={project} large />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Everything else — visible, not behind a link. */}
      <section className="border-t border-line py-16 sm:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight">Everything else</h2>
        <p className="mt-4 max-w-prose leading-relaxed text-muted">
          A tax tool that solves a problem I actually had, and the two arcade games that
          taught me the basics.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={i * 70} className="h-full">
              <div className="h-full">
                <ProjectCard project={project} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-10">
          <Link href="/projects" className="link-signal font-semibold">
            Filter them by stack or category →
          </Link>
        </p>
      </section>

      {/* Contact. */}
      <section className="border-t border-line py-16 sm:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight">Get in touch</h2>
        <p className="mt-4 max-w-prose leading-relaxed text-muted">
          I&rsquo;m looking for a junior developer role. Email is the fastest way to reach me.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={`mailto:${SITE.email}`} className="btn-signal">
            {SITE.email}
          </a>
          <a href={SITE.linkedin} className="link-signal" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href={SITE.github} className="link-signal" rel="noreferrer noopener">
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
