import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ComparisonTemplate from '../../components/ComparisonTemplate';
import JsonLd from '../../components/JsonLd';
import comparisonData from '../../data/production_comparisons.json';
import { comparisonJsonLd } from '../../lib/jsonld';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { hasToolPage } from '../../lib/tools';
import type { Comparison } from '../../lib/types';

const comparisons = comparisonData as Comparison[];

export async function generateStaticParams() {
  return comparisons.map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const comparison = comparisons.find((c) => c.slug === params.slug);
  if (!comparison) {
    return { title: 'Comparison Not Found' };
  }

  const title =
    comparison.title ||
    `${comparison.softwareA?.name} vs ${comparison.softwareB?.name}`;
  const description =
    comparison.verdictReason ||
    `Compare ${comparison.softwareA?.name} vs ${comparison.softwareB?.name} — features, pros, cons, and a clear verdict.`;
  const url = `${SITE_URL}/${comparison.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

function relatedComparisons(current: Comparison, limit = 4): Comparison[] {
  const ids = new Set(
    [current.softwareA?.id, current.softwareB?.id].filter(Boolean)
  );

  return comparisons
    .filter((c) => c.slug !== current.slug)
    .map((c) => {
      const shared =
        (ids.has(c.softwareA?.id) ? 1 : 0) + (ids.has(c.softwareB?.id) ? 1 : 0);
      return { c, shared };
    })
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((x) => x.c);
}

export default function ComparisonPage({
  params,
}: {
  params: { slug: string };
}) {
  const comparison = comparisons.find((c) => c.slug === params.slug);

  if (!comparison) {
    notFound();
  }

  const prosA = Array.isArray(comparison.prosA) ? comparison.prosA : [];
  const consA = Array.isArray(comparison.consA) ? comparison.consA : [];
  const prosB = Array.isArray(comparison.prosB) ? comparison.prosB : [];
  const consB = Array.isArray(comparison.consB) ? comparison.consB : [];
  const comparisonPoints = Array.isArray(comparison.comparisonPoints)
    ? comparison.comparisonPoints
    : [];

  const related = relatedComparisons(comparison);

  return (
    <main>
      <JsonLd data={comparisonJsonLd(comparison)} />

      <div className="border-b border-white/5 bg-surface-900/40">
        <div className="site-container flex flex-wrap items-center gap-2 py-3 text-sm text-zinc-500">
          <Link href="/" className="hover:text-brand-400 transition">
            Home
          </Link>
          <span className="text-zinc-700">/</span>
          <Link href="/comparisons" className="hover:text-brand-400 transition">
            Comparisons
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="truncate text-zinc-400">
            {comparison.title || comparison.slug}
          </span>
        </div>
      </div>

      <ComparisonTemplate
        softwareA={comparison.softwareA}
        softwareB={comparison.softwareB}
        verdict={comparison.verdict}
        verdictReason={comparison.verdictReason}
        prosA={prosA}
        consA={consA}
        prosB={prosB}
        consB={consB}
        comparisonPoints={comparisonPoints}
      />

      {(hasToolPage(comparison.softwareA?.id) ||
        hasToolPage(comparison.softwareB?.id)) && (
        <section className="site-container pb-8">
          <div className="flex flex-wrap gap-3 text-sm">
            {hasToolPage(comparison.softwareA?.id) && (
              <Link
                href={`/tools/${comparison.softwareA.id}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-300 transition hover:border-brand-500/40 hover:text-brand-300"
              >
                {comparison.softwareA.name} guide →
              </Link>
            )}
            {hasToolPage(comparison.softwareB?.id) && (
              <Link
                href={`/tools/${comparison.softwareB.id}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-300 transition hover:border-brand-500/40 hover:text-brand-300"
              >
                {comparison.softwareB.name} guide →
              </Link>
            )}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="site-container pb-20">
          <h2 className="section-title mb-6 text-2xl">Related matchups</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((comp) => (
              <Link
                key={comp.slug}
                href={`/${comp.slug}`}
                className="card-hover p-5 group"
              >
                <h3 className="font-display font-semibold text-white transition group-hover:text-brand-300">
                  {comp.title ||
                    `${comp.softwareA?.name} vs ${comp.softwareB?.name}`}
                </h3>
                {comp.verdict && (
                  <p className="mt-2 text-sm text-zinc-500">
                    Winner{' '}
                    <span className="font-semibold text-brand-400">
                      {comp.verdict}
                    </span>
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
