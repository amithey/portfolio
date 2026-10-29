import Image from 'next/image';
import Link from 'next/link';
import { Cinzel } from 'next/font/google';
import type { Project } from '@/data/projects';
import {
  FEATURES,
  HERO_SHOT,
  HERO_STATS,
  KNOWN_ISSUES,
  SCREENSHOT_NOTE,
  SHOTS,
  WHATS_NEW,
} from '@/data/dominion-showcase';
import { Reveal } from '@/components/Reveal';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['600', '700'],
  display: 'swap',
});

/**
 * The Dominion showcase: a page styled after the game's own HUD, used in place
 * of the standard project template. Content lives in data/dominion-showcase.ts
 * and data/projects.ts.
 */

const MENU = [
  { href: '#overview', label: 'Overview' },
  { href: '#screens', label: 'Screens' },
  { href: '#play', label: 'Gameplay' },
  { href: '#new', label: 'What’s new' },
  { href: '#download', label: 'Download' },
];

function Head({ tag, title, children }: { tag: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="dm-serif dm-gold text-sm uppercase">{tag}</p>
      <h2 className="dm-serif mt-2 text-3xl font-bold uppercase sm:text-4xl">{title}</h2>
      <div className="dm-rule mt-4 w-40" />
      {children && <p className="dm-muted mt-5 text-lg leading-relaxed">{children}</p>}
    </div>
  );
}

