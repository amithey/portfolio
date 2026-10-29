'use client';

import { useEffect, useState } from 'react';

const TOTAL = 38; // the real committee's size

/** Small deterministic generator so server and client render the same first frame. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function frame(seed: number, lean: number) {
  const r = seeded(seed);
  return Array.from({ length: TOTAL }, () => r() < lean);
}

/**
 * An illustration of the committee: 38 voters, each leaning bull or bear, a
 * tally, and the majority verdict. It is not market data and says so; it exists
 * to show the mechanism the product is built around.
 */
export function CommitteeVote() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1800);
    return () => window.clearInterval(id);
  }, []);

  // Lean drifts slowly so the verdict flips now and then instead of flickering.
  const lean = 0.5 + 0.28 * Math.sin(tick / 2.2);
  const votes = frame(7 + tick, lean);
  const bull = votes.filter(Boolean).length;
  const bear = TOTAL - bull;
  const long = bull > bear;

  return (
    <div className="bt-panel bt-float p-5 sm:p-6" role="img" aria-label="Illustration of 38 indicators voting bullish or bearish, with a majority verdict.">
      <div className="flex items-center justify-between">
        <p className="bt-eyebrow">Committee · illustration</p>
        <span className={`bt-verdict ${long ? 'bt-long' : 'bt-cash'}`}>{long ? 'LONG' : 'CASH'}</span>
      </div>

      <div className="mt-5 grid grid-cols-[repeat(19,minmax(0,1fr))] gap-1.5" aria-hidden="true">
        {votes.map((up, i) => (
          <span key={i} className={`bt-voter ${up ? 'bt-up' : 'bt-down'}`} />
        ))}
      </div>

      <div className="mt-6 flex items-end justify-between border-t border-[var(--bt-line)] pt-4" aria-hidden="true">
        <div>
          <p className="bt-eyebrow bt-dim !text-[0.62rem]">Bull</p>
          <p className="bt-mono text-3xl font-semibold text-[var(--bt-mint)]">{bull}</p>
        </div>
        <div className="text-center">
          <p className="bt-eyebrow bt-dim !text-[0.62rem]">Voters</p>
          <p className="bt-mono text-xl text-[var(--bt-dim)]">{TOTAL}</p>
        </div>
        <div className="text-right">
          <p className="bt-eyebrow bt-dim !text-[0.62rem]">Bear</p>
          <p className="bt-mono text-3xl font-semibold text-[var(--bt-red)]">{bear}</p>
        </div>
      </div>
      <p className="bt-dim mt-4 text-xs leading-relaxed">
        Not market data. It shows how the vote works: a bull majority goes long, a bear majority
        steps out to cash.
      </p>
    </div>
  );
}
