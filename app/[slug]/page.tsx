import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ComparisonTemplate from '../../components/ComparisonTemplate';

// This function tells Next.js which paths to pre-render at build time.
export async function generateStaticParams() {
  const dataPath = path.join(process.cwd(), 'data', 'production_comparisons.json');
  const fileContents = fs.readFileSync(dataPath, 'utf8');
  const comparisons = JSON.parse(fileContents);

  return comparisons.map((comparison: any) => ({
    slug: comparison.slug,
  }));
}

export default async function ComparisonPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Load the data
  const dataPath = path.join(process.cwd(), 'data', 'production_comparisons.json');
  const fileContents = fs.readFileSync(dataPath, 'utf8');
  const comparisons = JSON.parse(fileContents);

  // Find the specific comparison matching this slug
  const comparison = comparisons.find((c: any) => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <ComparisonTemplate 
        softwareA={comparison.softwareA}
        softwareB={comparison.softwareB}
        verdict={comparison.verdict}
        verdictReason={comparison.verdictReason}
        prosA={comparison.pros_a}
        consA={comparison.cons_a}
        prosB={comparison.pros_b}
        consB={comparison.cons_b}
      />
    </main>
  );
}