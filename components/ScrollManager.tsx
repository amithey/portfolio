'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { consumePendingSection } from './SectionLink';

/**
 * Finishes a section link that started on another page.
 *
 * SectionLink navigates home with Next's scroll handling switched off and
 * leaves the section id behind. This lives in the root layout, so it
 * re-renders in the same commit as the new page — by the time the effect
 * runs, the section is in the DOM and can be scrolled to.
 */
export function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;
    const id = consumePendingSection();
    // 'instant', not 'auto': 'auto' defers to the CSS, and html has
    // scroll-behavior: smooth, so arriving from another page would glide the
    // whole length of the homepage down to the section. A page change should
    // land on it, not travel there.
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, [pathname]);

  return null;
}
