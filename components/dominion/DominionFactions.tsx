'use client';

import { useState } from 'react';
import { soundFX } from './DominionAudio';

interface Faction {
  id: string;
  name: string;
  flag: string;
  mbt: string;
  specialPower: string;
  doctrine: string;
  stats: {
    firepower: number;
    armor: number;
    mobility: number;
    technology: number;
  };
  units: string[];
}

const FACTIONS: Faction[] = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    mbt: 'M1A2 SEPv3 Abrams',
    specialPower: 'Carrier Strike Wing & Satellite Network',
    doctrine: 'Global expeditionary force with air superiority, standoff hypersonic precision, and orbital recon.',
    stats: { firepower: 96, armor: 92, mobility: 78, technology: 98 },
    units: ['M1A2 Abrams', 'M2A4 Bradley', 'Nimitz Carrier', 'Hypersonic Silo', 'Avenger Air Defense'],
  },
  {
    id: 'eu',
    name: 'European Union',
    flag: '🇪🇺',
    mbt: 'Leopard 2A7+',
    specialPower: 'Multi-Mesh Energy & Defensive Alliance',
    doctrine: 'Interlocking multinational armor divisions, wheeled CAESAR self-propelled howitzers, and green power grid.',
    stats: { firepower: 90, armor: 94, mobility: 84, technology: 92 },
    units: ['Leopard 2A7', 'CAESAR Howitzer', 'Boxer IFV', 'Offshore Wind Farm', 'Eurofighter Typhoon'],
  },
  {
    id: 'israel',
    name: 'Regional Vanguard',
    flag: '🇮🇱',
    mbt: 'Merkava Mk 4M Trophy',
    specialPower: 'Iron Dome & Active Protection System (APS)',
    doctrine: 'Dense urban defense, reactive armor with automated hard-kill interceptors, and fortified hex silos.',
    stats: { firepower: 94, armor: 98, mobility: 72, technology: 95 },
    units: ['Merkava Mk 4M', 'Namer Heavy APC', 'Iron Dome Battery', 'Hermes Drone Wing', 'Hardened Silo'],
  },
  {
    id: 'sk',
    name: 'Republic of Korea',
    flag: '🇰🇷',
    mbt: 'K2 Black Panther',
    specialPower: 'Rapid Arms Export & Industrial Mobilization',
    doctrine: 'High-speed automated hydropneumatic suspension tanks, rapid manufacturing, and automated rocket artillery.',
    stats: { firepower: 92, armor: 88, mobility: 95, technology: 94 },
    units: ['K2 Black Panther', 'K9 Thunder Howitzer', 'K21 Fighting Vehicle', 'Cheongung-II SAM', 'Industrial Mega-Plant'],
  },
];

export function DominionFactions() {
  const [activeFaction, setActiveFaction] = useState<Faction>(FACTIONS[0]);

  const selectFaction = (f: Faction) => {
    soundFX.playTacticalBeep(850);
    setActiveFaction(f);
  };

  return (
    <div className="dm-panel overflow-hidden border border-[var(--dm-edge)] bg-[rgba(6,14,24,0.95)]">
      {/* Top Selector Ribbon */}
      <div className="flex border-b border-[var(--dm-edge)] bg-[rgba(10,22,38,0.85)]">
        {FACTIONS.map((f) => {
          const isSelected = f.id === activeFaction.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => selectFaction(f)}
              className={`flex flex-1 items-center justify-center gap-2 px-3 py-3 font-mono text-xs font-bold transition-all sm:text-sm ${
                isSelected
                  ? 'border-b-2 border-[var(--dm-gold)] bg-[rgba(217,182,111,0.14)] text-[var(--dm-gold)] shadow-[inset_0_-2px_0_var(--dm-gold)]'
                  : 'text-[var(--dm-muted)] hover:bg-[rgba(255,255,255,0.03)] hover:text-white'
              }`}
            >
              <span className="text-base">{f.flag}</span>
              <span className="hidden sm:inline">{f.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Dossier Content */}
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{activeFaction.flag}</span>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--dm-gold)]">
                National Doctrine Dossier
              </p>
              <h4 className="dm-serif text-2xl font-bold uppercase text-[var(--dm-ink)] sm:text-3xl">
                {activeFaction.name}
              </h4>
            </div>
          </div>

          <div className="mt-4 rounded border border-[var(--dm-edge)] bg-[rgba(8,18,31,0.6)] p-4">
            <p className="font-mono text-xs uppercase text-[var(--dm-muted)]">Signature National Lever / Power</p>
            <p className="mt-1 font-mono text-sm font-bold text-[var(--dm-gold)] sm:text-base">
              ⚡ {activeFaction.specialPower}
            </p>
          </div>

          <p className="mt-4 leading-relaxed text-[var(--dm-muted)]">{activeFaction.doctrine}</p>

          {/* Roster of 3D Modelled Units */}
          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--dm-gold)]">
              Documented National Arsenal (In-Game 3D Models):
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {activeFaction.units.map((u) => (
                <span
                  key={u}
                  className="rounded border border-[var(--dm-edge)] bg-[rgba(10,22,38,0.8)] px-2.5 py-1 font-mono text-xs text-[var(--dm-ink)]"
                >
                  ⚙ {u}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Combat Attribute Radar / Progress Bars */}
        <div className="flex flex-col justify-center rounded-lg border border-[var(--dm-edge)] bg-[rgba(8,18,31,0.7)] p-6">
          <div className="flex items-center justify-between border-b border-[var(--dm-edge)] pb-3">
            <span className="dm-serif text-sm font-bold uppercase text-[var(--dm-gold)]">
              Main Battle Tank
            </span>
            <span className="rounded bg-[var(--dm-gold)]/10 px-2 py-0.5 font-mono text-xs font-bold text-[var(--dm-gold)]">
              {activeFaction.mbt}
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-[var(--dm-muted)]">Firepower Rating</span>
                <span className="font-bold text-[var(--dm-gold)]">{activeFaction.stats.firepower}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[var(--dm-edge)]/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--dm-gold-dim)] to-[var(--dm-gold)] transition-all duration-500"
                  style={{ width: `${activeFaction.stats.firepower}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-[var(--dm-muted)]">Armour Protection</span>
                <span className="font-bold text-[var(--dm-blue)]">{activeFaction.stats.armor}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[var(--dm-edge)]/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-[var(--dm-blue)] transition-all duration-500"
                  style={{ width: `${activeFaction.stats.armor}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-[var(--dm-muted)]">Mobility &amp; Speed</span>
                <span className="font-bold text-[var(--dm-green)]">{activeFaction.stats.mobility}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[var(--dm-edge)]/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-[var(--dm-green)] transition-all duration-500"
                  style={{ width: `${activeFaction.stats.mobility}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-[var(--dm-muted)]">Tech &amp; Active Systems</span>
                <span className="font-bold text-amber-400">{activeFaction.stats.technology}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[var(--dm-edge)]/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
                  style={{ width: `${activeFaction.stats.technology}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
