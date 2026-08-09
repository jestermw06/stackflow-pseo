import type { MetadataRoute } from 'next';
import comparisonData from '../data/production_comparisons.json';
import { SITE_URL } from '../lib/site';
import { getPillarToolIds } from '../lib/tools';
import type { Comparison } from '../lib/types';

const comparisons = comparisonData as Comparison[];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/comparisons`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = getPillarToolIds().map((id) => ({
    url: `${SITE_URL}/tools/${id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...toolRoutes, ...comparisonRoutes];
}
