import Link from 'next/link';
import comparisonData from '../data/production_comparisons.json';

export const metadata = {
  title: 'StackFlow | Marketing Automation Comparisons',
  description: 'The ultimate guide to choosing the right marketing automation integrations.',
};

export default function HomePage() {
  const featuredComparisons = comparisonData.slice(0, 6);

  return (
    <div className='min-h-screen bg-[#1a1a1a] text-white selection:bg-[#ff6600] selection:text-white'>
      <section className='relative overflow-hidden py-24 sm:py-32'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#ff660033,transparent_50%)]' />
        <div className='container relative mx-auto px-6 text-center'>
          <h1 className='text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-[#ff6600] mb-6'>
            Sync Your Stack. <br />Scale Your Growth.
          </h1>
          <p className='mx-auto max-w-2xl text-lg sm:text-xl text-gray-400 leading-relaxed mb-10'>
            The definitive comparison guide for marketing automation integrations.
          </p>
          <div className='flex justify-center gap-4'>
            <a href='#comparisons' className='rounded-full bg-[#ff6600] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#e65c00] shadow-[0_0_20px_rgba(255,102,0,0.3)]'>
              Explore Comparisons
            </a>
          </div>
        </div>
      </section>

      <section id='comparisons' className='py-24 bg-[#111]'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl font-bold text-center mb-12'>Trending Integrations</h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {featuredComparisons.map((comp, idx) => (
              <Link key={idx} href={'/' + comp.slug} className='group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 transition hover:border-[#ff6600]/50'>
                <h3 className='text-xl font-bold group-hover:text-[#ff6600] transition'>{comp.title}</h3>
                <p className='mt-4 text-sm text-gray-500'>Compare {comp.softwareA} vs {comp.softwareB}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className='py-12 border-t border-white/5 text-center'>
        <p className='text-sm text-gray-600'>&copy; {new Date().getFullYear()} StackFlow.</p>
      </footer>
    </div>
  );
}
