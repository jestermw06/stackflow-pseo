import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import {
  getComparisonsForTool,
  getPillarToolIds,
  getSoftwareById,
} from '../../lib/tools';

export const metadata: Metadata = {
  title: 'Software Guides',
  description: `In-depth guides and comparison hubs for marketing automation, CRM, and email tools on ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/tools` },
};

export default function ToolsIndexPage() {
  const ids = getPillarToolIds();

  return (
    <main className="site-container py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow mb-2">Guides</p>
        <h1 className="section-title">Software guides</h1>
        <p className="mt-3 text-zinc-500">
          Hub pages for tools we cover most—with every head-to-head matchup in
          one place. Start here, then drill into a comparison.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ids.map((id) => {
          const software = getSoftwareById(id);
          if (!software) return null;
          const count = getComparisonsForTool(id).length;
          return (
            <li key={id}>
              <Link href={`/tools/${id}`} className="card-hover flex h-full flex-col p-6 group">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  {software.category}
                </span>
                <h2 className="mt-2 font-display text-xl font-semibold text-white group-hover:text-brand-300 transition">
                  {software.name}
                </h2>
                <p className="mt-2 flex-1 text-sm text-zinc-500 line-clamp-2">
                  {software.description}
                </p>
                <p className="mt-4 text-xs font-semibold text-brand-400">
                  {count} comparisons →
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
