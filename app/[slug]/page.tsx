import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ComparisonTemplate from '../../components/ComparisonTemplate';
import comparisonData from '../../data/production_comparisons.json';
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
    return { title: 'Comparison Not Found | StackFlow' };
  }
  return {
    title: `${comparison.title} | StackFlow`,
    description:
      comparison.verdictReason ||
      `Compare ${comparison.softwareA?.name} vs ${comparison.softwareB?.name}.`,
  };
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

  // Defensive defaults so missing fields never crash the build or page
  const prosA = Array.isArray(comparison.prosA) ? comparison.prosA : [];
  const consA = Array.isArray(comparison.consA) ? comparison.consA : [];
  const prosB = Array.isArray(comparison.prosB) ? comparison.prosB : [];
  const consB = Array.isArray(comparison.consB) ? comparison.consB : [];
  const comparisonPoints = Array.isArray(comparison.comparisonPoints)
    ? comparison.comparisonPoints
    : [];

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <a href="/" className="text-sm text-gray-500 hover:text-[#ff6600] transition">
            ← StackFlow
          </a>
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
    </main>
  );
}
