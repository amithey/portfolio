'use client';

import { useState } from 'react';

export function DominionHUD() {
  const [audioFeedback, setAudioFeedback] = useState(false);

  const toggleSoundSim = () => {
    setAudioFeedback(true);
    setTimeout(() => setAudioFeedback(false), 800);
  };

  return (
    <div className="relative z-20 w-full border-b border-[var(--dm-edge)] bg-[rgba(6,14,24,0.92)] backdrop-blur-md">
      {/* Top micro ticker */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-1.5 text-[0.68rem] tracking-widest text-[var(--dm-muted)]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[var(--dm-gold)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--dm-gold)]" />
            WAR ROOM LIVE UPLINK
          </span>
          <span className="hidden text-[var(--dm-edge)] sm:inline">|</span>
          <span className="hidden font-mono sm:inline">GRID SECTOR: 34.05°N 118.24°W</span>
          <span className="hidden text-[var(--dm-edge)] md:inline">|</span>
          <span className="hidden font-mono md:inline">SYS: GODOT ENGINE (GDScript)</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleSoundSim}
            className={`flex items-center gap-1.5 rounded border border-[var(--dm-edge)] px-2 py-0.5 font-mono text-[0.62rem] transition-colors ${
              audioFeedback ? 'border-[var(--dm-gold)] text-[var(--dm-gold)]' : 'hover:border-[var(--dm-gold-dim)] text-[var(--dm-muted)]'
            }`}
            title="Strategic Command Comm Feed"
          >
            <span>{audioFeedback ? '🔊 COMMS ACTIVE' : '🔈 COMMS CH 1'}</span>
          </button>
          <span className="rounded bg-[rgba(217,182,111,0.12)] px-2 py-0.5 font-mono font-semibold text-[var(--dm-gold)]">
            ALPHA 1.0.4
          </span>
        </div>
      </div>

      {/* Main RTS resource bar strip */}
      <div className="mx-auto grid max-w-5xl grid-cols-2 border-t border-[var(--dm-edge)]/50 sm:grid-cols-3 md:grid-cols-6">
        <div className="flex items-center gap-2.5 border-r border-[var(--dm-edge)]/40 px-3.5 py-2">
          <span className="text-base">👑</span>
          <div>
            <p className="text-[0.6rem] uppercase tracking-wider text-[var(--dm-muted)]">Era</p>
            <p className="dm-serif text-xs font-bold text-[var(--dm-gold)]">Founding</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-r border-[var(--dm-edge)]/40 px-3.5 py-2">
          <span className="text-base">🪙</span>
          <div>
            <p className="text-[0.6rem] uppercase tracking-wider text-[var(--dm-muted)]">Treasury</p>
            <p className="font-mono text-xs font-bold text-[var(--dm-ink)]">
              18,450 <span className="text-[0.6rem] text-[var(--dm-green)]">+140</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-r border-[var(--dm-edge)]/40 px-3.5 py-2">
          <span className="text-base">⚙️</span>
          <div>
            <p className="text-[0.6rem] uppercase tracking-wider text-[var(--dm-muted)]">Production</p>
            <p className="font-mono text-xs font-bold text-[var(--dm-ink)]">3,820</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-r border-[var(--dm-edge)]/40 px-3.5 py-2">
          <span className="text-base">⚡</span>
          <div>
            <p className="text-[0.6rem] uppercase tracking-wider text-[var(--dm-muted)]">Power Grid</p>
            <p className="font-mono text-xs font-bold text-[var(--dm-blue)]">920 MW</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-r border-[var(--dm-edge)]/40 px-3.5 py-2">
          <span className="text-base">🛡️</span>
          <div>
            <p className="text-[0.6rem] uppercase tracking-wider text-[var(--dm-muted)]">Defense</p>
            <p className="font-mono text-xs font-bold text-[var(--dm-green)]">READY</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-2">
          <span className="text-base">🛰️</span>
          <div>
            <p className="text-[0.6rem] uppercase tracking-wider text-[var(--dm-muted)]">Tactical</p>
            <p className="font-mono text-xs font-bold text-[var(--dm-gold)]">RADAR ON</p>
          </div>
        </div>
      </div>
    </div>
  );
}
