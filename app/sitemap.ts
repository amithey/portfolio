import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/projects';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, priority: 1 },
    { url: `${SITE.url}/projects`, priority: 0.8 },
    { url: `${SITE.url}/about`, priority: 0.5 },
    ...PROJECTS.map((p) => ({
      url: `${SITE.url}/projects/${p.slug}`,
      priority: 0.7,
      // Only set where the real month is known (see data/projects.ts) — a
      // guessed date would be worse than none for a field search engines
      // use to decide whether a page is worth re-crawling.
      ...(p.built ? { lastModified: `${p.built}-01` } : {}),
    })),
  ];
}
