'use client';

import { useState, useEffect } from 'react';
import { soundFX } from './DominionAudio';

interface LogEntry {
  id: string;
  time: string;
  unit: string;
  text: string;
  type: 'combat' | 'economy' | 'naval' | 'intel';
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: '1',
    time: '18:04:12',
    unit: '3rd Armored Div',
    text: 'פלוגת שריון M1A2 ביצעה ירי פגזי APFSDS לעבר שריון אויב בגזרה 4G. מטרה הושמדה.',
    type: 'combat',
  },
  {
    id: '2',
    time: '18:04:19',
    unit: 'Alpha Metropolis',
    text: 'רשת החשמל של עיר הבירה יציבה ב-100% תפוקה (100k MW). מגדלי הקירור פעילים.',
    type: 'economy',
  },
  {
    id: '3',
    time: '18:04:26',
    unit: 'Coastal Shipyard',
    text: 'מספנת החוף השלימה ייצור ספינת סיור מהירה. החל סיור הגנה סביב אסדות הנפט.',
    type: 'naval',
  },
  {
    id: '4',
    time: '18:04:32',
    unit: 'Air Defense Radar',
    text: 'מכ״ם הגנה אווירית זיהה כלי טיס לא מזוהה במרחב האווירי של האי. כוננות ירוט.',
    type: 'intel',
  },
  {
    id: '5',
    time: '18:04:40',
    unit: 'Colony Builders',
    text: 'הושלמה בניית חווה וסילו חיטה על משושה #142. אספקת המזון לתושבים עלתה.',
    type: 'economy',
  },
];

const POOL_OF_NEW_EVENTS: Omit<LogEntry, 'id' | 'time'>[] = [
  {
    unit: 'Artillery Battery B',
    text: 'סוללת תומ״תים 155 מ״מ הנחיתה מכת אש מרוכזת על מוצב אויב. עשן כבד בשטח.',
    type: 'combat',
  },
  {
    unit: 'Research Lab',
    text: 'הושלם מחקר חומרים מרוכבים. שריון הטנקים שודרג ב-15% עמידות לרתע.',
    type: 'intel',
  },
  {
    unit: 'Offshore Platform',
    text: 'אסדת הנפט במימי החוף הזרימה 420 חביות נפט גולמי למיכלי האחסון הלאומיים.',
    type: 'economy',
  },
  {
    unit: 'Strategic Silo',
    text: 'מערכת הטילים ההיפרסוניים ביצעה איפוס קואורדינטות טלמטריות תקין.',
    type: 'combat',
  },
  {
    unit: 'Scout Recon Unit',
    text: 'רכב סיור חשף מאגר אורניום טבעי ברכס המשושים המזרחי. הטריטוריה סופחה.',
    type: 'intel',
  },
];

