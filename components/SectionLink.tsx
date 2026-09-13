'use client';

import { usePathname, useRouter } from 'next/navigation';

/**
 * A link to a homepage section that scrolls there without writing `#id` into
 * the address bar.
 *
 * The hash is the whole problem this exists to avoid. A plain `/#contact`
 * link leaves the URL as `/#contact`, and phones keep that URL: reopen the
 * tab, reload, or come back from history, and the browser jumps straight to
 * the last section instead of starting at the top.
 *
 * The href stays `/#id` on purpose — it is what a long-press "open in new
 * tab" or a no-JS visitor gets — but an ordinary tap is intercepted:
 *
 *  - on the homepage, it scrolls to the section in place;
 *  - anywhere else, it navigates home with Next's own scroll handling turned
 *    off and leaves the section id for ScrollManager to pick up once the
 *    homepage has rendered.
 */

let pendingSection: string | null = null;

/** Hands the requested section to ScrollManager exactly once. */
export function consumePendingSection(): string | null {
  const id = pendingSection;
  pendingSection = null;
  return id;
}

export function scrollToSection(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export function SectionLink({
  id,
  className,
  children,
  onNavigate,
  'aria-current': ariaCurrent,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  /** Runs before scrolling — used by the mobile menu to close itself. */
  onNavigate?: () => void;
  'aria-current'?: 'true';
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <a
      href={`/#${id}`}
      className={className}
      aria-current={ariaCurrent}
      onClick={(e) => {
        // New-tab and other modified clicks keep their native behaviour.
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onNavigate?.();

        if (pathname === '/') {
          scrollToSection(id);
        } else {
          pendingSection = id;
          router.push('/', { scroll: false });
        }
      }}
    >
      {children}
    </a>
  );
}
