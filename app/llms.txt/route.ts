import comparisonData from '../../data/production_comparisons.json';
import { longformSlugs } from '../../lib/longform';
import { SITE_DISAMBIGUATION, SITE_NAME, SITE_TAGLINE, SITE_URL } from '../../lib/site';
import { getPillarToolIds, getSoftwareById } from '../../lib/tools';
import type { Comparison } from '../../lib/types';

export function GET() {
  const comparisons = comparisonData as Comparison[];
  const deep = new Set(longformSlugs());
  const tools = getPillarToolIds()
    .map((id) => getSoftwareById(id))
    .filter(Boolean);

  const lines = [
    `# ${SITE_NAME}`,
    SITE_TAGLINE,
    SITE_DISAMBIGUATION,
    '',
    `Canonical site: ${SITE_URL}`,
    `Methodology: ${SITE_URL}/methodology`,
    '',
    '## Deep reviews (full 2026 articles)',
    ...longformSlugs().map((slug) => {
      const c = comparisons.find((x) => x.slug === slug);
      return `- ${SITE_URL}/${slug} — ${c?.title || slug} (winner: ${c?.verdict})`;
    }),
    '',
    '## All comparisons',
    ...comparisons.map(
      (c) =>
        `- ${SITE_URL}/${c.slug} — ${c.title} → ${c.verdict}${
          deep.has(c.slug) ? ' [deep]' : ''
        }`
    ),
    '',
    '## Tool guides',
    ...tools.map((s) => `- ${SITE_URL}/tools/${s!.id} — ${s!.name}`),
  ];

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
