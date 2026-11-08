'use client';

import { useState } from 'react';
import { soundFX } from './DominionAudio';

interface Era {
  id: string;
  name: string;
  year: string;
  icon: string;
  description: string;
  unlockedTechs: { title: string; category: string; description: string }[];
}

const ERAS: Era[] = [
  {
    id: 'founding',
    name: 'Founding Era',
    year: 'Settlement Year 1',
    icon: '🏛️',
    description: 'The foundation of the civilization: claim territory hexes, establish village centers, and secure coastline borders.',
    unlockedTechs: [
      { title: 'Colony Headquarters', category: 'Civil', description: 'Coordinates civil construction and initial worker deployment.' },
      { title: 'Coastline Shipyard', category: 'Naval', description: 'Required to touch open water; deploys basic scout cutters.' },
      { title: 'Territory Claim Poles', category: 'Expansion', description: 'Extends national boundaries onto adjoining hex tiles.' },
      { title: 'Mine Prospecting', category: 'Resources', description: 'Reveals iron, coal, gold, and mineral deposit nodes.' },
    ],
  },
  {
    id: 'industrial',
    name: 'Industrial Era',
    year: 'Heavy Steam & Steel',
    icon: '⚙️',
    description: 'Electrification, heavy machinery, and smokestack factories turning raw iron into armored machinery.',
    unlockedTechs: [
      { title: 'Industrial Factory', category: 'Production', description: 'Multi-story manufacturing with active smoke columns.' },
      { title: 'Rail Transit Grid', category: 'Logistics', description: 'Instantaneous heavy transport between established city hubs.' },
      { title: 'Coastal Fort & Gun Battery', category: 'Defense', description: 'Heavy caliber artillery denying enemy sea landings.' },
      { title: 'Steam Dredging', category: 'Offshore', description: 'Harvests offshore seabed gravel and shallow oil pockets.' },
    ],
  },
  {
    id: 'modern',
    name: 'Modern Era',
    year: 'Nuclear & Combined Arms',
    icon: '🛡️',
    description: 'Nation-specific armored warfare, real tank models, naval carrier battle groups, and the UN Security Council.',
    unlockedTechs: [
      { title: 'National MBT Arsenal', category: 'Armour', description: 'Unlocks 27 authentic main battle tanks (Abrams, Leopard, Merkava).' },
      { title: 'Nuclear Fission Plant', category: 'Energy', description: 'Generates up to 1,000 MW power grid with cooling towers.' },
      { title: 'UN Security Council Chamber', category: 'Diplomacy', description: 'Participate in global resolutions, sanctions, and arms embargoes.' },
      { title: 'Radar Early Warning Array', category: 'Intel', description: 'Sweeps ocean and air sectors to uncover cloaked hostiles.' },
    ],
  },
  {
    id: 'future',
    name: 'Future Era',
    year: 'Year 2 · Frontier Tech',
    icon: '🚀',
    description: 'Hypersonic standoff weapons, orbital telemetry, MultiMesh batched foliage, and strategic deterrence.',
    unlockedTechs: [
      { title: 'Hypersonic Missile Silo', category: 'Strategic', description: 'Ballistic & hypersonic precision strikes armed via in-game HUD.' },
      { title: 'Drone Swarm Wing', category: 'Autonomous', description: 'Loitering autonomous recon and surgical strike munitions.' },
      { title: 'MultiMesh Metropolis', category: 'Performance', description: 'Expansive dense cities with batched GPU grass and buildings.' },
      { title: 'Active Protection Interceptors', category: 'Defense', description: 'Automated hard-kill Trophy systems swatting incoming missiles.' },
    ],
  },
];

export function DominionTechTree() {
  const [activeEra, setActiveEra] = useState<Era>(ERAS[3]); // Default to Future Era as in the game screenshot!

  const selectEra = (era: Era) => {
    soundFX.playTacticalBeep(920);
    setActiveEra(era);
  };

  return (
    <div className="dm-panel overflow-hidden border border-[var(--dm-edge)] bg-[rgba(6,14,24,0.95)]">
      {/* Era Step Navigation */}
      <div className="grid grid-cols-2 border-b border-[var(--dm-edge)] sm:grid-cols-4">
        {ERAS.map((era) => {
          const isSelected = era.id === activeEra.id;
          return (
            <button
              key={era.id}
              type="button"
              onClick={() => selectEra(era)}
              className={`flex flex-col items-center gap-1.5 border-r border-[var(--dm-edge)] p-4 text-center transition-all ${
                isSelected
                  ? 'border-b-2 border-b-[var(--dm-gold)] bg-[rgba(217,182,111,0.15)] shadow-[inset_0_-2px_0_var(--dm-gold)]'
                  : 'bg-[rgba(10,22,38,0.5)] opacity-70 hover:opacity-100 hover:bg-[rgba(255,255,255,0.03)]'
              }`}
            >
              <span className="text-xl sm:text-2xl">{era.icon}</span>
              <span className="dm-serif text-xs font-bold uppercase tracking-wider text-[var(--dm-ink)] sm:text-sm">
                {era.name}
              </span>
              <span className="font-mono text-[0.62rem] text-[var(--dm-muted)]">{era.year}</span>
            </button>
          );
        })}
      </div>

      {/* Era Details & Tech Nodes */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--dm-edge)]/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeEra.icon}</span>
              <h4 className="dm-serif text-2xl font-bold uppercase text-[var(--dm-gold)]">
                {activeEra.name}
              </h4>
            </div>
            <p className="mt-1 text-sm text-[var(--dm-muted)]">{activeEra.description}</p>
          </div>
          <span className="rounded border border-[var(--dm-gold)]/40 bg-[rgba(217,182,111,0.1)] px-3 py-1 font-mono text-xs font-bold text-[var(--dm-gold)]">
            RESEARCH LEVEL: 100% UNLOCKED
          </span>
        </div>

        {/* 4 Unlocked Tech Nodes */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {activeEra.unlockedTechs.map((tech) => (
            <div
              key={tech.title}
              className="rounded-lg border border-[var(--dm-edge)] bg-[rgba(10,22,38,0.65)] p-4 transition-all hover:border-[var(--dm-gold-dim)] hover:bg-[rgba(10,22,38,0.85)]"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm font-bold text-[var(--dm-ink)]">{tech.title}</p>
                <span className="rounded bg-[var(--dm-edge)]/50 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-[var(--dm-gold)]">
                  {tech.category}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--dm-muted)]">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
