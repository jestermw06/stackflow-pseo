import React from 'react';
import { getOutboundUrl, isAffiliateLink } from '../lib/affiliates';
import type { ComparisonPoint, Software } from '../lib/types';

interface ComparisonProps {
  softwareA: Software;
  softwareB: Software;
  verdict?: string;
  verdictReason?: string;
  prosA?: string[];
  consA?: string[];
  prosB?: string[];
  consB?: string[];
  comparisonPoints?: ComparisonPoint[];
}

const ComparisonTemplate: React.FC<ComparisonProps> = ({
  softwareA,
  softwareB,
  verdict = 'Tie',
  verdictReason = 'Both tools have strengths depending on your use case.',
  prosA = [],
  consA = [],
  prosB = [],
  consB = [],
  comparisonPoints = [],
}) => {
  const nameA = softwareA?.name ?? 'Software A';
  const nameB = softwareB?.name ?? 'Software B';
  const urlA = getOutboundUrl(softwareA?.id, softwareA?.official_url);
  const urlB = getOutboundUrl(softwareB?.id, softwareB?.official_url);
  const sponsoredA = isAffiliateLink(softwareA?.id);
  const sponsoredB = isAffiliateLink(softwareB?.id);

  return (
    <div className="site-container py-10 sm:py-14">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <p className="eyebrow mb-3">Head-to-head</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {nameA}{' '}
          <span className="text-brand-400">vs</span> {nameB}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
          Features, strengths, and a clear verdict for teams choosing their
          stack.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500">
          {softwareA?.category && (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {softwareA.category}
            </span>
          )}
          {softwareB?.category && (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {softwareB.category}
            </span>
          )}
        </div>
      </header>

      {/* Verdict */}
      <section className="relative mb-12 overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-br from-brand-500/15 via-surface-900 to-surface-900 p-6 shadow-glow sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
          The quick verdict
        </h2>
        <div className="mt-6 flex flex-col items-stretch gap-6 sm:flex-row sm:items-center">
          <div className="shrink-0 rounded-2xl border border-white/10 bg-surface-950/80 px-6 py-5 text-center sm:min-w-[200px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Winner
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-brand-400">
              {verdict}
            </p>
          </div>
          <p className="flex-1 text-base leading-relaxed text-zinc-300 sm:text-lg">
            &ldquo;{verdictReason}&rdquo;
          </p>
        </div>
      </section>

      {/* Feature table */}
      {comparisonPoints.length > 0 && (
        <section className="card mb-12 overflow-hidden p-0">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="font-display text-xl font-bold text-white">
              Feature matchup
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left">
              <thead>
                <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-zinc-500">
                  <th className="px-6 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 text-center font-semibold">{nameA}</th>
                  <th className="px-6 py-3 text-center font-semibold">{nameB}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonPoints.map((point, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-3.5 text-sm text-zinc-300">
                      {point.feature}
                    </td>
                    <td className="px-4 py-3.5 text-center text-lg">
                      {point.softwareA ? (
                        <span className="text-emerald-400">✓</span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-center text-lg">
                      {point.softwareB ? (
                        <span className="text-emerald-400">✓</span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Pros / cons */}
      <section className="mb-14 grid gap-5 md:grid-cols-2">
        <ProsConsCard title={nameA} pros={prosA} cons={consA} />
        <ProsConsCard title={nameB} pros={prosB} cons={consB} />
      </section>

      {/* CTA */}
      <footer className="card px-6 py-10 text-center sm:px-10">
        <p className="text-sm text-zinc-500">Ready to try them yourself?</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {urlA && urlA !== '#' && (
            <a
              href={urlA}
              target="_blank"
              rel={
                sponsoredA
                  ? 'sponsored noopener noreferrer'
                  : 'noopener noreferrer'
              }
              className="btn-secondary"
            >
              Try {nameA}
            </a>
          )}
          {urlB && urlB !== '#' && (
            <a
              href={urlB}
              target="_blank"
              rel={
                sponsoredB
                  ? 'sponsored noopener noreferrer'
                  : 'noopener noreferrer'
              }
              className="btn-primary"
            >
              Try {nameB}
            </a>
          )}
        </div>
        {(sponsoredA || sponsoredB) && (
          <p className="mt-4 text-xs text-zinc-600">
            Some outbound links may be affiliate links. We may earn a commission
            at no extra cost to you.
          </p>
        )}
      </footer>
    </div>
  );
};

function ProsConsCard({
  title,
  pros,
  cons,
}: {
  title: string;
  pros: string[];
  cons: string[];
}) {
  return (
    <div className="card p-6">
      <h3 className="font-display text-lg font-bold text-white">{title}</h3>

      <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-emerald-400/90">
        Pros
      </p>
      <ul className="mt-2 space-y-2">
        {pros.length === 0 ? (
          <li className="text-sm text-zinc-600">No pros listed.</li>
        ) : (
          pros.map((pro, i) => (
            <li key={i} className="flex gap-2 text-sm text-zinc-300">
              <span className="mt-0.5 shrink-0 text-emerald-400">✓</span>
              <span>{pro}</span>
            </li>
          ))
        )}
      </ul>

      <p className="mt-6 text-[11px] font-bold uppercase tracking-wider text-rose-400/90">
        Cons
      </p>
      <ul className="mt-2 space-y-2">
        {cons.length === 0 ? (
          <li className="text-sm text-zinc-600">No cons listed.</li>
        ) : (
          cons.map((con, i) => (
            <li key={i} className="flex gap-2 text-sm text-zinc-300">
              <span className="mt-0.5 shrink-0 text-rose-400">✕</span>
              <span>{con}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ComparisonTemplate;
