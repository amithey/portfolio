'use client';

import { useEffect, useState } from 'react';
import { WIZARD_STEPS } from '@/data/tax-showcase';

/**
 * The app's own six step wizard, replayed as a quiet loop in the hero: the
 * active step lights up and a progress bar fills. Static under reduced motion.
 */
export function HeroStepper() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % WIZARD_STEPS.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="tx-card tx-float p-5 sm:p-6" aria-hidden="true">
      <div className="flex items-center justify-between">
        <p className="tx-eyebrow">The wizard</p>
        <p className="tx-eyebrow">
          Step {active + 1} of {WIZARD_STEPS.length}
        </p>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--tx-mint)]">
        <div
          className="h-full rounded-full bg-[var(--tx-teal)] transition-[width] duration-700"
          style={{ width: `${((active + 1) / WIZARD_STEPS.length) * 100}%` }}
        />
      </div>
      <ol className="mt-5 space-y-2">
        {WIZARD_STEPS.map((step, i) => {
          const on = i === active;
          const done = i < active;
          return (
            <li
              key={step.en}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors duration-500 ${
                on
                  ? 'border-[var(--tx-teal)] bg-[var(--tx-mint)]'
                  : 'border-[var(--tx-line)] bg-white'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-sm font-bold transition-colors duration-500 ${
                  on
                    ? 'border-[var(--tx-teal)] bg-[var(--tx-teal)] text-white'
                    : done
                      ? 'border-[var(--tx-teal)] text-[var(--tx-teal)]'
                      : 'border-[var(--tx-line)] text-[var(--tx-muted)]'
                }`}
              >
                {done ? '✓' : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{step.en}</span>
                <span dir="rtl" className="block text-xs text-[var(--tx-muted)]">
                  {step.he}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
