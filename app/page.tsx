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
  return `${comp.softwareA?.name ?? 'Tool A'} vs ${comp.softwareB?.name ?? 'Tool B'}`;
}

function featuredList(all: Comparison[], limit = 9): Comparison[] {
  const flagships = all.filter((c) => c.quality === 'flagship');
  const rest = all.filter((c) => c.quality !== 'flagship');
  return [...flagships, ...rest].slice(0, limit);
}

export default function HomePage() {
  const featuredComparisons = featuredList(comparisons, 9);

  return (
    <>
      <JsonLd
        data={[
          websiteJsonLd(),
          organizationJsonLd(),
          homeItemListJsonLd(featuredComparisons),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)',
          }}
        />
        <div className="site-container relative text-center">
          <p className="eyebrow mb-5">Software matchups that actually help</p>
          <h1 className="font-display mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Pick your stack.{' '}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-orange-200 bg-clip-text text-transparent">
              Win the clash.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Clear verdicts on CRM, email, automation, and e-commerce tools —
            built for teams choosing software, not reading fluff.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#featured" className="btn-primary px-8 py-3.5 text-base">
              Explore matchups
            </a>
            <Link href="/comparisons" className="btn-secondary px-8 py-3.5 text-base">
              View all {comparisons.length}
            </Link>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: 'Comparisons', value: String(comparisons.length) },
              { label: 'Flagship reviews', value: String(comparisons.filter((c) => c.quality === 'flagship').length) },
              { label: 'Focus', value: 'MarTech' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-surface-900/60 px-3 py-4 sm:px-4"
              >
                <p className="font-display text-xl font-bold text-white sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="pb-24">
        <div className="site-container">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-2">Featured</p>
              <h2 className="section-title">Top matchups</h2>
              <p className="mt-2 max-w-xl text-zinc-500">
                Flagship comparisons first — deep feature tables, honest pros
                and cons, and a clear winner.
              </p>
            </div>
            <Link
              href="/comparisons"
              className="text-sm font-semibold text-brand-400 hover:text-brand-300 transition"
            >
              See full catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredComparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/${comp.slug}`}
                className="card-hover group flex flex-col p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      comp.quality === 'flagship'
                        ? 'bg-brand-500/15 text-brand-300 ring-1 ring-brand-500/30'
                        : 'bg-white/5 text-zinc-400 ring-1 ring-white/10'
                    }`}
                  >
                    {comp.quality === 'flagship' ? 'Flagship' : 'Comparison'}
                  </span>
                  {comp.intentFamily && (
                    <span className="truncate text-[10px] uppercase tracking-wider text-zinc-600">
                      {comp.intentFamily.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-semibold leading-snug text-white transition group-hover:text-brand-300">
                  {displayTitle(comp)}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-3">
                  {comp.verdictReason ||
                    `Compare ${comp.softwareA?.name} vs ${comp.softwareB?.name}`}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <p className="text-xs text-zinc-500">
                    Winner{' '}
                    <span className="font-semibold text-brand-400">
                      {comp.verdict || '—'}
                    </span>
                  </p>
                  <span className="text-sm font-medium text-zinc-400 transition group-hover:text-brand-400">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
