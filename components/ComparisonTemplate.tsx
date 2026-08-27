import React from 'react';
import { getOutboundUrl, isAffiliateLink } from '../lib/affiliates';
import type { LongformArticle } from '../lib/longform/types';
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
  article?: LongformArticle | null;
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
  article = null,
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
        <p className="eyebrow mb-3">
          {article ? 'MarTech comparison' : 'Head-to-head'}
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {nameA}{' '}
          <span className="text-brand-400">vs</span> {nameB}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
          {article?.dek ||
            'Features, strengths, and a clear verdict for teams choosing their stack.'}
        </p>
        {article && (
          <p className="mt-3 text-xs text-zinc-500">
            Pricing and plans reviewed {article.reviewed}. Confirm live numbers
            on each vendor’s pricing page before you buy.
          </p>
        )}
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

      {article && (
        <LongformBody article={article} nameA={nameA} nameB={nameB} />
      )}

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

      {article && article.faqs.length > 0 && (
        <section id="faq" className="mb-14">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-4">
            {article.faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
              >
                <dt className="font-display text-base font-semibold text-white">
                  {faq.q}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {article && article.sources.length > 0 && (
        <section className="mb-14">
          <h2 className="font-display text-lg font-bold text-white">
            Sources
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-zinc-500">
            {article.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

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

function LongformBody({
  article,
  nameA,
  nameB,
}: {
  article: LongformArticle;
  nameA: string;
  nameB: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl">
      <nav className="mb-10 flex flex-wrap gap-2 text-xs font-semibold text-zinc-500">
        {[
          ['#scorecard', 'Scorecard'],
          ['#differ', 'How they differ'],
          ['#pricing', 'Pricing'],
          ['#who', 'Who should pick which'],
          ['#faq', 'FAQ'],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-white/10 px-3 py-1 hover:border-brand-500/40 hover:text-brand-300"
          >
            {label}
          </a>
        ))}
      </nav>

      {article.intro.map((p, i) => (
        <p key={i} className="mb-4 text-base leading-relaxed text-zinc-300">
          {p}
        </p>
      ))}

      <section id="scorecard" className="mt-12">
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
          Scorecard
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Scores are 1–10 for a typical mid-market buyer. They are editorial,
          not lab benchmarks.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3 font-semibold">Round</th>
                <th className="px-3 py-3 text-center font-semibold">{nameA}</th>
                <th className="px-3 py-3 text-center font-semibold">{nameB}</th>
                <th className="px-4 py-3 font-semibold">Why</th>
              </tr>
            </thead>
            <tbody>
              {article.scores.map((row) => (
                <tr
                  key={row.criterion}
                  className="border-b border-white/[0.04] last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-zinc-200">
                    {row.criterion}
                  </td>
                  <td
                    className={`px-3 py-3 text-center tabular-nums ${
                      row.a > row.b ? 'font-bold text-brand-300' : 'text-zinc-300'
                    }`}
                  >
                    {row.a}
                  </td>
                  <td
                    className={`px-3 py-3 text-center tabular-nums ${
                      row.b > row.a ? 'font-bold text-brand-300' : 'text-zinc-300'
                    }`}
                  >
                    {row.b}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="differ" className="mt-12">
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
          How they actually differ
        </h2>
        {article.differ.map((p, i) => (
          <p key={i} className="mt-4 text-base leading-relaxed text-zinc-300">
            {p}
          </p>
        ))}
      </section>

      <section id="pricing" className="mt-12">
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
          Pricing snapshot ({article.reviewed})
        </h2>
        <p className="mt-2 text-sm text-zinc-500">{article.pricingCaption}</p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3 font-semibold">Scenario</th>
                <th className="px-4 py-3 font-semibold">{nameA}</th>
                <th className="px-4 py-3 font-semibold">{nameB}</th>
              </tr>
            </thead>
            <tbody>
              {article.pricingRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-white/[0.04] last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-zinc-200">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{row.a}</td>
                  <td className="px-4 py-3 text-zinc-300">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-zinc-500">
          {article.pricingNotes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      </section>

      <section id="who" className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-display text-lg font-bold text-white">
            Choose {nameA} if
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {article.chooseA.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-400">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="font-display text-lg font-bold text-white">
            Choose {nameB} if
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {article.chooseB.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-400">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {article.sections.map((section) => (
        <section key={section.heading} className="mt-12">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            {section.heading}
          </h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-base leading-relaxed text-zinc-300">
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

export default ComparisonTemplate;
