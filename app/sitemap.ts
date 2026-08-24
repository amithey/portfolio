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
    })),
  ];
}
