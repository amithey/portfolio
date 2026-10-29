import Image from 'next/image';
import {
  BRAIN_FRAME,
  LOOP,
  METRICS,
  OPEN_PROBLEMS,
  STAGES,
  type Metric,
  type Stage,
} from '@/data/noesis-progress';

/**
 * The progress presentation for Project Noesis: how the idea works, a stage by
 * stage timeline with the footage, the numbers side by side, and what is still
 * unsolved. All content lives in data/noesis-progress.ts.
 */

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-xl font-bold tracking-tight">{children}</h2>;
}

/** The brain to body loop, one box per step with an arrow between. */
function LoopDiagram() {
  return (
    <ol className="mt-5 grid gap-3 sm:grid-cols-5">
      {LOOP.map((step, i) => (
        <li
          key={step.label}
          className="relative rounded-lg border border-line bg-surface-raised p-3.5"
        >
          <p className="readout text-signal">{String(i + 1).padStart(2, '0')}</p>
          <p className="mt-1 font-semibold">{step.label}</p>
          <p className="mt-1.5 text-sm leading-snug text-muted">{step.detail}</p>
          {i < LOOP.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -bottom-3.5 left-1/2 z-10 -translate-x-1/2 text-muted sm:-right-3.5 sm:bottom-auto sm:left-auto sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:rotate-0"
            >
              <span className="block sm:hidden">↓</span>
              <span className="hidden sm:block">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function StageMedia({ stage }: { stage: Stage }) {
  const { media } = stage;
  if (media.kind === 'image') {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes="(min-width: 768px) 768px, 100vw"
        className="w-full rounded-lg border border-line"
      />
    );
  }
  return (
    <video
      src={`${media.src}#t=0.1`}
      controls
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={media.label}
      className="w-full rounded-lg border border-line bg-surface-sunken"
    />
  );
}

function Timeline() {
  return (
    <ol className="mt-6 space-y-10">
      {STAGES.map((stage) => (
        <li key={stage.id} className="grid gap-4 sm:grid-cols-[3rem_1fr] sm:gap-6">
          <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-signal font-display font-bold text-signal">
              {stage.number}
            </span>
            <span aria-hidden="true" className="hidden w-px flex-1 bg-line sm:mt-2 sm:block" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold tracking-tight">{stage.title}</h3>
            <p
              className={`readout mt-1 ${stage.tone === 'ok' ? 'text-live' : 'text-warn'}`}
            >
              <span aria-hidden="true">●</span> {stage.status}
            </p>
            <p className="mt-3 leading-relaxed text-muted">{stage.summary}</p>
            <figure className="mt-4">
              <StageMedia stage={stage} />
              <figcaption className="mt-2 text-sm leading-relaxed text-muted">
                {stage.caption}
              </figcaption>
            </figure>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Bar widths are relative to the largest value in the row, never to a made-up scale. */
function MetricRow({ metric }: { metric: Metric }) {
  const max = Math.max(...metric.values);
  const best =
    metric.better === 'higher' ? Math.max(...metric.values) : Math.min(...metric.values);
  return (
    <div className="rounded-lg border border-line bg-surface-raised p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold">{metric.label}</h3>
        <p className="readout text-muted">{metric.better === 'higher' ? 'higher is better' : 'lower is better'}</p>
      </div>
      <ul className="mt-3 space-y-2">
        {metric.values.map((value, i) => {
          const isBest = value === best;
          return (
            <li key={STAGES[i].id} className="flex items-center gap-3">
              <span className="readout w-16 shrink-0 text-muted">Stage {STAGES[i].number}</span>
              <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-sunken">
                <span
                  className={`block h-full rounded-full ${isBest ? 'bg-signal' : 'bg-muted/50'}`}
                  style={{ width: `${max === 0 ? 0 : Math.max((value / max) * 100, value === 0 ? 0 : 3)}%` }}
                />
              </span>
              <span className="w-20 shrink-0 text-right text-sm tabular-nums">
                {value}
                {metric.unit && <span className="text-muted"> {metric.unit}</span>}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-muted">{metric.note}</p>
    </div>
  );
}

export function NoesisProgress() {
  return (
    <>
      <section className="mt-12">
        <Heading>How it works</Heading>
        <p className="mt-3 leading-relaxed text-muted">
          One closed loop. The brain decides, the body moves, and the body feeds what it feels
          back into the brain. Nothing in between is scripted.
        </p>
        <LoopDiagram />
      </section>

      <section className="mt-12">
        <Heading>Inside the brain</Heading>
        <figure className="mt-4">
          <Image
            src={BRAIN_FRAME.src}
            alt={BRAIN_FRAME.alt}
            width={BRAIN_FRAME.width}
            height={BRAIN_FRAME.height}
            sizes="(min-width: 768px) 768px, 100vw"
            className="w-full rounded-lg border border-line"
          />
          <figcaption className="mt-2 text-sm leading-relaxed text-muted">
            {BRAIN_FRAME.caption}
          </figcaption>
        </figure>
      </section>

      <section className="mt-12">
        <Heading>Progress, stage by stage</Heading>
        <p className="mt-3 leading-relaxed text-muted">
          Three milestones from the project&rsquo;s own validation runs. The status under each
          title is the repository&rsquo;s verdict, not mine.
        </p>
        <Timeline />
      </section>

      <section className="mt-12">
        <Heading>The numbers</Heading>
        <p className="mt-3 leading-relaxed text-muted">
          The same three measures at every stage. Stage 3 is not better at everything, and the
          bars show that.
        </p>
        <div className="mt-5 space-y-4">
          {METRICS.map((metric) => (
            <MetricRow key={metric.label} metric={metric} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Heading>Still unsolved</Heading>
        <p className="mt-3 leading-relaxed text-muted">
          The project&rsquo;s own handoff notes say the fly is not walking yet. These are the
          reasons.
        </p>
        <ul className="mt-4 space-y-3">
          {OPEN_PROBLEMS.map((problem) => (
            <li key={problem} className="flex gap-3 leading-relaxed text-muted">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-warn" />
              <span>{problem}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
