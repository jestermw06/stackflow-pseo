import Link from 'next/link';
import type { Metadata } from 'next';
import comparisonData from '../../data/production_comparisons.json';
import { getLongform, longformSlugs } from '../../lib/longform';
import {
  SITE_DESCRIPTION,
  SITE_DISAMBIGUATION,
  SITE_NAME,
  SITE_URL,
} from '../../lib/site';
import type { Comparison } from '../../lib/types';

export const metadata: Metadata = {
  title: 'How we score software comparisons',
  description: `How ${SITE_NAME} picks winners across ${comparisonData.length} CRM, email, and automation matchups — and which pages are full 2026 reviews.`,
  alternates: { canonical: `${SITE_URL}/methodology` },
};

const comparisons = comparisonData as Comparison[];
const deepSlugs = new Set(longformSlugs());

export default function MethodologyPage() {
  const byFamily = new Map<string, Comparison[]>();
  for (const c of comparisons) {
    const key = c.intentFamily || 'other';
    const list = byFamily.get(key) || [];
    list.push(c);
    byFamily.set(key, list);
  }

  return (
    <main className="site-container py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3">Editorial</p>
        <h1 className="section-title">How StackClash scores a clash</h1>
        <p className="mt-4 text-lg text-zinc-400">{SITE_DESCRIPTION}</p>
        <p className="mt-3 text-sm text-zinc-500">{SITE_DISAMBIGUATION}</p>

        <div className="mt-10 space-y-4 text-base leading-relaxed text-zinc-300">
          <p>
            Each matchup has a named winner. That is a judgment for a default
            buyer in the category — not a claim that the other product is bad.
            The losing side still gets a “choose this if” list. If both tools
            fit equally, we still pick: a coin-flip page wastes a buyer’s time.
          </p>
          <p>
            We score on the job, not a universal feature grid. A CRM clash
            weights pipeline and reporting. An ESP clash weights data model and
            flows. An automation clash weights unit economics (tasks vs
            credits) and catalog coverage. Prices are list or commonly
            published USD figures with a review date. Vendors run calculators;
            we tell you to confirm before you buy.
          </p>
          <p>
            <strong className="text-white">Deep reviews</strong> ({deepSlugs.size}{' '}
            as of August 2026) add a scorecard, 2026 pricing table, personas,
            and FAQ schema. Other pages are still verdict + feature table +
            pros/cons. We thicken those next rather than minting more thin
            URLs.
          </p>
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-white">
            Deep reviews
          </h2>
          <ul className="mt-4 space-y-2">
            {longformSlugs().map((slug) => {
              const article = getLongform(slug);
              const comp = comparisons.find((c) => c.slug === slug);
              return (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="text-brand-400 hover:underline"
                  >
                    {comp?.title || slug}
                  </Link>
                  {article && (
                    <span className="text-sm text-zinc-500">
                      {' '}
                      · reviewed {article.reviewed} · winner{' '}
                      {comp?.verdict}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-white">
            All {comparisons.length} winners
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Catalog snapshot. Flagship quality in the data file does not always
            mean a deep article yet — use the list above for longform.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-zinc-500">
                  <th className="px-4 py-3">Matchup</th>
                  <th className="px-4 py-3">Winner</th>
                  <th className="px-4 py-3">Depth</th>
                </tr>
              </thead>
              <tbody>
                {[...comparisons]
                  .sort((a, b) =>
                    (a.title || a.slug).localeCompare(b.title || b.slug)
                  )
                  .map((c) => (
                    <tr
                      key={c.slug}
                      className="border-b border-white/[0.04] last:border-0"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/${c.slug}`}
                          className="text-zinc-200 hover:text-brand-300"
                        >
                          {c.title || c.slug}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium text-brand-400">
                        {c.verdict}
                      </td>
                      <td className="px-4 py-3 text-zinc-500">
                        {deepSlugs.has(c.slug) ? 'Deep review' : 'Standard'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </main>
  );
}
