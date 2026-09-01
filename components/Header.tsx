'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

/**
 * The site is one scrolling page, so the nav points at sections rather than
 * at separate routes. Hrefs are written as `/#id`, not bare `#id`, so the
 * same link works from a project detail page — it returns to the homepage
 * and lands on the section instead of hunting for an anchor that isn't
 * there.
 */
const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Sticky header with scroll-spy.
 *
 * The active tab is the last section whose top has passed just under the
 * header — scanning three rects, throttled to one animation frame per scroll
 * burst.
 *
 * This started as an IntersectionObserver and got it wrong: with sections
 * this tall, several are inside any sensible root band at once, and the
 * callback receives them in an order that is *not* document order, so
 * "whichever intersecting entry came last" pinned the highlight to whatever
 * happened to be reported last. Comparing positions directly has one answer
 * by construction.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // A route change (including a same-page anchor) always closes the menu.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    // Sections only exist on the homepage; elsewhere nothing is highlighted.
    if (pathname !== '/') {
      setActive(null);
      return;
    }

    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    // A little below the header, so a section counts as current only once
    // its heading is genuinely in view rather than grazing the bar.
    const LINE = 120;
    let frame = 0;

    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= LINE) current = el.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      // Coalesce a burst of scroll events into a single measurement.
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  const linkClass = (id: string) =>
    `relative py-1 transition-colors ${
      active === id
        ? "text-signal after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-signal after:content-['']"
        : 'text-muted hover:text-signal'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <Link
          href="/"
          className="font-display text-[0.95rem] font-bold tracking-tight hover:text-signal"
        >
          {SITE.name}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden sm:block">
          <ul className="flex items-center gap-6 text-sm">
            {NAV.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  className={linkClass(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={SITE.github}
                className="text-muted hover:text-signal"
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface-muted sm:hidden"
        >
          <span className="relative block h-3.5 w-4.5" aria-hidden>
            <span
              className={`absolute left-0 top-0 h-0.5 w-4.5 bg-current transition-transform duration-200 ${open ? 'translate-y-[6px] rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 top-[6px] h-0.5 w-4.5 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-4.5 bg-current transition-transform duration-200 ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile nav panel. max-height rather than the grid-rows 0fr/1fr trick:
          that trick only collapses a track when the grid container's own
          height is otherwise constrained — here it's auto, so a 0fr row still
          sizes to its content and never actually shrinks. */}
      <nav
        id="mobile-nav"
        aria-label="Main"
        className={`overflow-hidden border-t border-line transition-[max-height,opacity] duration-200 ease-out sm:hidden ${open ? 'max-h-60 opacity-100' : 'max-h-0 border-t-0 opacity-0'}`}
      >
        <ul className="px-5 py-2 text-sm">
          {NAV.map((item) => (
            <li key={item.id}>
              <Link
                href={`/#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block py-2.5 ${active === item.id ? 'font-semibold text-signal' : 'text-muted'}`}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={SITE.github}
              className="block py-2.5 text-muted"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
