'use client';

import { useState } from 'react';
import type { Demo } from '@/data/projects';

/**
 * The one bold thing on the site: a demo boots in place rather than navigating
 * away. The iframe is never mounted until the visitor asks for it — ten
 * auto-loading iframes would wreck the page and hammer free-tier backends.
 */
export function RunDemo({ demo, title }: { demo: Demo; title: string }) {
  const [running, setRunning] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!demo.url || !demo.embeddable) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface-sunken">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <p className="readout text-muted" aria-live="polite">
          {!running ? 'ready' : loaded ? <span className="text-live">running</span> : 'starting…'}
        </p>
        <a
          href={demo.url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm text-signal hover:underline"
        >
          Open in a new tab
        </a>
      </div>

      {running ? (
        <iframe
          src={demo.url}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer"
          title={`Live demo of ${title}`}
          className="block aspect-[16/10] w-full border-0 bg-surface-raised"
        />
      ) : (
        <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-sm text-sm text-muted">
            This runs the real thing, loaded from its own deployment.
          </p>
          <button
            type="button"
            onClick={() => setRunning(true)}
            className="rounded-md bg-signal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-signal-ink"
          >
            Run this project
          </button>
        </div>
      )}
    </div>
  );
}
