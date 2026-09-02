'use client';

import { useEffect, useState, type ElementType } from 'react';

/**
 * Fades content in as it scrolls into view.
 *
 * Starts shown and only hides itself once the observer is attached, so if the
 * JS never runs — or the browser lacks IntersectionObserver — the content is
 * visible rather than stranded at opacity 0. Each element is unobserved after
 * its first reveal; nothing re-animates on the way back up.
 *
 * `as` lets this wrap list items without inserting an illegal div between
 * ul/ol and li (or replacing the li itself).
 */
export function Reveal({
  children,
  delay = 0,
  dir = 'up',
  className = '',
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  /** Which side the content arrives from. Defaults to a plain fade-up. */
  dir?: 'up' | 'left' | 'right';
  className?: string;
  as?: 'div' | 'li';
}) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    setShown(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [el]);

  const Tag = as as ElementType;

  return (
    <Tag
      ref={setEl}
      className={`reveal ${className}`}
      data-shown={shown}
      data-dir={dir === 'up' ? undefined : dir}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}