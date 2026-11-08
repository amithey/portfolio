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
  WHATS_NEW,
} from '@/data/dominion-showcase';
import { Reveal } from '@/components/Reveal';
import { DominionHUD } from './DominionHUD';
import { DominionBackdrop } from './DominionBackdrop';
import { DominionWarRoom } from './DominionWarRoom';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['600', '700'],
  display: 'swap',
});

/**
 * The Dominion showcase: styled like the game's actual in-game RTS command center,
 * with animated hex tactical radar, real-time resource bars, and military war room aesthetics.
 */

const MENU = [
  { href: '#overview', label: 'Overview' },
  { href: '#screens', label: 'Sat-Recon' },
  { href: '#play', label: 'Command Directives' },
  { href: '#new', label: 'Combat Dispatches' },
  { href: '#download', label: 'Deploy Alpha' },
];

const FEATURE_BADGES = [
  'COLONY HQ & TERRITORY',
  'ERA PROGRESSION TREE',
  'FOREIGN RELATIONS & TREATIES',
  'THEATER OF WAR (LAND & SEA)',
];

function Head({ tag, title, children }: { tag: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 bg-[var(--dm-gold)]" />
        <p className="dm-serif dm-gold text-sm uppercase tracking-wider">{tag}</p>
      </div>
      <h2 className="dm-serif mt-2 text-3xl font-bold uppercase sm:text-4xl text-[var(--dm-ink)]">{title}</h2>
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
      {/* Top RTS in-game resource & status strip */}
      <DominionHUD />

      {/* ───────── Hero: Strategic War Room ───────── */}
      <header className="relative isolate overflow-hidden">
        {/* Background battlefield terrain */}
        <Image
          src={HERO_SHOT.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-center brightness-[0.55] contrast-[1.15]"
        />

        {/* Animated tactical hex radar & patrol units */}
        <DominionBackdrop />

        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,18,31,0.65)_0%,rgba(8,18,31,0.85)_60%,var(--dm-bg)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-5 pb-16 pt-10 sm:pb-24 sm:pt-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="dm-serif dm-gold text-xs uppercase sm:text-sm">
              <Link href="/projects" className="hover:underline">
                Projects
              </Link>
              {' / '}Games &amp; interactive
            </p>

            <span className="dm-tag">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--dm-green)]" />
              THEATER: NATIVE WINDOWS RTS
            </span>
          </div>

          <div className="dm-tactical-box mt-8 border border-[var(--dm-edge)] bg-[rgba(8,18,31,0.65)] p-6 backdrop-blur-md sm:p-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="dm-serif text-xs uppercase tracking-[0.3em] text-[var(--dm-gold)]">
                ✦ STRATEGIC COMMAND CONSOLE
              </span>
              <span className="text-[var(--dm-edge)]">·</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--dm-muted)]">
                Founding Era · Alpha 1.0.4
              </span>
            </div>

            <h1 className="dm-serif dm-title-gold mt-4 text-6xl font-bold uppercase leading-none tracking-wider sm:text-8xl lg:text-9xl">
              Dominion
            </h1>
            <div className="dm-rule mt-6 w-60" />
            <p className="mt-6 max-w-2xl text-xl leading-snug text-[var(--dm-ink)] sm:text-2xl">
              A 3D real time strategy game for Windows, built in Godot.
            </p>
            <p className="dm-muted mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
              Found capitals, claim hex territories, command nation-specific tank divisions and naval fleets, and conquer through historical eras.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {downloadUrl && (
                <a href={downloadUrl} className="dm-btn">
                  Download for Windows (394 MB) <span aria-hidden="true">↓</span>
                </a>
              )}
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="dm-btn dm-btn-ghost"
              >
                Source Repository (GDScript) <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Resource strip / stats */}
          <dl className="dm-resbar mt-10">
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

      {/* The game's top menu, as page navigation */}
      <div className="sticky top-[69px] z-30 mx-auto max-w-5xl px-5 py-3 sm:top-[56px]">
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
                <p className="text-lg leading-relaxed text-[var(--dm-ink)] sm:text-xl">{project.description}</p>
                {project.demo.note && (
                  <div className="dm-panel dm-muted mt-6 p-5 text-sm leading-relaxed">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase text-[var(--dm-gold)]">
                      <span>◈</span>
                      <span>PRE-RELEASE OPERATIONAL DIRECTIVE</span>
                    </div>
                    <p className="mt-2">{project.demo.note}</p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ───────── Screens: Satellite Recon & Interactive Command Console ───────── */}
        <section id="screens" className="scroll-mt-32">
          <Reveal>
            <Head tag="Surveillance & Recon" title="Interactive Battlefield Feeds">
              Switch feeds on the live terminal below to inspect the Alpha 1.0.4 metropolis, strategic nuclear complexes, and the in-game command HUD.
            </Head>
          </Reveal>

          <div className="mt-8">
            <Reveal>
              <DominionWarRoom />
            </Reveal>
          </div>
          <p className="dm-muted mt-5 font-mono text-xs">{SCREENSHOT_NOTE}</p>
        </section>

        {/* ───────── Gameplay: Command Directives ───────── */}
        <section id="play" className="scroll-mt-32">
          <Reveal>
            <Head tag="Gameplay" title="Strategic Pillars" />
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.tag} as="li" delay={i * 80} className="h-full">
                <div className="dm-panel h-full p-6">
                  <div className="flex items-center justify-between">
                    <p className="dm-serif dm-gold text-xs uppercase tracking-[0.25em]">{f.tag}</p>
                    <span className="font-mono text-[0.62rem] text-[var(--dm-muted)]">
                      {FEATURE_BADGES[i] ?? 'DIRECTIVE'}
                    </span>
                  </div>
                  <h3 className="dm-serif mt-3 text-xl font-bold text-[var(--dm-ink)]">{f.title}</h3>
                  <div className="dm-rule my-3 w-16" />
                  <p className="dm-muted leading-relaxed">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ───────── What's new: Field Dispatches ───────── */}
        <section id="new" className="scroll-mt-32">
          <Reveal>
            <Head tag={WHATS_NEW.version} title="Field Dispatches">
              {WHATS_NEW.intro}
            </Head>
          </Reveal>
          <ul className="mt-10 grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {WHATS_NEW.items.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="dm-gold mt-1 shrink-0 text-xs">
                  ◆
                </span>
                <span className="dm-muted text-sm sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
          {project.highlights.length > 0 && (
            <div className="mt-12 rounded-lg border border-[var(--dm-edge)] bg-[rgba(8,18,31,0.5)] p-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[var(--dm-gold)]" />
                <p className="dm-serif dm-gold text-sm uppercase">Technical Specifications (Under the hood)</p>
              </div>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed sm:text-base">
                    <span aria-hidden="true" className="dm-gold mt-1 shrink-0 text-xs">
                      ◇
                    </span>
                    <span className="dm-muted">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* ───────── Download: Deployment Terminal ───────── */}
        <section id="download" className="scroll-mt-32">
          <Reveal>
            <div className="dm-panel p-8 sm:p-12">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-ping rounded-full bg-[var(--dm-gold)]" />
                <p className="dm-serif dm-gold text-sm uppercase">Alpha 1.0.4 · Windows Deployment</p>
              </div>
              <h2 className="dm-serif dm-title-gold mt-3 text-3xl font-bold uppercase sm:text-5xl">
                Deploy The Game
              </h2>
              <div className="dm-rule mt-4 w-44" />
              <p className="dm-muted mt-5 max-w-2xl text-lg leading-relaxed">
                A pre-release Windows executable build for commanders and testers. Experience the full 3D RTS warfare built in Godot.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {downloadUrl && (
                  <a href={downloadUrl} className="dm-btn">
                    Download Installer (394 MB) <span aria-hidden="true">↓</span>
                  </a>
                )}
                <a
                  href="https://github.com/amithey/dominion/releases/tag/v1.0.4-alpha"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="dm-btn dm-btn-ghost"
                >
                  GitHub Release Notes <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mt-10 border-t border-[var(--dm-edge)] pt-6">
                <p className="dm-serif dm-gold text-xs uppercase tracking-wider">Known Recon &amp; Performance Issues</p>
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
