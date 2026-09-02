'use client';

import { useEffect, useRef, useState } from 'react';
import type { Demo } from '@/data/projects';
import { isAllowedDemoUrl } from '@/lib/demo';

/**
 * The one bold thing on the site: a demo boots in place rather than navigating
 * away. The iframe is never mounted until the visitor asks for it — ten
 * auto-loading iframes would wreck the page and hammer free-tier backends.
 *
 * Fullscreen wraps the Fullscreen API on the demo's own container rather than
 * anything iframe-specific, so it works the same for every embedded project.
 * The button is omitted outright when the API isn't there (some iOS browsers)
 * instead of shown and silently failing.
 *
 * Only https URLs whose host is an embeddable demo in data/projects.ts are
 * loaded. Anything else is refused rather than iframed.
 */
export function RunDemo({ demo, title }: { demo: Demo; title: string }) {
  const [running, setRunning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFullscreenSupported(
      typeof document !== 'undefined' && !!document.documentElement.requestFullscreen,
    );
    const onChange = () => setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  if (!demo.url || !demo.embeddable) return null;
  if (!isAllowedDemoUrl(demo.url)) return null;

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden rounded-lg border border-line bg-surface-sunken ${
        fullscreen ? 'flex h-screen flex-col' : ''
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <p className="readout text-muted" aria-live="polite">
          {!running ? 'ready' : loaded ? <span className="text-live">running</span> : 'starting…'}
        </p>
        <div className="flex items-center gap-4">
          {running && fullscreenSupported && (
            <button
              type="button"
              onClick={toggleFullscreen}
              className="text-sm text-signal hover:underline"
            >
              {fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            </button>
          )}
          <a
            href={demo.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-signal hover:underline"
          >
            Open in a new tab
          </a>
        </div>
      </div>

      {running ? (
        <iframe
          src={demo.url}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer"
          title={`Live demo of ${title}`}
          className={`block w-full border-0 bg-surface-raised ${
            fullscreen ? 'flex-1' : 'aspect-[16/10]'
          }`}
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