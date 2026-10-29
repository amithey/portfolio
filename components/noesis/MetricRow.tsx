'use client';

import { useEffect, useRef, useState } from 'react';
import type { Metric } from '@/data/noesis-progress';

/**
 * One measure across the stages. The bars grow in when scrolled to; each bar's
 * width is relative to its own row's maximum, never to an invented scale.
 */
export function MetricRow({ metric, stages }: { metric: Metric; stages: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShown(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const max = Math.max(...metric.values);
  const best = metric.better === 'higher' ? max : Math.min(...metric.values);

  return (
    <div ref={ref} className="nx-card p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-bold tracking-tight">{metric.label}</h3>
        <p className="nx-eyebrow nx-muted !text-[0.65rem]">
          {metric.better === 'higher' ? 'higher is better' : 'lower is better'}
        </p>
      </div>
      <ul className="mt-4 space-y-3">
        {metric.values.map((value, i) => {
          const isBest = value === best;
          const pct = max === 0 || value === 0 ? 0 : Math.max((value / max) * 100, 3);
          return (
            <li key={stages[i]} className="flex items-center gap-3">
              <span className="nx-eyebrow nx-muted w-14 shrink-0 !text-[0.65rem]">{stages[i]}</span>
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <span
                  className="nx-bar-fill block h-full rounded-full"
                  style={{
                    width: shown ? `${pct}%` : '0%',
                    background: isBest
                      ? 'linear-gradient(90deg, var(--nx-cyan), var(--nx-violet))'
                      : 'rgba(163,179,201,0.35)',
                    boxShadow: isBest ? '0 0 14px rgba(94,234,212,0.5)' : undefined,
                  }}
                />
              </span>
              <span className="w-24 shrink-0 text-right font-display text-sm font-semibold tabular-nums">
                {value}
                {metric.unit && <span className="nx-muted font-normal"> {metric.unit}</span>}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="nx-muted mt-4 text-sm leading-relaxed">{metric.note}</p>
    </div>
  );
}
