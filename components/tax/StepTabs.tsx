'use client';

import Image from 'next/image';
import { useState } from 'react';
import { WALKTHROUGH, WIZARD_STEPS } from '@/data/tax-showcase';

/**
 * A walkthrough of the real app: pick a step, see the actual screen beside a
 * plain-English note on what it does. Arrow keys move between tabs.
 */
export function StepTabs() {
  const [index, setIndex] = useState(0);
  const current = WALKTHROUGH[index];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => (i + 1) % WALKTHROUGH.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => (i - 1 + WALKTHROUGH.length) % WALKTHROUGH.length);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-8">
      <div
        role="tablist"
        aria-label="Wizard steps"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {WALKTHROUGH.map((w, i) => {
          const on = i === index;
          return (
            <button
              key={w.id}
              role="tab"
              id={`tx-tab-${w.id}`}
              aria-selected={on}
              aria-controls="tx-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setIndex(i)}
              className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors lg:shrink ${
                on
                  ? 'border-[var(--tx-teal)] bg-[var(--tx-mint)]'
                  : 'border-[var(--tx-line)] bg-white hover:border-[var(--tx-teal)]'
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-sm font-bold ${
                  on
                    ? 'border-[var(--tx-teal)] bg-[var(--tx-teal)] text-white'
                    : 'border-[var(--tx-line)] text-[var(--tx-muted)]'
                }`}
              >
                {w.step + 1}
              </span>
              <span className="whitespace-nowrap text-sm font-semibold lg:whitespace-normal">
                {WIZARD_STEPS[w.step].en}
              </span>
            </button>
          );
        })}
      </div>

      <div id="tx-panel" role="tabpanel" aria-labelledby={`tx-tab-${current.id}`}>
        <div className="tx-browser">
          <div className="flex items-center gap-1.5 border-b border-[var(--tx-line)] bg-[var(--tx-mint)] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--tx-line)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--tx-line)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--tx-line)]" />
            <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-xs text-[var(--tx-muted)]">
              capital-gains-tax-report-generator
            </span>
          </div>
          <Image
            key={current.id}
            src={current.image.src}
            alt={current.image.alt}
            width={current.image.width}
            height={current.image.height}
            sizes="(min-width: 1024px) 700px, 100vw"
            className="tx-fade block w-full bg-white"
          />
        </div>
        <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{current.title}</h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-[var(--tx-muted)]">{current.text}</p>
      </div>
    </div>
  );
}
