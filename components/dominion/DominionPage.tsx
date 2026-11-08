'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cinzel } from 'next/font/google';
import type { Project } from '@/data/projects';
import {
  HERO_SHOT,
  HERO_STATS,
  KNOWN_ISSUES,
  SCREENSHOT_NOTE,
  WHATS_NEW,
} from '@/data/dominion-showcase';
import { Reveal } from '@/components/Reveal';
import { DominionHUD } from './DominionHUD';
import { DominionBackdrop, type DominionSeason } from './DominionBackdrop';
import { DominionGameplayLoop } from './DominionGameplayLoop';
import { DominionWarRoom } from './DominionWarRoom';
import { DominionLiveFeed } from './DominionLiveFeed';
import { DominionFactions } from './DominionFactions';
import { soundFX } from './DominionAudio';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['600', '700'],
  display: 'swap',
});

const MENU = [
  { href: '#loop', label: 'איך המשחק עובד' },
  { href: '#recon', label: 'צילומי מסך מהמשחק' },
  { href: '#livefeed', label: 'משדר קרב חי' },
  { href: '#factions', label: 'צבאות ושריון' },
  { href: '#download', label: 'הורדת Alpha 1.0.4' },
];

function Head({ tag, title, children }: { tag: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 bg-[var(--dm-gold)]" />
        <p className="dm-serif dm-gold text-xs uppercase tracking-wider">{tag}</p>
      </div>
      <h2 className="dm-serif mt-2 text-2xl font-bold uppercase sm:text-3xl lg:text-4xl text-[var(--dm-ink)]">
        {title}
      </h2>
      <div className="dm-rule mt-3 w-32" />
      {children && <p className="dm-muted mt-3 text-base leading-relaxed sm:text-lg">{children}</p>}
    </div>
  );
}

