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

const comparisons = [...(comparisonData as Comparison[])].sort((a, b) =>
  (a.title || a.slug).localeCompare(b.title || b.slug)
);

export default function ComparisonsIndexPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-[#ff6600] transition"
          >
            ← StackFlow
          </Link>
          <span className="text-xs text-gray-600">
            {comparisons.length} comparisons
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          All Comparisons
        </h1>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Side-by-side breakdowns of marketing automation, CRM, email, and
          workflow tools. Pick a matchup to see the verdict, features, and
          pros/cons.
        </p>

        <ul className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {comparisons.map((comp) => (
            <li key={comp.slug}>
              <Link
                href={`/${comp.slug}`}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-5 hover:bg-white/5 transition group"
              >
                <div>
                  <h2 className="font-semibold group-hover:text-[#ff6600] transition">
                    {comp.title ||
                      `${comp.softwareA?.name} vs ${comp.softwareB?.name}`}
                  </h2>
                  {comp.verdictReason && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                      {comp.verdictReason}
                    </p>
                  )}
                </div>
                {comp.verdict && (
                  <span className="text-xs font-semibold text-[#ff6600] shrink-0">
                    Winner: {comp.verdict}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