export function DominionLiveFeed() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'combat' | 'economy' | 'naval'>('all');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = [
        String(now.getHours()).padStart(2, '0'),
        String(now.getMinutes()).padStart(2, '0'),
        String(now.getSeconds()).padStart(2, '0'),
      ].join(':');

      const randomEvent = POOL_OF_NEW_EVENTS[Math.floor(Math.random() * POOL_OF_NEW_EVENTS.length)];
      const newEntry: LogEntry = {
        id: Math.random().toString(36).slice(2, 9),
        time: timeStr,
        ...randomEvent,
      };

      setLogs((prev) => [newEntry, ...prev.slice(0, 7)]);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const triggerManualEvent = (type: 'salvo' | 'radar' | 'intel') => {
    const now = new Date();
    const timeStr = [
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0'),
    ].join(':');

    if (type === 'salvo') {
      soundFX.playArtilleryBlast();
      const manualEntry: LogEntry = {
        id: Math.random().toString(36).slice(2, 9),
        time: timeStr,
        unit: 'Tactical Salvo (Player)',
        text: 'מטח ארטילריה יזום שוגר! פיצוצים מרובים נרשמו בקווי החזית.',
        type: 'combat',
      };
      setLogs((prev) => [manualEntry, ...prev.slice(0, 7)]);
    } else if (type === 'radar') {
      soundFX.playSonarPing();
      const manualEntry: LogEntry = {
        id: Math.random().toString(36).slice(2, 9),
        time: timeStr,
        unit: 'Tactical Radar (Player)',
        text: 'סריקת מכ״ם מלאה הופעלה. כל גבולות המשושים והיחידות באזור סומנו.',
        type: 'intel',
      };
      setLogs((prev) => [manualEntry, ...prev.slice(0, 7)]);
    } else {
      soundFX.playTargetLock();
      const manualEntry: LogEntry = {
        id: Math.random().toString(36).slice(2, 9),
        time: timeStr,
        unit: 'Satellite Link',
        text: 'נעילת לוויין על אזור המטרופולין. שידור נתונים חי מוזרם למרכז הבקרה.',
        type: 'intel',
      };
      setLogs((prev) => [manualEntry, ...prev.slice(0, 7)]);
    }
  };

  const filteredLogs = activeFilter === 'all' ? logs : logs.filter((l) => l.type === activeFilter);

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--dm-edge)] bg-[rgba(5,13,24,0.95)] shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--dm-edge)] bg-[rgba(8,18,31,0.9)] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[var(--dm-green)]">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[var(--dm-green)]" />
          </span>
          <div>
            <h3 className="dm-serif text-sm font-bold uppercase tracking-wider text-[var(--dm-gold)]">
              משדר אירועים וקרבות חיים · Live Battlefield Feed
            </h3>
            <p className="font-mono text-[0.62rem] text-[var(--dm-muted)]">
              REAL-TIME RTS TELEMETRY LOG · AUTO-SYNCING SECTORS
            </p>
          </div>
        </div>

        {/* Action Buttons to interact live */}
        <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-0">
          <button
            type="button"
            onClick={() => triggerManualEvent('salvo')}
            className="flex items-center gap-1 rounded border border-[var(--dm-red)]/50 bg-[rgba(255,138,115,0.12)] px-2.5 py-1 font-mono text-[0.65rem] font-bold text-[var(--dm-red)] hover:bg-[rgba(255,138,115,0.25)] active:scale-95 transition-all"
          >
            <span>💥 מכת אש</span>
          </button>
          <button
            type="button"
            onClick={() => triggerManualEvent('radar')}
            className="flex items-center gap-1 rounded border border-[var(--dm-blue)]/50 bg-[rgba(111,176,255,0.12)] px-2.5 py-1 font-mono text-[0.65rem] font-bold text-[var(--dm-blue)] hover:bg-[rgba(111,176,255,0.25)] active:scale-95 transition-all"
          >
            <span>📡 סריקת מכ״ם</span>
          </button>
          <button
            type="button"
            onClick={() => triggerManualEvent('intel')}
            className="flex items-center gap-1 rounded border border-[var(--dm-gold)]/50 bg-[rgba(217,182,111,0.12)] px-2.5 py-1 font-mono text-[0.65rem] font-bold text-[var(--dm-gold)] hover:bg-[rgba(217,182,111,0.25)] active:scale-95 transition-all"
          >
            <span>🛰️ קשר לוויין</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-[var(--dm-edge)]/50 bg-[rgba(8,18,31,0.5)] px-4 py-1.5 text-xs font-mono">
        <span className="text-[var(--dm-muted)] py-0.5 ml-3">סינון:</span>
        {(['all', 'combat', 'economy', 'naval'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              soundFX.playTacticalBeep(900);
              setActiveFilter(f);
            }}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              activeFilter === f
                ? 'bg-[var(--dm-gold)] text-black font-bold'
                : 'text-[var(--dm-muted)] hover:text-white'
            }`}
          >
            {f === 'all' ? 'הכל' : f === 'combat' ? '⚔️ לחימה' : f === 'economy' ? '🏛️ כלכלה' : '⚓ צי ימי'}
          </button>
        ))}
      </div>

      {/* Logs List */}
      <div className="divide-y divide-[var(--dm-edge)]/40 p-2 sm:p-4 font-mono text-xs max-h-[300px] overflow-y-auto">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-3 py-2 px-2.5 transition-colors hover:bg-white/[0.02]"
          >
            <span className="shrink-0 text-[0.68rem] text-[var(--dm-muted)] font-mono">
              [{log.time}]
            </span>

            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[0.62rem] font-bold uppercase ${
                log.type === 'combat'
                  ? 'border border-[var(--dm-red)]/40 bg-[rgba(255,138,115,0.15)] text-[var(--dm-red)]'
                  : log.type === 'economy'
                  ? 'border border-[var(--dm-gold)]/40 bg-[rgba(217,182,111,0.15)] text-[var(--dm-gold)]'
                  : log.type === 'naval'
                  ? 'border border-[var(--dm-blue)]/40 bg-[rgba(111,176,255,0.15)] text-[var(--dm-blue)]'
                  : 'border border-[var(--dm-green)]/40 bg-[rgba(74,222,128,0.15)] text-[var(--dm-green)]'
              }`}
            >
              {log.unit}
            </span>

            <p className="min-w-0 flex-1 text-[0.75rem] text-[var(--dm-ink)] leading-snug">
              {log.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
