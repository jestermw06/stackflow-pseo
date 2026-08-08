import Link from 'next/link';
import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';
import comparisonData from '../data/production_comparisons.json';
import {
  homeItemListJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from '../lib/jsonld';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';
import type { Comparison } from '../lib/types';

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} | Marketing Automation Comparisons` },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | Marketing Automation Comparisons`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
};

const comparisons = comparisonData as Comparison[];

function displayTitle(comp: Comparison): string {
  if (comp.title) return comp.title;
  const a = comp.softwareA?.name ?? 'Tool A';
  const b = comp.softwareB?.name ?? 'Tool B';
  return `${a} vs ${b}`;
}

function featuredList(all: Comparison[], limit = 9): Comparison[] {
  const flagships = all.filter((c) => c.quality === 'flagship');
  const rest = all.filter((c) => c.quality !== 'flagship');
  return [...flagships, ...rest].slice(0, limit);
}

export default function HomePage() {
  const featuredComparisons = featuredList(comparisons, 9);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#ff6600] selection:text-white">
      <JsonLd
        data={[
          websiteJsonLd(),
          organizationJsonLd(),
          homeItemListJsonLd(featuredComparisons),
        ]}
      />

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#ff660033,transparent_50%)]" />
        <div className="container relative mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#ff6600] mb-4">
            {SITE_NAME}
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-[#ff6600] mb-6">
            Pick Your Stack. <br />
            Win the Matchup.
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-400 leading-relaxed mb-10">
            Side-by-side comparisons for marketing automation, CRM, email, and
            workflow tools — clear verdicts, not fluff.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#comparisons"
              className="rounded-full bg-[#ff6600] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#e65c00] shadow-[0_0_20px_rgba(255,102,0,0.3)]"
            >
              Explore Comparisons
            </a>
            <Link
              href="/comparisons"
              className="rounded-full border border-white/20 px-8 py-4 text-lg font-bold text-white transition hover:border-[#ff6600]"
            >
              View all
            </Link>
          </div>
        </div>
      </section>

      <section id="comparisons" className="py-24 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Featured matchups
            </h2>
            <div className="h-1 w-20 bg-[#ff6600] mx-auto rounded-full" />
            <p className="mt-4 text-gray-500">
              Flagship reviews first · {comparisons.length} total
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredComparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/${comp.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 transition hover:border-[#ff6600]/50 hover:shadow-[0_0_30px_rgba(255,102,0,0.1)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ff6600]">
                    {comp.quality === 'flagship' ? 'Flagship' : 'Comparison'}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-[#ff6600] animate-pulse" />
                </div>
                <h3 className="text-xl font-bold leading-tight group-hover:text-[#ff6600] transition">
                  {displayTitle(comp)}
                </h3>
                <p className="mt-4 text-sm text-gray-500 line-clamp-2">
                  {comp.verdictReason ||
                    `Compare ${comp.softwareA?.name} vs ${comp.softwareB?.name}`}
                </p>
                {comp.verdict && (
                  <p className="mt-4 text-xs text-gray-600">
                    Verdict:{' '}
                    <span className="text-[#ff6600] font-semibold">
                      {comp.verdict}
                    </span>
                  </p>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/comparisons"
              className="inline-flex items-center gap-2 text-[#ff6600] font-semibold hover:underline"
            >
              View all {comparisons.length} comparisons →
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center space-y-3">
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <Link href="/comparisons" className="hover:text-[#ff6600] transition">
            Comparisons
          </Link>
          <a href="/sitemap.xml" className="hover:text-[#ff6600] transition">
            Sitemap
          </a>
        </div>
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} {SITE_NAME}.
        </p>
      </footer>
    </div>
  );
}