export function DominionPage({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project;
  next?: Project;
}) {
  const downloadUrl = project.demo.url;

  return (
    <article className={`dm ${cinzel.variable}`}>
      {/* ───────── Hero ───────── */}
      <header className="relative isolate">
        <Image
          src={HERO_SHOT.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,18,31,0.55)_0%,rgba(8,18,31,0.78)_55%,var(--dm-bg)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_20%_40%,rgba(8,18,31,0.7),transparent)]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-5xl px-5 pb-16 pt-12 sm:pb-24 sm:pt-20">
          <p className="dm-serif dm-gold text-xs uppercase sm:text-sm">
            <Link href="/projects" className="hover:underline">
              Projects
            </Link>
            {' / '}Games &amp; interactive
          </p>

          <p className="dm-serif mt-8 text-sm uppercase tracking-[0.3em] text-[var(--dm-muted)]">
            Founding Era · Alpha 1.0.3
          </p>
          <h1 className="dm-serif mt-3 text-6xl font-bold uppercase leading-none sm:text-8xl lg:text-9xl">
            Dominion
          </h1>
          <div className="dm-rule mt-6 w-56" />
          <p className="mt-6 max-w-xl text-xl leading-snug sm:text-2xl">
            A 3D real time strategy game for Windows, built in Godot.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            {downloadUrl && (
              <a href={downloadUrl} className="dm-btn">
                Download for Windows <span aria-hidden="true">↓</span>
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="dm-btn dm-btn-ghost"
            >
              View the source <span aria-hidden="true">→</span>
            </a>
          </div>

          <dl className="dm-resbar mt-14">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="dm-serif dm-gold block text-2xl font-bold sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="dm-muted mt-0.5 block text-xs leading-snug sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* The game's top menu, as page navigation. */}
      <div className="sticky top-[69px] sm:top-[56px] z-30 mx-auto max-w-5xl px-5 py-3">
        <nav aria-label="On this page" className="dm-menu">
          {MENU.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-5xl space-y-24 px-5 pb-28 pt-12 sm:space-y-32">
        {/* ───────── Overview ───────── */}
        <section id="overview" className="scroll-mt-32">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
              <Head tag="Overview" title="Command a nation" />
              <div>
                <p className="text-lg leading-relaxed sm:text-xl">{project.description}</p>
                {project.demo.note && (
                  <p className="dm-panel dm-muted mt-6 px-4 py-3 text-sm leading-relaxed">
                    {project.demo.note}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ───────── Screens ───────── */}
        <section id="screens" className="scroll-mt-32">
          <Reveal>
            <Head tag="Screens" title="From the game" />
          </Reveal>
          <div className="mt-10 grid gap-5">
            {SHOTS.map((shot, i) => (
              <Reveal key={shot.src} delay={i * 90} className="h-full">
                <figure className="dm-panel h-full p-2">
                  <div className="dm-shot">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 1024px) 960px, 100vw"
                      className="block w-full"
                    />
                  </div>
                  <figcaption className="px-2 pb-2 pt-3">
                    <p className="dm-serif dm-gold text-sm uppercase">{shot.title}</p>
                    <p className="dm-muted mt-1 text-sm leading-relaxed">{shot.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="dm-muted mt-5 text-sm">{SCREENSHOT_NOTE}</p>
        </section>

        {/* ───────── Gameplay ───────── */}
        <section id="play" className="scroll-mt-32">
          <Reveal>
            <Head tag="Gameplay" title="What you do" />
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.tag} as="li" delay={i * 80} className="h-full">
                <div className="dm-panel h-full p-6">
                  <p className="dm-serif dm-gold text-xs uppercase tracking-[0.25em]">{f.tag}</p>
                  <h3 className="mt-2 text-xl font-bold">{f.title}</h3>
                  <p className="dm-muted mt-2 leading-relaxed">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ───────── What's new ───────── */}
        <section id="new" className="scroll-mt-32">
          <Reveal>
            <Head tag={WHATS_NEW.version} title="What’s new">
              {WHATS_NEW.intro}
            </Head>
          </Reveal>
          <ul className="mt-10 grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {WHATS_NEW.items.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="dm-gold mt-0.5 shrink-0">
                  ◆
                </span>
                <span className="dm-muted">{item}</span>
              </li>
            ))}
          </ul>
          {project.highlights.length > 0 && (
            <div className="mt-12">
              <p className="dm-serif dm-gold text-sm uppercase">Under the hood</p>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="dm-gold mt-0.5 shrink-0">
                      ◇
                    </span>
                    <span className="dm-muted">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* ───────── Download ───────── */}
        <section id="download" className="scroll-mt-32">
          <Reveal>
            <div className="dm-panel p-8 sm:p-12">
              <p className="dm-serif dm-gold text-sm uppercase">Alpha 1.0.3 · Windows</p>
              <h2 className="dm-serif mt-2 text-3xl font-bold uppercase sm:text-4xl">Play the alpha</h2>
              <div className="dm-rule mt-4 w-40" />
              <p className="dm-muted mt-5 max-w-2xl text-lg leading-relaxed">
                A pre-release build for testers. It is not on Steam, though Steam is the intended
                release.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                {downloadUrl && (
                  <a href={downloadUrl} className="dm-btn">
                    Download the installer · 199 MB <span aria-hidden="true">↓</span>
                  </a>
                )}
                <a
                  href="https://github.com/amithey/dominion/releases/tag/v1.0.3-alpha"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="dm-btn dm-btn-ghost"
                >
                  Release notes <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mt-10 border-t border-[var(--dm-edge)] pt-6">
                <p className="dm-serif dm-gold text-sm uppercase">Known issues</p>
                <ul className="mt-3 space-y-2">
                  {KNOWN_ISSUES.map((issue) => (
                    <li key={issue} className="dm-muted flex gap-3 text-sm leading-relaxed">
                      <span aria-hidden="true" className="text-[var(--dm-red)]">
                        ▸
                      </span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ───────── Navigation ───────── */}
        <nav aria-label="Other projects" className="flex justify-between gap-6 border-t border-[var(--dm-edge)] pt-8 text-sm">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group max-w-[45%]">
              <span className="dm-serif dm-muted text-xs uppercase">← previous</span>
              <span className="mt-1 block font-semibold group-hover:text-[var(--dm-gold)]">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="group max-w-[45%] text-right">
              <span className="dm-serif dm-muted text-xs uppercase">next →</span>
              <span className="mt-1 block font-semibold group-hover:text-[var(--dm-gold)]">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
