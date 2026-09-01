import Link from 'next/link';
import { FEATURED, PROJECTS, sortedProjects } from '@/data/projects';
import { SITE, embeddableCount } from '@/lib/site';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { WinterScene } from '@/components/WinterScene';
import { CodeCard } from '@/components/CodeCard';
import { InterestGrid } from '@/components/InterestGrid';
import { ABOUT, SKILLS } from '@/data/about';

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
          <Link href="/#about" className="link-signal">
            More about me →
          </Link>
        </p>

        <div className="mt-10 sm:mt-12">
          <WinterScene />
        </div>

        <Reveal delay={120} className="mt-6 block">
          <CodeCard />
        </Reveal>

        {/* The whole site is reachable by scrolling from here, so say so
            rather than relying on the visitor finding the nav. */}
        <p className="mt-10 flex justify-center">
          <a
            href="#work"
            className="readout group inline-flex flex-col items-center gap-1.5 text-muted transition-colors hover:text-signal"
          >
            Scroll for the work
            <span aria-hidden className="scroll-cue text-base leading-none">
              ↓
            </span>
          </a>
        </p>
      </section>

      {/* Selected work. */}
      <section id="work" className="border-t border-line py-16 sm:py-20">
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

      {/*
        About, in summary. The full page at /about still exists and goes
        deeper — this is here so the homepage can be scrolled end to end
        without the visitor having to know the nav exists.
      */}
      <section id="about" className="border-t border-line py-16 sm:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight">About me</h2>
        <p className="mt-4 max-w-prose leading-relaxed text-muted">
          {ABOUT.role} based in {ABOUT.location}. Four things I keep coming back to, and the
          tools I&rsquo;ve actually shipped with.
        </p>

        <div className="mt-8">
          <InterestGrid />
        </div>

        <dl className="mt-10 space-y-4">
          {SKILLS.map((group) => (
            <div key={group.group} className="sm:flex sm:gap-6">
              <dt className="readout w-40 shrink-0 pt-1 text-muted">{group.group}</dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-0">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-line px-2 py-0.5 text-sm text-muted"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10">
          <Link href="/about" className="link-signal font-semibold">
            Background, experience and CV →
          </Link>
        </p>
      </section>

      {/* Contact. */}
      <section id="contact" className="border-t border-line py-16 sm:py-20">
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
