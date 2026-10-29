import Link from 'next/link';
import type { Project } from '@/data/projects';
import { HERO_STATS, NOTE_SAMPLE, PIPELINE, PRINCIPLES } from '@/data/tax-showcase';
import { Reveal } from '@/components/Reveal';
import { RunDemo } from '@/components/RunDemo';
import { CountUp } from '@/components/noesis/CountUp';
import { HeroStepper } from './HeroStepper';
import { StepTabs } from './StepTabs';

/**
 * The Capital Gains Tax Report Generator showcase: a light, ledger-paper page
 * in the app's own mint and teal, used in place of the standard project
 * template. Content lives in data/tax-showcase.ts and data/projects.ts.
 */

function Head({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="tx-eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-[var(--tx-muted)]">{children}</p>}
    </div>
  );
}

export function TaxPage({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project;
  next?: Project;
}) {
  return (
    <article className="tx">
      {/* ───────── Hero ───────── */}
      <header className="tx-ledger relative">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-14 lg:pb-28">
          <div>
            <p className="tx-eyebrow">
              <Link href="/projects" className="hover:underline">
                Projects
              </Link>
              {' / '}Web apps
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="tx-chip">
                <span className="tx-dot" aria-hidden="true" /> Live
              </span>
              <span className="tx-chip">Runs in your browser</span>
              <span className="tx-chip">Hebrew interface</span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Capital Gains <span className="tx-mark">Tax Report Generator</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-snug text-[var(--tx-muted)]">{project.tagline}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#try" className="tx-btn">
                Try it now <span aria-hidden="true">↓</span>
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="tx-btn tx-btn-ghost"
              >
                View the source <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <HeroStepper />
        </div>

        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-px px-5 pb-14 sm:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="tx-stat">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-bold tracking-tight text-[var(--tx-teal)]">
                  <CountUp to={stat.value} duration={1200} />
                  {stat.suffix && <span className="text-lg font-semibold">{stat.suffix}</span>}
                </span>
                <span className="mt-1 block text-sm text-[var(--tx-muted)]">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mx-auto max-w-5xl space-y-24 px-5 pb-28 pt-20 sm:space-y-32">
        {/* ───────── Problem ───────── */}
        <Reveal>
          <section className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
            <Head eyebrow="The problem" title="Am I owed a refund?" />
            <p className="text-lg leading-relaxed sm:text-xl">{project.description}</p>
          </section>
        </Reveal>

        {/* ───────── Pipeline ───────── */}
        <section>
          <Reveal>
            <Head eyebrow="How it works" title="From a broker file to a report">
              Five stages, each doing one job. Everything runs on your machine.
            </Head>
          </Reveal>
          <ol className="mt-12 grid gap-4 lg:grid-cols-5">
            {PIPELINE.map((step, i) => (
              <Reveal key={step.label} as="li" delay={i * 80} className="h-full">
                <div className="tx-card relative h-full p-5">
                  <p className="tx-eyebrow">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">{step.label}</p>
                  <p className="mt-2 text-sm leading-snug text-[var(--tx-muted)]">{step.detail}</p>
                  {i < PIPELINE.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[var(--tx-teal)] lg:block"
                    >
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ───────── Walkthrough ───────── */}
        <section>
          <Reveal>
            <Head eyebrow="See it" title="A walk through the real app">
              Pick a step. These are screens from the running app, filled with synthetic data.
            </Head>
          </Reveal>
          <Reveal delay={100} className="mt-10 block">
            <StepTabs />
            <p className="mt-6 text-sm text-[var(--tx-muted)]">{NOTE_SAMPLE}</p>
          </Reveal>
        </section>

        {/* ───────── Principles ───────── */}
        <section>
          <Reveal>
            <Head eyebrow="Design rules" title="Built to be trusted" />
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 90} className="h-full">
                <div className="tx-card h-full p-6">
                  <span className="tx-tick" aria-hidden="true">
                    ✓
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold leading-tight">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--tx-muted)]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ───────── Try it ───────── */}
        <section id="try" className="scroll-mt-24">
          <Reveal>
            <Head eyebrow="Try it" title="Use the live app">
              {project.demo.note}
            </Head>
          </Reveal>
          <div className="mt-8">
            <RunDemo demo={project.demo} title={project.title} />
          </div>
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
                  <span aria-hidden="true" className="mt-1 text-[var(--tx-teal)]">
                    ◆
                  </span>
                  <span className="text-[var(--tx-muted)]">{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ───────── Navigation ───────── */}
        <nav aria-label="Other projects" className="flex justify-between gap-6 border-t border-[var(--tx-line)] pt-8 text-sm">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group max-w-[45%]">
              <span className="tx-eyebrow">← previous</span>
              <span className="mt-1 block font-semibold group-hover:text-[var(--tx-teal)]">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="group max-w-[45%] text-right">
              <span className="tx-eyebrow">next →</span>
              <span className="mt-1 block font-semibold group-hover:text-[var(--tx-teal)]">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
