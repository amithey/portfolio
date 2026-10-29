import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import {
  BRAIN_VIDEO,
  HERO_STATS,
  LOOP,
  METRICS,
  OPEN_PROBLEMS,
  STAGES,
  type Stage,
} from '@/data/noesis-progress';
import { Reveal } from '@/components/Reveal';
import { NeuralField } from './NeuralField';
import { CountUp } from './CountUp';
import { LoopVideo } from './LoopVideo';
import { MetricRow } from './MetricRow';

/**
 * The Project Noesis showcase: a dark, cinematic page with its own layout,
 * used in place of the standard project template. Content lives in
 * data/noesis-progress.ts and data/projects.ts.
 */

function SectionHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="nx-eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="nx-muted mt-4 text-lg leading-relaxed">{children}</p>}
    </div>
  );
}

function StageMedia({ stage }: { stage: Stage }) {
  const { media } = stage;
  return (
    <div className="nx-frame">
      <div className="nx-frame-inner nx-scan relative">
        {media.kind === 'image' ? (
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="block w-full"
          />
        ) : (
          <LoopVideo src={media.src} label={media.label} />
        )}
      </div>
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--nx-line)] bg-white/[0.03] px-3 py-2">
      <p className="font-display text-lg font-bold tabular-nums">{value}</p>
      <p className="nx-eyebrow nx-muted !text-[0.6rem]">{label}</p>
    </div>
  );
}

