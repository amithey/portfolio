'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

/**
 * Sticky header: current page picks up the signal colour and an underline, and
 * below the sm breakpoint the nav collapses behind a menu button instead of
 * wrapping onto a second line. A client component for exactly two reasons —
 * knowing the current path and holding the menu's open/closed state — with
 * everything else about the site staying server-rendered.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // A route change (including a same-page anchor) always closes the menu.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string) =>
    `relative py-1 transition-colors ${
      isActive(href)
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
              <li key={item.href}>
                <Link href={item.href} className={linkClass(item.href)} aria-current={isActive(item.href) ? 'page' : undefined}>
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
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block py-2.5 ${isActive(item.href) ? 'font-semibold text-signal' : 'text-muted'}`}
                aria-current={isActive(item.href) ? 'page' : undefined}
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
