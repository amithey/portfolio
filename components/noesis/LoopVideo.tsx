'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A muted looping clip that plays while it is on screen and pauses when it is
 * not. Under prefers-reduced-motion it never autoplays and shows native
 * controls instead. Clicking the picture toggles playback.
 */
export function LoopVideo({
  src,
  poster,
  label,
  className = '',
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        src={poster ? src : `${src}#t=0.1`}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduced}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={reduced ? undefined : toggle}
        className={`block aspect-[4/3] w-full cursor-pointer bg-black ${className}`}
      />
      {!reduced && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
        >
          <span aria-hidden="true" className="text-xs">
            {playing ? '❚❚' : '▶'}
          </span>
        </button>
      )}
    </div>
  );
}
