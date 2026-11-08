'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SHOTS, type Shot } from '@/data/dominion-showcase';
import { soundFX } from './DominionAudio';

export function DominionWarRoom() {
  const [selectedShot, setSelectedShot] = useState<Shot>(SHOTS[0]);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  const triggerAction = (type: 'missile' | 'air' | 'defcon') => {
    if (type === 'missile') {
      soundFX.playLaunchRumble();
      setActiveAlert('HYPERSONIC MISSILE LAUNCHED · TRAJECTORY EN-ROUTE TO TARGET SECTOR 4G');
    } else if (type === 'air') {
      soundFX.playTargetLock();
      setActiveAlert('CARRIER STRIKE WING SCRAMBLED · AIR PATROL COMMENCED');
    } else if (type === 'defcon') {
      soundFX.playSonarPing();
      setActiveAlert('DEFCON 1 PROTOCOL ENGAGED · FLEET & MISSILE SILOS AT MAXIMUM COMBAT ALERT');
    }

    setTimeout(() => {
      setActiveAlert(null);
    }, 4500);
  };

  return (
    <div className="dm-panel overflow-hidden border border-[var(--dm-gold)]/30 bg-[rgba(5,13,24,0.92)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
      {/* Top Console Command Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--dm-edge)] bg-[rgba(8,18,31,0.95)] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[var(--dm-gold)]/20">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[var(--dm-gold)]" />
          </span>
          <div>
            <h3 className="dm-serif text-sm font-bold uppercase tracking-wider text-[var(--dm-gold)] sm:text-base">
              Live Battlefield Command Console
            </h3>
            <p className="font-mono text-[0.65rem] text-[var(--dm-muted)]">
              DIRECT FEED · ALPHA 1.0.4 CLIENT (GODOT NATIVE)
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-0">
          <button
            type="button"
            onClick={() => triggerAction('missile')}
            className="flex items-center gap-1.5 rounded border border-[var(--dm-red)]/50 bg-[rgba(255,138,115,0.1)] px-3 py-1 font-mono text-[0.7rem] font-bold text-[var(--dm-red)] transition-all hover:border-[var(--dm-red)] hover:bg-[rgba(255,138,115,0.22)] active:scale-95"
          >
            <span>🚀</span>
            <span>LAUNCH MISSILE</span>
          </button>
          <button
            type="button"
            onClick={() => triggerAction('air')}
            className="flex items-center gap-1.5 rounded border border-[var(--dm-blue)]/50 bg-[rgba(111,176,255,0.1)] px-3 py-1 font-mono text-[0.7rem] font-bold text-[var(--dm-blue)] transition-all hover:border-[var(--dm-blue)] hover:bg-[rgba(111,176,255,0.22)] active:scale-95"
          >
            <span>✈️</span>
            <span>AIR STRIKE</span>
          </button>
          <button
            type="button"
            onClick={() => triggerAction('defcon')}
            className="flex items-center gap-1.5 rounded border border-[var(--dm-gold)]/50 bg-[rgba(217,182,111,0.1)] px-3 py-1 font-mono text-[0.7rem] font-bold text-[var(--dm-gold)] transition-all hover:border-[var(--dm-gold)] hover:bg-[rgba(217,182,111,0.22)] active:scale-95"
          >
            <span>🛡️</span>
            <span>DEFCON 1</span>
          </button>
        </div>
      </div>

      {/* Alert banner when action is triggered */}
      {activeAlert && (
        <div className="border-b border-[var(--dm-gold)]/40 bg-[rgba(217,182,111,0.15)] px-4 py-2 font-mono text-xs text-[var(--dm-gold)] animate-pulse flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>⚠</span>
            <span>{activeAlert}</span>
          </span>
          <span className="text-[0.65rem] text-[var(--dm-muted)]">[CONFIRMED]</span>
        </div>
      )}

      {/* Main Screen Display */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60 sm:aspect-[16/10]">
        <Image
          src={selectedShot.src}
          alt={selectedShot.alt}
          fill
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover transition-opacity duration-300"
        />

        {/* Scanlines overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(18, 42, 71, 0) 50%, rgba(0, 0, 0, 0.7) 50%)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Tactical HUD overlays on top of the image */}
        <div className="pointer-events-none absolute left-4 top-4 rounded border border-[var(--dm-edge)] bg-[rgba(8,18,31,0.85)] px-3 py-1.5 font-mono text-[0.68rem] text-[var(--dm-gold)]">
          <p className="font-bold">{selectedShot.title.toUpperCase()}</p>
          <p className="text-[0.6rem] text-[var(--dm-muted)]">CAM RES: {selectedShot.width} × {selectedShot.height}px</p>
        </div>

        <div className="pointer-events-none absolute right-4 bottom-4 rounded border border-[var(--dm-edge)] bg-[rgba(8,18,31,0.85)] px-3 py-1.5 font-mono text-[0.65rem] text-[var(--dm-green)]">
          <span>● LIVE CAMERA FEED</span>
        </div>
      </div>

      {/* Tactical Feed Selector Thumbnails */}
      <div className="border-t border-[var(--dm-edge)] bg-[rgba(6,14,24,0.95)] p-4 sm:p-5">
        <p className="font-mono text-xs uppercase tracking-wider text-[var(--dm-gold)]">
          Select Tactical Surveillance Sector:
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {SHOTS.map((shot, idx) => {
            const isSelected = selectedShot.src === shot.src;
            return (
              <button
                key={shot.src}
                type="button"
                onClick={() => {
                  soundFX.playTacticalBeep(700 + idx * 80);
                  setSelectedShot(shot);
                }}
                className={`group relative flex flex-col overflow-hidden rounded border text-left transition-all ${
                  isSelected
                    ? 'border-[var(--dm-gold)] bg-[rgba(217,182,111,0.12)] shadow-[0_0_12px_rgba(217,182,111,0.3)]'
                    : 'border-[var(--dm-edge)] bg-[rgba(10,22,38,0.6)] opacity-70 hover:border-[var(--dm-gold-dim)] hover:opacity-100'
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {shot.badge && (
                    <span className="absolute left-1.5 top-1.5 rounded bg-[rgba(8,18,31,0.85)] px-1.5 py-0.5 font-mono text-[0.55rem] font-bold text-[var(--dm-gold)]">
                      {shot.badge}
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <p className="truncate font-mono text-[0.68rem] font-bold text-[var(--dm-ink)]">
                    {shot.title}
                  </p>
                  <p className="truncate text-[0.6rem] text-[var(--dm-muted)]">
                    Feed #{String(idx + 1).padStart(2, '0')}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
