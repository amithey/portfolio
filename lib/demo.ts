import { PROJECTS } from "../data/projects";

/**
 * Hosts of demos that this site is allowed to iframe.
 * Derived from data/projects.ts so the CSP, the iframe, and the catalogue stay in sync.
 */
export const EMBED_DEMO_HOSTS: ReadonlySet<string> = new Set(
  PROJECTS.flatMap((p) => {
    if (p.demo.kind !== "embed" || !p.demo.embeddable || !p.demo.url) return [];
    try {
      const url = new URL(p.demo.url);
      return url.protocol === "https:" ? [url.host] : [];
    } catch {
      return [];
    }
  }),
);

export const EMBED_FRAME_SRC = [...EMBED_DEMO_HOSTS]
  .map((host) => `https://${host}`)
  .join(" ");

export function isAllowedDemoUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && EMBED_DEMO_HOSTS.has(parsed.host);
  } catch {
    return false;
  }
}

/** Host label for display. Returns undefined if `url` is not a valid absolute URL. */
export function demoHostLabel(url: string): string | undefined {
  if (typeof URL.canParse === "function" && !URL.canParse(url)) return undefined;
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}