'use client';

import { useState } from 'react';
import { soundFX } from './DominionAudio';
import type { DominionSeason } from './DominionBackdrop';

export function DominionHUD({
  season = 'spring',
  onSeasonChange,
}: {
  season?: DominionSeason;
  onSeasonChange?: (s: DominionSeason) => void;
}) {
  const [audioActive, setAudioActive] = useState(false);

  const toggleSound = () => {
    const isNowOn = soundFX.toggle();
    setAudioActive(isNowOn);
  };

  const handleSeason = (s: DominionSeason) => {
    soundFX.playTacticalBeep(980);
    onSeasonChange?.(s);
  };

  return (
    <div className="relative z-20 w-full border-b border-[var(--dm-edge)] bg-[rgba(5,12,22,0.95)] backdrop-blur-md">
      {/* Top operational broadcast ribbon */}
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-[0.66rem] tracking-wider text-[var(--dm-muted)]">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[var(--dm-gold)]">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[var(--dm-gold)]" />
            WAR ROOM LIVE
          </span>
          <span className="hidden text-[var(--dm-edge)] sm:inline">|</span>
          <span className="hidden truncate font-mono text-white/70 md:inline">
            INFILTRATION: 100/100 · HYPERSONIC SILO ARMED · SECTOR 4G · 60 FPS BATCHED
          </span>
        </div>

        {/* Tactical Controls: Season & Audio */}
        <div className="flex items-center gap-2">
          {/* Season Selector */}
          <div className="flex items-center rounded border border-[var(--dm-edge)] bg-[rgba(8,18,31,0.8)] p-0.5 font-mono text-[0.62rem]">
            <button
              type="button"
              onClick={() => handleSeason('spring')}
              className={`rounded px-2 py-0.5 transition-all ${
                season === 'spring'
                  ? 'bg-[var(--dm-gold)] font-bold text-black shadow'
                  : 'text-[var(--dm-muted)] hover:text-white'
              }`}
              title="Spring Season (Clear Day)"
            >
              ☀️ SPRING
            </button>
            <button
              type="button"
              onClick={() => handleSeason('winter')}
              className={`rounded px-2 py-0.5 transition-all ${
                season === 'winter'
                  ? 'bg-sky-400 font-bold text-black shadow'
                  : 'text-[var(--dm-muted)] hover:text-white'
              }`}
              title="Winter Season (Blizzard Snowfall)"
            >
              ❄️ WINTER
            </button>
            <button
              type="button"
              onClick={() => handleSeason('night')}
              className={`rounded px-2 py-0.5 transition-all ${
                season === 'night'
                  ? 'bg-emerald-400 font-bold text-black shadow'
                  : 'text-[var(--dm-muted)] hover:text-white'
              }`}
              title="Night Recon (Thermal NVG)"
            >
              🌙 NVG
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className={`flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[0.62rem] transition-all ${
              audioActive
                ? 'border-[var(--dm-gold)] bg-[rgba(217,182,111,0.18)] text-[var(--dm-gold)] shadow-[0_0_10px_rgba(217,182,111,0.3)]'
                : 'border-[var(--dm-edge)] text-[var(--dm-muted)] hover:border-[var(--dm-gold-dim)] hover:text-white'
            }`}
            title="Toggle Tactical Sound Effects"
          >
            <span>{audioActive ? '🔊 SFX: ON' : '🔈 SFX: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main RTS resource bar strip */}
      <div className="mx-auto grid max-w-5xl grid-cols-2 border-t border-[var(--dm-edge)]/50 sm:grid-cols-3 md:grid-cols-6">
        <div className="flex items-center gap-2.5 border-r border-[var(--dm-edge)]/40 px-3.5 py-2">
          <span className="text-base">👑</span>
          <div>
            <p className="text-[0.58rem] uppercase tracking-wider text-[var(--dm-muted)]">Era</p>
            <p className="dm-serif text-xs font-bold text-[var(--dm-gold)]">Future · Year 2</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-r border-[var(--dm-edge)]/40 px-3.5 py-2">
          <span className="text-base">🪙</span>
          <div>
            <p className="text-[0.58rem] uppercase tracking-wider text-[var(--dm-muted)]">Treasury</p>
            <p className="font-mono text-xs font-bold text-[var(--dm-ink)]">
              979k <span className="text-[0.6rem] text-[var(--dm-green)]">+91.2</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-r border-[var(--dm-edge)]/40 px-3.5 py-2">
          <span className="text-base">🔬</span>
          <div>
            <p className="text-[0.58rem] uppercase tracking-wider text-[var(--dm-muted)]">Science</p>
            <p className="font-mono text-xs font-bold text-[var(--dm-blue)]">
              6,405 <span className="text-[0.6rem] text-[var(--dm-green)]">+6.7</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-r border-[var(--dm-edge)]/40 px-3.5 py-2">
          <span className="text-base">⚡</span>
          <div>
            <p className="text-[0.58rem] uppercase tracking-wider text-[var(--dm-muted)]">Energy Grid</p>
            <p className="font-mono text-xs font-bold text-[var(--dm-ink)]">100k MW</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-r border-[var(--dm-edge)]/40 px-3.5 py-2">
          <span className="text-base">🚀</span>
          <div>
            <p className="text-[0.58rem] uppercase tracking-wider text-[var(--dm-muted)]">Missiles</p>
            <p className="font-mono text-xs font-bold text-[var(--dm-red)]">11 / 30 ARMED</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-2">
          <span className="text-base">🛡️</span>
          <div>
            <p className="text-[0.58rem] uppercase tracking-wider text-[var(--dm-muted)]">Readiness</p>
            <p className="font-mono text-xs font-bold text-[var(--dm-green)]">DEFCON 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
