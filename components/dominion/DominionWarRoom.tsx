'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SHOTS, type Shot } from '@/data/dominion-showcase';
import { soundFX } from './DominionAudio';

export function DominionWarRoom() {
  const [selectedShot, setSelectedShot] = useState<Shot>(SHOTS[0]);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
    <>
      <div className="dm-panel overflow-hidden border border-[var(--dm-gold)]/35 bg-[rgba(5,13,24,0.95)] shadow-[0_25px_70px_-20px_rgba(0,0,0,0.95)]">
        {/* Top Console Command Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--dm-edge)] bg-[rgba(8,18,31,0.95)] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[var(--dm-gold)]/20">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[var(--dm-gold)]" />
            </span>
            <div>
              <h3 className="dm-serif text-sm font-bold uppercase tracking-wider text-[var(--dm-gold)] sm:text-base">
                Interactive Battlefield Surveillance
              </h3>
              <p className="font-mono text-[0.65rem] text-[var(--dm-muted)]">
                GODOT 4 NATIVE ENGINE · DIRECT HIGH-RES FEED
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-0">
            <button
              type="button"
              onClick={() => triggerAction('missile')}
              className="flex items-center gap-1.5 rounded border border-[var(--dm-red)]/50 bg-[rgba(255,138,115,0.12)] px-3 py-1.5 font-mono text-[0.7rem] font-bold text-[var(--dm-red)] transition-all hover:border-[var(--dm-red)] hover:bg-[rgba(255,138,115,0.25)] active:scale-95"
            >
              <span>🚀</span>
              <span>LAUNCH MISSILE</span>
            </button>
            <button
              type="button"
              onClick={() => triggerAction('air')}
              className="flex items-center gap-1.5 rounded border border-[var(--dm-blue)]/50 bg-[rgba(111,176,255,0.12)] px-3 py-1.5 font-mono text-[0.7rem] font-bold text-[var(--dm-blue)] transition-all hover:border-[var(--dm-blue)] hover:bg-[rgba(111,176,255,0.25)] active:scale-95"
            >
              <span>✈️</span>
              <span>AIR STRIKE</span>
            </button>
            <button
              type="button"
              onClick={() => triggerAction('defcon')}
              className="flex items-center gap-1.5 rounded border border-[var(--dm-gold)]/50 bg-[rgba(217,182,111,0.12)] px-3 py-1.5 font-mono text-[0.7rem] font-bold text-[var(--dm-gold)] transition-all hover:border-[var(--dm-gold)] hover:bg-[rgba(217,182,111,0.25)] active:scale-95"
            >
              <span>🛡️</span>
              <span>DEFCON 1</span>
            </button>
          </div>
        </div>

        {/* Alert banner when action is triggered */}
        {activeAlert && (
          <div className="flex items-center justify-between border-b border-[var(--dm-gold)]/40 bg-[rgba(217,182,111,0.16)] px-4 py-2 font-mono text-xs text-[var(--dm-gold)] animate-pulse">
            <span className="flex items-center gap-2">
              <span>⚠</span>
              <span>{activeAlert}</span>
            </span>
            <span className="text-[0.65rem] text-[var(--dm-muted)]">[CONFIRMED]</span>
          </div>
        )}

        {/* Main Screen Display with Zoom on Click */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            soundFX.playTacticalBeep(1100);
            setLightboxOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setLightboxOpen(true);
          }}
          className="group relative aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-black/80 sm:aspect-[16/10]"
          title="Click to expand high-res screenshot view"
        >
          <Image
            src={selectedShot.src}
            alt={selectedShot.alt}
            fill
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* CRT scanline effect */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 42, 71, 0) 50%, rgba(0, 0, 0, 0.7) 50%)',
              backgroundSize: '100% 4px',
            }}
          />

          {/* Tactical overlays */}
          <div className="pointer-events-none absolute left-4 top-4 rounded border border-[var(--dm-edge)] bg-[rgba(8,18,31,0.9)] px-3 py-1.5 font-mono text-[0.7rem] text-[var(--dm-gold)]">
            <p className="font-bold">{selectedShot.title.toUpperCase()}</p>
            <p className="text-[0.6rem] text-[var(--dm-muted)]">
              RES: {selectedShot.width} × {selectedShot.height}px · CLICK TO ENLARGE
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between rounded border border-[var(--dm-edge)]/60 bg-[rgba(8,18,31,0.85)] px-3 py-2 font-mono text-[0.68rem] text-[var(--dm-ink)]">
            <p className="truncate text-[var(--dm-muted)]">{selectedShot.caption}</p>
            <span className="shrink-0 text-[var(--dm-gold)] flex items-center gap-1 font-bold">
              <span>🔍 FULLSCREEN</span>
            </span>
          </div>

          <div className="pointer-events-none absolute right-4 top-4 rounded border border-[var(--dm-edge)] bg-[rgba(8,18,31,0.9)] px-3 py-1 font-mono text-[0.65rem] text-[var(--dm-green)]">
            <span>● LIVE RECON</span>
          </div>
        </div>

        {/* Tactical Feed Selector Thumbnails */}
        <div className="border-t border-[var(--dm-edge)] bg-[rgba(6,14,24,0.95)] p-4 sm:p-5">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--dm-gold)]">
            Select Surveillance Camera Feed (5 Sectors):
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
                      ? 'border-[var(--dm-gold)] bg-[rgba(217,182,111,0.14)] shadow-[0_0_14px_rgba(217,182,111,0.35)]'
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
                      <span className="absolute left-1.5 top-1.5 rounded bg-[rgba(8,18,31,0.9)] px-1.5 py-0.5 font-mono text-[0.55rem] font-bold text-[var(--dm-gold)]">
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

      {/* Fullscreen Modal Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[92vh] max-w-[94vw] overflow-hidden rounded-lg border border-[var(--dm-gold)]/60 bg-[rgba(8,18,31,0.95)] p-2">
            <div className="flex items-center justify-between border-b border-[var(--dm-edge)] px-4 py-2.5">
              <div>
                <p className="dm-serif text-sm font-bold text-[var(--dm-gold)] sm:text-base">
                  {selectedShot.title}
                </p>
                <p className="font-mono text-[0.65rem] text-[var(--dm-muted)]">
                  Native 3D Capture · {selectedShot.width} × {selectedShot.height}px
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="rounded border border-[var(--dm-edge)] bg-[rgba(10,22,38,0.8)] px-3 py-1 font-mono text-xs font-bold text-[var(--dm-gold)] hover:border-[var(--dm-gold)] hover:bg-[rgba(217,182,111,0.15)]"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="relative h-[75vh] w-[88vw] overflow-hidden">
              <Image
                src={selectedShot.src}
                alt={selectedShot.alt}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </div>

            <div className="border-t border-[var(--dm-edge)] px-4 py-2 text-center font-mono text-xs text-[var(--dm-muted)]">
              {selectedShot.caption}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