export function DominionPage({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project;
  next?: Project;
}) {
  const downloadUrl = project.demo.url;
  const [season, setSeason] = useState<DominionSeason>('spring');

  return (
    <article className={`dm ${cinzel.variable}`}>
      {/* Top RTS in-game resource & weather status strip */}
      <DominionHUD season={season} onSeasonChange={setSeason} />

      {/* ───────── Hero: Strategic War Room ───────── */}
      <header className="relative isolate overflow-hidden">
        {/* Background battlefield terrain - Real combat screenshot */}
        <Image
          src={HERO_SHOT.src}
          alt={HERO_SHOT.alt}
          fill
          priority
          sizes="100vw"
          className="pointer-events-none -z-30 object-cover object-center brightness-[0.45] contrast-[1.2]"
        />

        {/* Animated tactical hex radar & artillery tracers with weather support */}
        <DominionBackdrop season={season} />

        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,13,24,0.65)_0%,rgba(5,13,24,0.85)_60%,var(--dm-bg)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-5 pb-16 pt-8 sm:pb-24 sm:pt-12">
          {/* Breadcrumb & status */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="dm-serif dm-gold text-xs uppercase sm:text-sm">
              <Link href="/projects" className="hover:underline">
                Projects
              </Link>
              {' / '}Games &amp; Interactive
            </p>

            <div className="flex items-center gap-2">
              <span className="dm-tag">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--dm-green)]" />
                GODOT 4 NATIVE CLIENT
              </span>
              <span className="dm-tag hidden sm:inline-flex">
                MULTI-MESH 60 FPS
              </span>
            </div>
          </div>

          {/* Hero Command Box */}
          <div className="dm-tactical-box mt-6 border border-[var(--dm-edge)] bg-[rgba(6,15,26,0.8)] p-6 backdrop-blur-md sm:p-10 shadow-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="dm-serif text-xs uppercase tracking-[0.25em] text-[var(--dm-gold)]">
                ✦ STRATEGIC 3D WARFARE
              </span>
              <span className="text-[var(--dm-edge)]">·</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--dm-muted)]">
                Alpha 1.0.4 Windows Build
              </span>
            </div>

            <h1 className="dm-serif dm-title-gold mt-3 text-5xl font-bold uppercase leading-none tracking-wider sm:text-7xl lg:text-8xl">
              Dominion
            </h1>
            <div className="dm-rule mt-4 w-44" />

            <p className="mt-4 max-w-2xl text-lg font-medium leading-snug text-[var(--dm-ink)] sm:text-2xl">
              משחק אסטרטגיה ומלחמה בזמן אמת בתלת-ממד שנבנה ב-Godot Engine
            </p>
            <p className="dm-muted mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
              הקם עיר בירה על מפת משושים, פתח טכנולוגיות לאורך עידנים, פקד על 27 דגמי טנקים מודרניים, ספינות קרב לאורך קווי החוף וסילו טילים — וכבוש את האי מול בינה מלאכותית תוקפנית.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  onClick={() => soundFX.playLaunchRumble()}
                  className="dm-btn"
                >
                  הורד את המשחק ל-Windows (394 MB) <span aria-hidden="true">↓</span>
                </a>
              )}
              <a
                href="#recon"
                onClick={() => soundFX.playTacticalBeep()}
                className="dm-btn dm-btn-ghost"
              >
                צפה בצילומי המשחק <span aria-hidden="true">↓</span>
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => soundFX.playTacticalBeep()}
                className="dm-btn dm-btn-ghost hidden sm:inline-flex"
              >
                קוד מקור ב-GitHub <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Resource strip / stats */}
          <dl className="dm-resbar mt-8">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="dm-serif dm-gold block text-xl font-bold sm:text-2xl">
                    {stat.value}
                  </span>
                  <span className="dm-muted mt-0.5 block text-xs leading-snug sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* The game's top menu, as quick page navigation */}
      <div className="sticky top-[69px] z-30 mx-auto max-w-5xl px-5 py-2.5 sm:top-[56px]">
        <nav aria-label="On this page" className="dm-menu">
          {MENU.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => soundFX.playTacticalBeep(900)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-5xl space-y-20 px-5 pb-24 pt-8 sm:space-y-24">
        {/* ───────── 1. CORE GAMEPLAY LOOP ───────── */}
        <section id="loop" className="scroll-mt-32">
          <Reveal>
            <Head tag="מהלך המשחק · Core Gameplay" title="איך המשחק עובד?">
              דומיניון משלב בין ניהול אימפריה במשושים (Hexes) לבין קרבות שריון וים בזמן אמת. המשחק מתקדם בשלושה שלבים מרכזיים:
            </Head>
          </Reveal>

          <div className="mt-8">
            <Reveal>
              <DominionGameplayLoop />
            </Reveal>
          </div>
        </section>

        {/* ───────── 2. TACTICAL RECON SCREENSHOTS ───────── */}
        <section id="recon" className="scroll-mt-32">
          <Reveal>
            <Head tag="מוקד צילומים · Tactical Recon" title="צילומי מסך מקוריים מתוך האלפא">
              עבור בין 5 מצלמות השטח למטה לצפייה ישירה בצילומים האותנטיים של גרסה 1.0.4. לחץ על כל תמונה להגדלה מלאה.
            </Head>
          </Reveal>

          <div className="mt-8">
            <Reveal>
              <DominionWarRoom />
            </Reveal>
          </div>
          <p className="dm-muted mt-4 font-mono text-xs">{SCREENSHOT_NOTE}</p>
        </section>

        {/* ───────── 3. LIVE BATTLEFIELD TELEMETRY ───────── */}
        <section id="livefeed" className="scroll-mt-32">
          <Reveal>
            <Head tag="מודיעין חי · Live Simulation" title="משדר קרב ואירועים חיים">
              סימולציה חיה של זירת הקרב: דיווחי שריון בזמן אמת, מצב רשת החשמל במטרופולין, תנועות ספינות והתקפות ארטילריה. לחץ על הכפתורים להפעלת אירועי שטח.
            </Head>
          </Reveal>

          <div className="mt-6">
            <Reveal>
              <DominionLiveFeed />
            </Reveal>
          </div>
        </section>

        {/* ───────── 4. FACTIONS & ARMOR ARSENAL ───────── */}
        <section id="factions" className="scroll-mt-32">
          <Reveal>
            <Head tag="דוקטרינות ושריון · Playable Nations" title="עמי הקמפיין וטנקי המערכה">
              לכל אומה טנקים אותנטיים ייחודיים (Abrams, Merkava, Leopard 2, K2), יכולות הגנה מיוחדות ודוקטרינת לחימה משלה.
            </Head>
          </Reveal>

          <div className="mt-8">
            <Reveal>
              <DominionFactions />
            </Reveal>
          </div>
        </section>

        {/* ───────── 5. DOWNLOAD & DISPATCHES ───────── */}
        <section id="download" className="scroll-mt-32">
          <Reveal>
            <div className="dm-panel p-8 sm:p-12">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-ping rounded-full bg-[var(--dm-gold)]" />
                <p className="dm-serif dm-gold text-sm uppercase">התקנה למחשב · Alpha 1.0.4 Windows</p>
              </div>
              <h2 className="dm-serif dm-title-gold mt-3 text-3xl font-bold uppercase sm:text-5xl">
                הורד ושחק ב-Dominion
              </h2>
              <div className="dm-rule mt-4 w-44" />
              <p className="dm-muted mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
                גרסת התקנה רשמית למחשב (Windows x64). התנסה במשחק האסטרטגיה והקרבות בזמן אמת בתלת-ממד מלא.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    onClick={() => soundFX.playLaunchRumble()}
                    className="dm-btn"
                  >
                    הורד את קובץ ההתקנה (394 MB) <span aria-hidden="true">↓</span>
                  </a>
                )}
                <a
                  href="https://github.com/amithey/dominion/releases/tag/v1.0.4-alpha"
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => soundFX.playTacticalBeep()}
                  className="dm-btn dm-btn-ghost"
                >
                  GitHub Release Notes <span aria-hidden="true">→</span>
                </a>
              </div>

              {/* What's New Bullet Points */}
              <div className="mt-10 border-t border-[var(--dm-edge)] pt-6">
                <p className="dm-serif dm-gold text-sm uppercase tracking-wider">
                  חידושים בגרסת {WHATS_NEW.version}:
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-[var(--dm-muted)]">
                  {WHATS_NEW.items.map((item) => (
                    <li key={item} className="flex gap-2.5 items-start">
                      <span className="text-[var(--dm-gold)] mt-0.5">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Known Issues */}
              <div className="mt-6 border-t border-[var(--dm-edge)]/60 pt-4">
                <ul className="space-y-2">
                  {KNOWN_ISSUES.map((issue) => (
                    <li key={issue} className="dm-muted flex gap-2.5 text-xs leading-relaxed text-[var(--dm-muted)]">
                      <span aria-hidden="true" className="text-[var(--dm-gold)]">
                        ℹ
                      </span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ───────── Navigation between projects ───────── */}
        <nav aria-label="Other projects" className="flex justify-between gap-6 border-t border-[var(--dm-edge)] pt-8 text-sm">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group max-w-[45%]">
              <span className="dm-serif dm-muted text-xs uppercase">← הפרויקט הקודם</span>
              <span className="mt-1 block font-semibold group-hover:text-[var(--dm-gold)]">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="group max-w-[45%] text-left">
              <span className="dm-serif dm-muted text-xs uppercase">הפרויקט הבא →</span>
              <span className="mt-1 block font-semibold group-hover:text-[var(--dm-gold)]">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
