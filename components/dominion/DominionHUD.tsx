'use client';

import { useState } from 'react';
import { soundFX } from './DominionAudio';

export function DominionHUD() {
  const [audioActive, setAudioActive] = useState(false);

  const toggleSound = () => {
    const isNowOn = soundFX.toggle();
    setAudioActive(isNowOn);
  };

  return (
    <div className="relative z-20 w-full border-b border-[var(--dm-edge)] bg-[rgba(5,12,22,0.95)] backdrop-blur-md">
      {/* Top operational broadcast ribbon */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-1.5 text-[0.66rem] tracking-wider text-[var(--dm-muted)]">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[var(--dm-gold)]">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[var(--dm-gold)]" />
            WAR ROOM STRATEGIC LINK
          </span>
          <span className="hidden text-[var(--dm-edge)] sm:inline">|</span>
          <span className="hidden truncate font-mono sm:inline text-white/70">
            NETWORK INFILTRATION: 100/100 · HYPERSONIC MISSILE READY · SECTOR 4G
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={toggleSound}
            className={`flex items-center gap-1.5 rounded border px-2.5 py-0.5 font-mono text-[0.65rem] transition-all ${
              audioActive
                ? 'border-[var(--dm-gold)] bg-[rgba(217,182,111,0.18)] text-[var(--dm-gold)] shadow-[0_0_10px_rgba(217,182,111,0.3)]'
                : 'border-[var(--dm-edge)] text-[var(--dm-muted)] hover:border-[var(--dm-gold-dim)] hover:text-white'
            }`}
            title="Toggle Tactical Audio Sound Effects"
          >
            <span>{audioActive ? '🔊 TACTICAL AUDIO: ON' : '🔈 SFX: OFF (CLICK)'}</span>
          </button>
          <span className="rounded border border-[var(--dm-gold)]/40 bg-[rgba(217,182,111,0.12)] px-2 py-0.5 font-mono font-bold text-[var(--dm-gold)]">
            ALPHA 1.0.4
          </span>
        </div>
      </div>

      {/* Main RTS resource bar strip - mirroring actual in-game resources */}
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
            <p className="font-mono text-xs font-bold text-[var(--dm-ink)]">100k</p>
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
