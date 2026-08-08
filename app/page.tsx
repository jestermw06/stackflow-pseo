import Link from 'next/link';
import comparisonData from '../data/production_comparisons.json';

export const metadata = {
  title: 'StackFlow | Marketing Automation Comparisons',
  description: 'The ultimate guide to choosing the right marketing automation integrations.',
};

export default function HomePage() {
  // Get top 6 comparisons for the feature grid
  const featuredComparisons = comparisonData.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#ff6600] selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#ff660033,transparent_50%)]" />
        <div className="container relative mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-[#ff6600] mb-6">
            Sync Your Stack. <br />Scale Your Growth.
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-400 leading-relaxed mb-10">
            The definitive comparison guide for marketing automation integrations. 
            Find the perfect connection between your CRM, Email, and Lead Gen tools in seconds.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="#comparisons" 
              className="rounded-full bg-[#ff6600] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#e65c00] shadow-[0_0_20px_rgba(255,102,0,0.3)]"
            >
              Explore Comparisons
            </a>
          </div>
        </div>
      </section>

      {/* Featured Grid Section */}
      <section id="comparisons" className="py-24 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Trending Integrations</h2>
            <div className="h-1 w-20 bg-[#ff6600] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredComparisons.map((comp, idx) => (
              <Link 
                key={idx} 
                href={`/${comp.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 transition hover:border-[#ff6600]/50 hover:shadow-[0_0_30px_rgba(255,102,0,0.1)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ff6600]">Comparison</span>
                  <div className="h-2 w-2 rounded-full bg-[#ff6600] animate-pulse" />
                </div>
                
                <h3 className="text-xl font-bold leading-tight group-hover:text-[#ff6600] transition">
                  {comp.title}
                </h3>
                
                <p className="mt-4 text-sm text-gray-500 line-clamp-2">
                  Analyze pros, cons, and seamless connectivity between {comp.softwareA} and {comp.softwareB}.
                </p>

                <div className="mt-6 flex items-center text-sm font-medium text-[#ff6600]">
                  View Full Analysis 
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6600]/10 text-[#ff6600]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Instant access to technical integration data. No fluff, just facts and high-speed comparisons.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6600]/10 text-[#ff6600]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.954 11.954 0 0112 2.944a11.954 11.954 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Bulletproof Data</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every comparison is verified by advanced AI models to ensure accuracy and deep technical insight.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6600]/10 text-[#ff6600]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3a1 1 0 10-2 0v1m2 16a1 1 0 10-2 0v-1m2-10a1 1 0 10-2 0v-1m2 10a1 1 0 10-2 0v-1m-4 4h4m-6 0H3m18 0h-3m-3 0V7m0 10V7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">SEO Optimized</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Built for speed and visibility. We target the integrations that matter most to your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} StackFlow. Built for high-performance automation experts.
        </p>
      </footer>
    </div>
  );
}
