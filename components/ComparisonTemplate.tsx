import React from 'react';

interface Software {
  name: string;
  category: string;
  description: string;
  key_features: string[];
  official_url: string;
}

interface ComparisonProps {
  softwareA: Software;
  softwareB: Software;
  verdict: string;
  verdictReason: string;
  prosA: string[];
  consA: string[];
  prosB: string[];
  consB: string[];
}

const ComparisonTemplate: React.FC<ComparisonProps> = ({ 
  softwareA, 
  softwareB, 
  verdict, 
  verdictReason,
  prosA,
  consA,
  prosB,
  consB
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans text-slate-900">
      {/* Hero Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {softwareA.name} <span className="text-orange-600">vs</span> {softwareB.name}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Which platform is best for your business? We compare features, pricing, and integration capabilities to help you decide.
        </p>
      </header>

      {/* Quick Verdict Card */}
      <section className="bg-orange-50 border border-orange-200 rounded-2xl p-8 mb-16 shadow-sm">
        <h2 className="text-2xl font-bold text-orange-900 mb-4">The Quick Verdict</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100 text-center min-w-[200px]">
            <p className="text-sm uppercase tracking-widest text-slate.500 mb-1 font-semibold">Winner</p>
            <p className="text-2xl font-black text-orange-600">{verdict}</p>
          </div>
          <div className="flex-1">
            <p className="text-lg text-orange-800 italic leading-relaxed">
              "{verdictReason}"
            </p>
          </div>
        </div>
      </section>

      {/* Pros & Cons Section */}
      <section className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">{softwareA.name} Pros</h3>
          <ul className="space-y-2">
            {prosA.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-green-700 font-medium">
                <span>✓</span> {pro}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-bold text-slate-800 mt-6">{softwareA.name} Cons</h3>
          <ul className="space-y-2">
            {consA.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-red-700 font-medium">
                <span>✕</span> {con}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">{softwareB.name} Pros</h3>
          <ul className="space-y-2">
            {prosB.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-green-700 font-medium">
                <span>✓</span> {pro}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-bold text-slate-800 mt-6">{softwareB.name} Cons</h3>
          <ul className="space-y-2">
            {consB.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-red-700 font-medium">
                <span>✕</span> {con}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="mt-24 pt-12 border-t border-slate-200 text-center">
        <p className="text-slate-500 mb-6">Ready to automate your workflow?</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={softwareA.official_url} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg">
            Try {softwareA.name}
          </a>
          <a href={softwareB.official_url} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-500 transition-all shadow-lg">
            Try {softwareB.name}
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ComparisonTemplate;
