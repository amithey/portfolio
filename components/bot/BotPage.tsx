import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import {
  HERO_STATS,
  LAB,
  MODES,
  NOTE_SHOTS,
  PIPELINE,
  SHOTS,
  STACK,
  TAPE,
} from '@/data/bot-showcase';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/noesis/CountUp';
import { demoHostLabel } from '@/lib/demo';
import { CommitteeVote } from './CommitteeVote';
import { TradingChartBackdrop } from './TradingChartBackdrop';

/**
 * The BotTrade showcase: a trading-desk page in the product's own dark
 * dashboard colours, used in place of the standard project template. Content
 * lives in data/bot-showcase.ts and data/projects.ts.
 */

function Head({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="bt-eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="bt-dim mt-4 text-lg leading-relaxed">{children}</p>}
    </div>
  );
}

function TerminalShot({ shot, priority = false }: { shot: { src: string; width: number; height: number; alt: string }; priority?: boolean }) {
  return (
    <div className="bt-window">
      <div className="flex items-center gap-1.5 border-b border-[var(--bt-line)] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="bt-eyebrow bt-dim ml-3 !text-[0.62rem]">bottrade</span>
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        priority={priority}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="block w-full"
      />
    </div>
  );
}

export function BotPage({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project;
  next?: Project;
}) {
  const appUrl = project.demo.url;
  const host = appUrl ? demoHostLabel(appUrl) : undefined;
  const tape = [...TAPE, ...TAPE];

  return (
    <article className="bt">
      {/* ───────── Hero ───────── */}
      <header className="bt-grid relative overflow-hidden">
        <TradingChartBackdrop />
        <div className="relative z-10 mx-auto grid max-w-5xl gap-12 px-5 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:pb-24">
          <div>
            <p className="bt-eyebrow">
              <Link href="/projects" className="hover:underline">
                Projects
              </Link>
              {' / '}Data &amp; AI
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bt-chip">
                <span className="bt-dot" aria-hidden="true" /> Live
              </span>
              <span className="bt-chip">Paper trading only</span>
              <span className="bt-chip">Multi tenant</span>
            </div>

            <h1 className="mt-6 font-display text-6xl font-bold leading-[0.98] tracking-tight sm:text-7xl">
              Bot<span className="text-[var(--bt-mint)]">Trade</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-snug sm:text-2xl">
              An AI trading bot you can actually watch decide.
            </p>
            <p className="bt-dim mt-4 max-w-xl leading-relaxed">{project.tagline}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {appUrl && (
                <a href={appUrl} target="_blank" rel="noreferrer noopener" className="bt-btn">
                  Open the app <span aria-hidden="true">→</span>
                </a>
              )}
              <a href={project.repo} target="_blank" rel="noreferrer noopener" className="bt-btn bt-btn-ghost">
                Read the source <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <CommitteeVote />
        </div>

        <dl className="relative z-10 mx-auto grid max-w-5xl grid-cols-3 gap-px px-5 pb-14">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="bt-stat">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="bt-mono block text-3xl font-semibold text-[var(--bt-mint)] sm:text-5xl">
                  <CountUp to={s.value} duration={1100} />
                </span>
                <span className="bt-dim mt-1 block text-sm">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ───────── Tape ───────── */}
      <div className="bt-tape" aria-hidden="true">
        <div className="bt-tape-track">
          {tape.map((t, i) => (
            <span key={`${t}-${i}`}>
              {t} <span className="bt-tape-dot">●</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-28 px-5 pb-28 pt-24 sm:space-y-36">
        {/* ───────── Overview ───────── */}
        <Reveal>
          <section className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
            <Head eyebrow="Overview" title="A bot that shows its working" />
            <div>
              <p className="text-lg leading-relaxed sm:text-xl">{project.description}</p>
              {project.demo.note && (
                <p className="bt-note mt-6 text-sm leading-relaxed">{project.demo.note}</p>
              )}
            </div>
          </section>
        </Reveal>

        {/* ───────── Modes ───────── */}
        <section>
          <Reveal>
            <Head eyebrow="Strategy" title="Four ways to decide, one bot">
              Switch mode per session, from a free deterministic vote to a full analyst boardroom.
            </Head>
          </Reveal>
          <div className="bt-table mt-10" role="table" aria-label="Strategy modes">
            <div className="bt-row bt-row-head" role="row">
              <span role="columnheader">Mode</span>
              <span role="columnheader">What decides</span>
              <span role="columnheader">Cost</span>
            </div>
            {MODES.map((m, i) => (
              <Reveal key={m.name} delay={i * 70}>
                <div className="bt-row" role="row">
                  <span role="cell" className="font-display text-lg font-bold">
                    {m.name}
                  </span>
                  <span role="cell" className="bt-dim">
                    {m.decides}
                  </span>
                  <span role="cell">
                    {m.free ? <span className="bt-free">{m.cost}</span> : <span className="bt-dim">{m.cost}</span>}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── Pipeline ───────── */}
        <section>
          <Reveal>
            <Head eyebrow="Decision path" title="From a price bar to a paper trade">
              Model output never reaches an order directly. It has to get through the entry gate and
              the risk layer first.
            </Head>
          </Reveal>
          <ol className="mt-12 grid gap-4 lg:grid-cols-5">
            {PIPELINE.map((step, i) => (
              <Reveal key={step.label} as="li" delay={i * 80} className="h-full">
                <div className="bt-panel relative h-full p-5">
                  <p className="bt-eyebrow">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">{step.label}</p>
                  <p className="bt-dim mt-2 text-sm leading-snug">{step.detail}</p>
                  {i < PIPELINE.length - 1 && (
                    <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[var(--bt-mint)] lg:block">
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ───────── The lab ───────── */}
        <section>
          <Reveal>
            <Head eyebrow="Honesty by design" title={LAB.title}>
              {LAB.intro}
            </Head>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <Reveal>
              <TerminalShot shot={LAB.shot} />
            </Reveal>
            <Reveal delay={100}>
              <dl className="grid grid-cols-2 gap-3">
                {LAB.numbers.map((n) => (
                  <div key={n.label} className="bt-panel p-4">
                    <dt className="bt-eyebrow bt-dim !text-[0.62rem]">{n.label}</dt>
                    <dd className={`bt-mono mt-1 text-3xl font-semibold ${n.tone === 'bad' ? 'text-[var(--bt-red)]' : 'text-[var(--bt-ink)]'}`}>
                      {n.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="bt-dim mt-6 leading-relaxed">{LAB.verdict}</p>
            </Reveal>
          </div>
        </section>

        {/* ───────── Screens ───────── */}
        <section>
          <Reveal>
            <Head eyebrow="On screen" title="The product itself" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SHOTS.map((s, i) => (
              <Reveal key={s.src} delay={i * 90} className="h-full">
                <figure>
                  <TerminalShot shot={s} />
                  <figcaption className="mt-3">
                    <p className="font-display text-lg font-bold">{s.title}</p>
                    <p className="bt-dim mt-1 text-sm leading-relaxed">{s.text}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="bt-dim mt-6 text-sm">{NOTE_SHOTS}</p>
        </section>

        {/* ───────── Under the hood ───────── */}
        {project.highlights.length > 0 && (
          <section>
            <Reveal>
              <Head eyebrow="Under the hood" title="Worth knowing" />
            </Reveal>
            <ul className="mt-10 grid gap-x-12 gap-y-5 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bt-mint)]" />
                  <span className="bt-dim">{h}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Built with">
              {STACK.map((s) => (
                <li key={s} className="bt-chip">
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ───────── CTA ───────── */}
        <section>
          <Reveal>
            <div className="bt-cta">
              <p className="bt-eyebrow">Try it</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Run the committee yourself</h2>
              <p className="bt-dim mt-4 max-w-2xl text-lg leading-relaxed">
                Committee mode makes no model calls, so nothing is behind a key. Everything it trades is simulated.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                {appUrl && (
                  <a href={appUrl} target="_blank" rel="noreferrer noopener" className="bt-btn">
                    Open {host ?? 'the app'} <span aria-hidden="true">→</span>
                  </a>
                )}
                <a href={project.repo} target="_blank" rel="noreferrer noopener" className="bt-btn bt-btn-ghost">
                  Source on GitHub <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <nav aria-label="Other projects" className="flex justify-between gap-6 border-t border-[var(--bt-line)] pt-8 text-sm">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group max-w-[45%]">
              <span className="bt-eyebrow">← previous</span>
              <span className="mt-1 block font-semibold group-hover:text-[var(--bt-mint)]">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="group max-w-[45%] text-right">
              <span className="bt-eyebrow">next →</span>
              <span className="mt-1 block font-semibold group-hover:text-[var(--bt-mint)]">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
