import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ComparisonTemplate from '../../components/ComparisonTemplate';
import comparisonData from '../../data/production_comparisons.json';
import { SITE_NAME, SITE_URL } from '../../lib/site';
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

  const title = comparison.title || `${comparison.softwareA?.name} vs ${comparison.softwareB?.name}`;
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
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4 text-sm">
          <Link href="/" className="text-gray-500 hover:text-[#ff6600] transition">
            StackClash
          </Link>
          <span className="text-gray-700">/</span>
          <Link
            href="/comparisons"
            className="text-gray-500 hover:text-[#ff6600] transition"
          >
            Comparisons
          </Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400 truncate">
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

      {related.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <h2 className="text-2xl font-bold mb-6">Related comparisons</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((comp) => (
              <Link
                key={comp.slug}
                href={`/${comp.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-[#ff6600]/50 transition group"
              >
                <h3 className="font-semibold group-hover:text-[#ff6600] transition">
                  {comp.title ||
                    `${comp.softwareA?.name} vs ${comp.softwareB?.name}`}
                </h3>
                {comp.verdict && (
                  <p className="text-sm text-gray-500 mt-2">
                    Verdict:{' '}
                    <span className="text-[#ff6600]">{comp.verdict}</span>
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
