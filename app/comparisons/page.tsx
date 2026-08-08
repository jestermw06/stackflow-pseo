import Link from 'next/link';
import type { Metadata } from 'next';
import comparisonData from '../../data/production_comparisons.json';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../../lib/site';
import type { Comparison } from '../../lib/types';

export const metadata: Metadata = {
  title: 'All Comparisons',
  description: `Browse all ${SITE_NAME} marketing automation and SaaS tool comparisons.`,
  alternates: {
    canonical: `${SITE_URL}/comparisons`,
  },
  openGraph: {
    title: `All Comparisons | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/comparisons`,
  },
};

const comparisons = [...(comparisonData as Comparison[])].sort((a, b) => {
  const aq = a.quality === 'flagship' ? 0 : 1;
  const bq = b.quality === 'flagship' ? 0 : 1;
  if (aq !== bq) return aq - bq;
  return (a.title || a.slug).localeCompare(b.title || b.slug);
});

export default function ComparisonsIndexPage() {
  return (
    <main className="site-container py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow mb-2">Catalog</p>
        <h1 className="section-title">All comparisons</h1>
        <p className="mt-3 text-zinc-500">
          {comparisons.length} side-by-side matchups. Flagships first.
        </p>
      </div>

      <ul className="card divide-y divide-white/5 overflow-hidden p-0">
        {comparisons.map((comp) => (
          <li key={comp.slug}>
            <Link
              href={`/${comp.slug}`}
              className="flex flex-col gap-2 px-5 py-5 transition hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
            >
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  {comp.quality === 'flagship' && (
                    <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300 ring-1 ring-brand-500/30">
                      Flagship
                    </span>
                  )}
                </div>
                <h2 className="font-display text-lg font-semibold text-white">
                  {comp.title ||
                    `${comp.softwareA?.name} vs ${comp.softwareB?.name}`}
                </h2>
                {comp.verdictReason && (
                  <p className="mt-1 line-clamp-1 text-sm text-zinc-500">
                    {comp.verdictReason}
                  </p>
                )}
              </div>
              {comp.verdict && (
                <span className="shrink-0 text-xs font-semibold text-brand-400 sm:text-sm">
                  Winner: {comp.verdict}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