export function NoesisPage({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project;
  next?: Project;
}) {
  const stageNames = STAGES.map((s) => `Stage ${s.number}`);

  return (
    <article className="nx">
      {/* ───────── Hero ───────── */}
      <header className="relative isolate">
        <div className="nx-hero-glow absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 opacity-70" aria-hidden="true">
          <NeuralField />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[var(--nx-bg)]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-5xl px-5 pb-20 pt-14 sm:pb-28 sm:pt-24">
          <p className="nx-eyebrow">
            <Link href="/projects" className="hover:underline">
              Projects
            </Link>
            {' / '}
            Data &amp; AI
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="nx-chip">
              <span className="nx-live-dot" aria-hidden="true" /> Research in progress
            </span>
            {project.built && <span className="nx-chip">Started {project.built}</span>}
          </div>

          <h1 className="nx-title mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-snug sm:text-2xl">{project.tagline}</p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="nx-chip">
                {tag}
              </li>
            ))}
          </ul>

          <dl className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-3 sm:gap-6">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="border-l border-[var(--nx-line)] pl-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    <CountUp to={stat.value} />
                  </span>
                  <span className="nx-muted mt-1 block text-sm">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-28 px-5 pb-28 sm:space-y-36">
        {/* ───────── The idea ───────── */}
        <Reveal>
          <section className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <SectionHead eyebrow="The idea" title="A fly, run from its own wiring" />
            <div>
              <p className="text-lg leading-relaxed sm:text-xl">{project.description}</p>
              {project.demo.note && (
                <p className="nx-muted mt-6 rounded-xl border border-[var(--nx-line)] bg-white/[0.03] px-4 py-3 text-sm leading-relaxed">
                  {project.demo.note}
                </p>
              )}
            </div>
          </section>
        </Reveal>

        {/* ───────── Watch the brain ───────── */}
        <section>
          <Reveal>
            <SectionHead eyebrow="Live output" title="Watch the brain fire">
              Every point is a group of real neurons. The glow is measured firing, smoothed over
              fifty milliseconds.
            </SectionHead>
          </Reveal>
          <Reveal delay={100} className="mt-10 block">
            <figure>
              <div className="nx-frame nx-float">
                <div className="nx-frame-inner nx-scan relative">
                  <div className="flex items-center gap-2 border-b border-[var(--nx-line)] px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="nx-eyebrow nx-muted ml-3 !text-[0.65rem]">
                      noesis / brain activity · 10 s
                    </span>
                    <span className="nx-chip ml-auto !py-0.5 !text-[0.65rem]">
                      <span className="nx-live-dot" aria-hidden="true" /> simulation output
                    </span>
                  </div>
                  <LoopVideo src={BRAIN_VIDEO.src} poster={BRAIN_VIDEO.poster} label={BRAIN_VIDEO.label} />
                </div>
              </div>
              <figcaption className="nx-muted mx-auto mt-5 max-w-3xl text-sm leading-relaxed">
                {BRAIN_VIDEO.caption}
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ───────── How it works ───────── */}
        <section>
          <Reveal>
            <SectionHead eyebrow="How it works" title="One closed loop">
              The brain decides, the body moves, and what the body feels flows straight back into
              the brain. Nothing in between is scripted.
            </SectionHead>
          </Reveal>

          <ol className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-0">
            {LOOP.map((step, i) => (
              <Reveal key={step.label} as="li" delay={i * 90} className="relative lg:px-2">
                <div className="nx-card h-full p-5">
                  <p className="nx-eyebrow">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">{step.label}</p>
                  <p className="nx-muted mt-2 text-sm leading-snug">{step.detail}</p>
                </div>
                {i < LOOP.length - 1 && (
                  <>
                    <span
                      aria-hidden="true"
                      className="nx-wire nx-wire-v absolute -bottom-8 left-1/2 h-8 w-px -translate-x-1/2 lg:hidden"
                    />
                    <span
                      aria-hidden="true"
                      className="nx-wire absolute -right-1 top-1/2 z-10 hidden h-px w-4 lg:block"
                    />
                  </>
                )}
              </Reveal>
            ))}
          </ol>

          <Reveal delay={300} className="mt-8 block">
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-[var(--nx-line)] px-5 py-4">
              <span aria-hidden="true" className="nx-wire h-px flex-1" />
              <p className="nx-eyebrow nx-muted text-center !text-[0.68rem]">
                feedback · the senses return to the brain
              </p>
              <span aria-hidden="true" className="nx-wire h-px flex-1" />
            </div>
          </Reveal>
        </section>

        {/* ───────── Timeline ───────── */}
        <section>
          <Reveal>
            <SectionHead eyebrow="Progress" title="Three milestones, so far">
              From the project&rsquo;s own validation runs. The status under each title is the
              repository&rsquo;s verdict, not mine.
            </SectionHead>
          </Reveal>

          <ol className="relative mt-14 space-y-16 sm:space-y-24">
            <span
              aria-hidden="true"
              className="nx-spine absolute bottom-0 left-5 top-2 hidden w-px sm:block"
            />
            {STAGES.map((stage, i) => {
              const warn = stage.tone === 'warn';
              return (
                <li key={stage.id} className="relative sm:pl-20">
                  <span
                    className={`${warn ? 'nx-badge-warn border-[var(--nx-amber)] text-[var(--nx-amber)]' : 'nx-badge border-[var(--nx-cyan)] text-[var(--nx-cyan)]'} absolute left-0 top-0 hidden h-10 w-10 items-center justify-center rounded-full border bg-[var(--nx-bg)] font-display font-bold sm:flex`}
                  >
                    {stage.number}
                  </span>
                  <Reveal>
                    <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-12">
                      <div>
                        <p className="nx-eyebrow sm:hidden">Stage {stage.number}</p>
                        <h3 className="mt-2 font-display text-3xl font-bold tracking-tight sm:mt-0">
                          {stage.title}
                        </h3>
                        <p
                          className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold ${warn ? 'text-[var(--nx-amber)]' : 'text-[var(--nx-ok)]'}`}
                        >
                          <span aria-hidden="true">●</span> {stage.status}
                        </p>
                        <p className="nx-muted mt-4 text-lg leading-relaxed">{stage.summary}</p>
                        <div className="mt-6 grid grid-cols-3 gap-2">
                          <Pill label="forward" value={`${METRICS[0].values[i]} mm`} />
                          <Pill label="tripod" value={`${METRICS[1].values[i]}`} />
                          <Pill label="slip mm/s" value={`${METRICS[2].values[i]}`} />
                        </div>
                      </div>
                      <figure>
                        <StageMedia stage={stage} />
                        <figcaption className="nx-muted mt-3 text-sm leading-relaxed">
                          {stage.caption}
                        </figcaption>
                      </figure>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ───────── Numbers ───────── */}
        <section>
          <Reveal>
            <SectionHead eyebrow="The numbers" title="Side by side">
              The same three measures at every stage. Stage 3 is not better at everything, and the
              bars show that.
            </SectionHead>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {METRICS.map((metric, i) => (
              <Reveal key={metric.label} delay={i * 90} className="h-full">
                <MetricRow metric={metric} stages={stageNames} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── Open problems ───────── */}
        <section>
          <Reveal>
            <SectionHead eyebrow="Honest status" title="What is still unsolved">
              The project&rsquo;s own handoff notes say the fly is not walking yet. These are the
              reasons.
            </SectionHead>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {OPEN_PROBLEMS.map((problem, i) => (
              <Reveal key={problem} as="li" delay={i * 80} className="h-full">
                <div className="nx-card h-full border-l-2 !border-l-[var(--nx-amber)] p-5">
                  <p className="nx-eyebrow !text-[var(--nx-amber)]">
                    Open · {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-3 leading-relaxed">{problem}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ───────── Worth knowing ───────── */}
        {project.highlights.length > 0 && (
          <section>
            <Reveal>
              <SectionHead eyebrow="Under the hood" title="Worth knowing" />
            </Reveal>
            <ul className="mt-10 grid gap-x-12 gap-y-5 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--nx-cyan)] shadow-[0_0_10px_var(--nx-cyan)]"
                  />
                  <span className="nx-muted">{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ───────── Source + navigation ───────── */}
        <section className="border-t border-[var(--nx-line)] pt-10">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--nx-cyan)] px-6 py-3 font-semibold text-[var(--nx-cyan)] transition-colors hover:bg-[var(--nx-cyan)] hover:text-[var(--nx-bg)]"
          >
            Read the source on GitHub <span aria-hidden="true">→</span>
          </a>

          <nav aria-label="Other projects" className="mt-12 flex justify-between gap-6 text-sm">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group max-w-[45%]">
                <span className="nx-eyebrow nx-muted">← previous</span>
                <span className="mt-1 block font-semibold group-hover:text-[var(--nx-cyan)]">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/projects/${next.slug}`} className="group max-w-[45%] text-right">
                <span className="nx-eyebrow nx-muted">next →</span>
                <span className="mt-1 block font-semibold group-hover:text-[var(--nx-cyan)]">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        </section>
      </div>
    </article>
  );
}
