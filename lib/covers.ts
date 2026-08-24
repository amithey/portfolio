import fs from 'node:fs';
import path from 'node:path';

/**
 * Which cover images actually exist on disk.
 *
 * No screenshots are in place yet, so every project currently draws its scene
 * from components/art. Resolving that here — at build time, on the server —
 * rather than waiting for an <img> to fail means no doomed request, no flash of
 * empty box, and no client JS. Drop `web-games.webp` into
 * public/images/projects and that tile switches to the real screenshot on the
 * next build, with nothing else to change.
 */
const COVER_DIR = path.join(process.cwd(), 'public', 'images', 'projects');

function readCovers(): Set<string> {
  try {
    return new Set(fs.readdirSync(COVER_DIR));
  } catch {
    // The directory is allowed not to exist.
    return new Set();
  }
}

// Cached in production, re-read on each dev request so a new file shows up
// without restarting the server.
const cached = process.env.NODE_ENV === 'production' ? readCovers() : null;

/** `cover` is a public path such as /images/projects/pong-game.webp. */
export function coverExists(cover: string): boolean {
  const file = cover.split('/').pop();
  if (!file) return false;
  return (cached ?? readCovers()).has(file);
}

/**
 * Whether an arbitrary file exists under public/.
 *
 * Same idea as coverExists, generalised: the photo and the CV are optional, and
 * deciding on the server means the page renders the fallback directly instead of
 * shipping a broken <img> or a download link to a 404.
 */
export function publicFileExists(publicPath: string): boolean {
  const rel = publicPath.replace(/^\//, '');
  if (!rel) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', rel));
  } catch {
    return false;
  }
}
