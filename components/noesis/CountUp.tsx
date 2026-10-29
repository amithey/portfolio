'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts up to `to` once it scrolls into view. Renders the final number on the
 * server, without JS and under reduced motion, so the figure is never wrong or
 * missing; it is only animated when it can be.
 */
export function CountUp({ to, duration = 1700 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    setValue(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = () => {
        // performance.now() rather than the rAF argument, which can sit on a
        // different clock from the `start` taken above.
        const p = Math.min(1, Math.max(0, (performance.now() - start) / duration));
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString('en-US')}
    </span>
  );
}
