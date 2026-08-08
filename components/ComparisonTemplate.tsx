import React from 'react';
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans text-gray-100">
      <header className="text-center mb-16">
        <p className="text-xs font-bold uppercase tracking-widest text-[#ff6600] mb-3">
          Comparison
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {nameA} <span className="text-[#ff6600]">vs</span> {nameB}
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Which platform fits your stack? Features, strengths, and a clear verdict.
        </p>
      </header>

      <section className="bg-[#ff6600]/10 border border-[#ff6600]/30 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">The Quick Verdict</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/10 text-center min-w-[200px]">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-1 font-semibold">
              Winner
            </p>
            <p className="text-2xl font-black text-[#ff6600]">{verdict}</p>
          </div>
          <div className="flex-1">
            <p className="text-lg text-gray-300 italic leading-relaxed">
              &ldquo;{verdictReason}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {comparisonPoints.length > 0 && (
        <section className="mb-16 overflow-x-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Feature Matchup</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-sm uppercase tracking-wider text-gray-500">
                <th className="py-3 pr-4 font-semibold">Feature</th>
                <th className="py-3 px-4 font-semibold text-center">{nameA}</th>
                <th className="py-3 pl-4 font-semibold text-center">{nameB}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonPoints.map((point, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 pr-4 text-gray-300">{point.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {point.softwareA ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="py-3 pl-4 text-center">
                    {point.softwareB ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="grid md:grid-cols-2 gap-8 mb-20">
        <ProsConsCard
          title={nameA}
          pros={prosA}
          cons={consA}
        />
        <ProsConsCard
          title={nameB}
          pros={prosB}
          cons={consB}
        />
      </section>

      <footer className="mt-24 pt-12 border-t border-white/10 text-center">
        <p className="text-gray-500 mb-6">Ready to automate your workflow?</p>
        <div className="flex flex-wrap justify-center gap-4">
          {softwareA?.official_url && (
            <a
              href={softwareA.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all"
            >
              Try {nameA}
            </a>
          )}
          {softwareB?.official_url && (
            <a
              href={softwareB.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#ff6600] text-white rounded-lg font-bold hover:bg-[#e65c00] transition-all shadow-lg"
            >
              Try {nameB}
            </a>
          )}
        </div>
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
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-bold text-white">{title} Pros</h3>
      <ul className="space-y-2">
        {pros.length === 0 ? (
          <li className="text-gray-500 text-sm">No pros listed.</li>
        ) : (
          pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-green-400 font-medium">
              <span aria-hidden>✓</span> {pro}
            </li>
          ))
        )}
      </ul>
      <h3 className="text-xl font-bold text-white mt-6">{title} Cons</h3>
      <ul className="space-y-2">
        {cons.length === 0 ? (
          <li className="text-gray-500 text-sm">No cons listed.</li>
        ) : (
          cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-red-400 font-medium">
              <span aria-hidden>✕</span> {con}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ComparisonTemplate;
