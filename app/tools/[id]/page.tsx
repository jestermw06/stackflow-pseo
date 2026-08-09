import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getOutboundUrl, isAffiliateLink } from '../../../lib/affiliates';
import { SITE_NAME, SITE_URL } from '../../../lib/site';
import {
  defaultPillarCopy,
  getComparisonsForTool,
  getPillarCopy,
  getPillarToolIds,
  getSoftwareById,
  hasToolPage,
} from '../../../lib/tools';

export function generateStaticParams() {
  return getPillarToolIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const software = getSoftwareById(params.id);
  if (!software || !hasToolPage(params.id)) {
    return { title: 'Tool not found' };
  }
  const copy = getPillarCopy(params.id) || defaultPillarCopy(software);
  const title = `${software.name} guide & comparisons`;
  const description =
    copy.tagline ||
    `Honest ${software.name} overview and head-to-head comparisons on ${SITE_NAME}.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/tools/${params.id}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/tools/${params.id}`,
    },
  };
}

export default function ToolPillarPage({
  params,
}: {
  params: { id: string };
}) {
  const software = getSoftwareById(params.id);
  if (!software || !hasToolPage(params.id)) {
    notFound();
  }

  const matchups = getComparisonsForTool(params.id);
  const copy = getPillarCopy(params.id) || defaultPillarCopy(software);
  const outbound = getOutboundUrl(software.id, software.official_url);
  const sponsored = isAffiliateLink(software.id);

  return (
    <main>
      <div className="border-b border-white/5 bg-surface-900/40">
        <div className="site-container flex flex-wrap items-center gap-2 py-3 text-sm text-zinc-500">
          <Link href="/" className="hover:text-brand-400 transition">
            Home
          </Link>
          <span className="text-zinc-700">/</span>
          <Link href="/tools" className="hover:text-brand-400 transition">
            Tools
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-400">{software.name}</span>
        </div>
      </div>

      <div className="site-container py-12 sm:py-16">
        <header className="max-w-3xl">
          <p className="eyebrow mb-3">{software.category}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {software.name}
          </h1>
          <p className="mt-4 text-lg text-zinc-400">{copy.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={outbound}
              target="_blank"
              rel={
                sponsored
                  ? 'sponsored noopener noreferrer'
                  : 'noopener noreferrer'
              }
              className="btn-primary"
            >
              Try {software.name}
            </a>
            <a href="#comparisons" className="btn-secondary">
              View {matchups.length} comparisons
            </a>
          </div>
          {sponsored && (
            <p className="mt-3 text-xs text-zinc-600">
              Outbound trial links may be affiliate links. We may earn a
              commission at no extra cost to you.
            </p>
          )}
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="font-display text-2xl font-bold text-white">
                Overview
              </h2>
              <div className="mt-4 space-y-4 text-zinc-400 leading-relaxed">
                {copy.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <section className="grid gap-5 sm:grid-cols-2">
              <div className="card p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  Best for
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {copy.bestFor.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400">
                  Less ideal for
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {copy.notIdealFor.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-rose-400">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {software.key_features?.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-white">
                  Key capabilities
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {software.key_features.map((f) => (
                    <li
                      key={f}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {copy.pricingNote && (
              <section className="card p-6">
                <h2 className="font-display text-lg font-bold text-white">
                  Pricing snapshot
                </h2>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {copy.pricingNote}
                </p>
              </section>
            )}

            <section className="rounded-2xl border border-brand-500/25 bg-brand-500/10 p-6">
              <h2 className="font-display text-xl font-bold text-white">
                StackClash verdict
              </h2>
              <p className="mt-3 text-zinc-300 leading-relaxed">{copy.verdict}</p>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="card sticky top-24 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Quick facts
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-zinc-500">Category</dt>
                  <dd className="font-medium text-white">{software.category}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Comparisons on StackClash</dt>
                  <dd className="font-medium text-white">{matchups.length}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Official site</dt>
                  <dd>
                    <a
                      href={software.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-400 hover:underline break-all"
                    >
                      {software.official_url.replace(/^https?:\/\//, '')}
                    </a>
                  </dd>
                </div>
              </dl>
              <a
                href={outbound}
                target="_blank"
                rel={
                  sponsored
                    ? 'sponsored noopener noreferrer'
                    : 'noopener noreferrer'
                }
                className="btn-primary mt-6 w-full"
              >
                Try {software.name}
              </a>
            </div>
          </aside>
        </div>

        <section id="comparisons" className="mt-16">
          <h2 className="section-title text-2xl sm:text-3xl">
            {software.name} comparisons
          </h2>
          <p className="mt-2 max-w-2xl text-zinc-500">
            Every head-to-head on StackClash that includes {software.name}.
          </p>
          <ul className="mt-8 card divide-y divide-white/5 overflow-hidden p-0">
            {matchups.map((comp) => {
              const other =
                comp.softwareA?.id === software.id
                  ? comp.softwareB
                  : comp.softwareA;
              return (
                <li key={comp.slug}>
                  <Link
                    href={`/${comp.slug}`}
                    className="flex flex-col gap-1 px-5 py-4 transition hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div>
                      <p className="font-display font-semibold text-white">
                        {comp.title ||
                          `${comp.softwareA?.name} vs ${comp.softwareB?.name}`}
                      </p>
                      {other?.name && (
                        <p className="text-sm text-zinc-500">
                          vs {other.name}
                          {comp.quality === 'flagship' ? ' · Flagship' : ''}
                        </p>
                      )}
                    </div>
                    {comp.verdict && (
                      <span className="text-xs font-semibold text-brand-400 sm:text-sm">
                        Winner: {comp.verdict}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
