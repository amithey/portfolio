'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GAMEPLAY_LOOP } from '@/data/dominion-showcase';
import { soundFX } from './DominionAudio';

export function DominionGameplayLoop() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = GAMEPLAY_LOOP[activeStepIndex];

  return (
    <div className="space-y-6">
      {/* Step Selector Tabs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {GAMEPLAY_LOOP.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.step}
              type="button"
              onClick={() => {
                soundFX.playTacticalBeep(800 + idx * 100);
                setActiveStepIndex(idx);
              }}
              className={`group flex items-center gap-3.5 rounded-lg border p-4 text-right transition-all ${
                isActive
                  ? 'border-[var(--dm-gold)] bg-[rgba(217,182,111,0.12)] shadow-[0_0_20px_rgba(217,182,111,0.2)]'
                  : 'border-[var(--dm-edge)] bg-[rgba(10,22,38,0.5)] opacity-75 hover:border-[var(--dm-gold-dim)] hover:opacity-100'
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border font-mono text-base font-bold transition-all ${
                  isActive
                    ? 'border-[var(--dm-gold)] bg-[var(--dm-gold)] text-black shadow'
                    : 'border-[var(--dm-edge)] bg-[rgba(8,18,31,0.8)] text-[var(--dm-gold)] group-hover:border-[var(--dm-gold-dim)]'
                }`}
              >
                {step.step}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-[var(--dm-gold)]">
                  <span>{step.icon}</span>
                  <span className="truncate">{step.title}</span>
                </p>
                <p className="mt-0.5 truncate text-[0.72rem] text-[var(--dm-muted)]">
                  {step.sub}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase Card */}
      <div className="overflow-hidden rounded-xl border border-[var(--dm-edge)] bg-[rgba(8,18,31,0.9)] shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-12">
          {/* Visual Shot (7 cols) */}
          <div className="relative aspect-[16/10] overflow-hidden bg-black/60 lg:col-span-7">
            <Image
              src={activeStep.shot.src}
              alt={activeStep.shot.alt}
              fill
              priority
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />

            {/* Tactical Badges */}
            <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
              <span className="rounded bg-black/80 px-2.5 py-1 font-mono text-[0.68rem] font-bold text-[var(--dm-gold)] backdrop-blur-sm border border-[var(--dm-edge)]">
                {activeStep.shot.badge ?? 'IN-GAME CAPTURE'}
              </span>
              <span className="rounded bg-black/80 px-2 py-1 font-mono text-[0.62rem] text-[var(--dm-green)] backdrop-blur-sm border border-[var(--dm-edge)]">
                ● GODOT 4 NATIVE
              </span>
            </div>

            <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded bg-black/85 p-2.5 font-mono text-[0.7rem] text-[var(--dm-muted)] backdrop-blur-md border border-[var(--dm-edge)]/60">
              <p className="text-[var(--dm-ink)] font-semibold">{activeStep.shot.title}</p>
              <p className="mt-0.5 text-xs text-[var(--dm-muted)]">{activeStep.shot.caption}</p>
            </div>
          </div>

          {/* Gameplay Explanation & Mechanics (5 cols) */}
          <div className="flex flex-col justify-between p-6 lg:col-span-5 lg:p-7">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[var(--dm-gold)]">
                  PHASE {activeStep.step} / 03
                </span>
                <span className="text-[var(--dm-edge)]">·</span>
                <span className="text-xs text-[var(--dm-muted)]">Core Loop</span>
              </div>

              <h3 className="dm-serif mt-2 text-2xl font-bold text-[var(--dm-ink)]">
                {activeStep.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-[var(--dm-gold)]">
                {activeStep.sub}
              </p>

              <div className="dm-rule my-4 w-20" />

              <p className="text-sm leading-relaxed text-[var(--dm-muted)] sm:text-base">
                {activeStep.desc}
              </p>

              <div className="mt-5 space-y-2.5 border-t border-[var(--dm-edge)]/60 pt-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-wider text-[var(--dm-gold)]">
                  מכניקות ליבה בשלב זה:
                </p>
                <ul className="space-y-2 text-xs leading-relaxed text-[var(--dm-ink)] sm:text-sm">
                  {activeStep.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="text-[var(--dm-gold)] mt-0.5">◈</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Next/Prev switch */}
            <div className="mt-6 flex items-center justify-between border-t border-[var(--dm-edge)]/60 pt-4 text-xs font-mono">
              <span className="text-[var(--dm-muted)]">
                {activeStepIndex + 1} מתוך 3 שלבי משחק
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const prev = (activeStepIndex - 1 + GAMEPLAY_LOOP.length) % GAMEPLAY_LOOP.length;
                    soundFX.playTacticalBeep(750);
                    setActiveStepIndex(prev);
                  }}
                  className="rounded border border-[var(--dm-edge)] bg-[rgba(10,22,38,0.8)] px-2.5 py-1 text-[var(--dm-muted)] hover:border-[var(--dm-gold)] hover:text-white"
                >
                  ← קודם
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next = (activeStepIndex + 1) % GAMEPLAY_LOOP.length;
                    soundFX.playTacticalBeep(850);
                    setActiveStepIndex(next);
                  }}
                  className="rounded border border-[var(--dm-gold)] bg-[rgba(217,182,111,0.15)] px-2.5 py-1 text-[var(--dm-gold)] hover:bg-[rgba(217,182,111,0.3)] font-bold"
                >
                  הבא →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
