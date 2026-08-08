import Link from 'next/link';
import { SITE_NAME } from '../lib/site';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-xs font-bold uppercase tracking-widest text-[#ff6600] mb-4">
          404
        </p>
        <h1 className="text-3xl font-extrabold mb-3">Page not found</h1>
        <p className="text-gray-400 mb-8">
          That comparison doesn&apos;t exist (or the URL is wrong). Browse live
          matchups on {SITE_NAME}.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-[#ff6600] px-6 py-3 font-bold text-white hover:bg-[#e65c00] transition"
          >
            Home
          </Link>
          <Link
            href="/comparisons"
            className="rounded-full border border-white/20 px-6 py-3 font-bold text-white hover:border-[#ff6600] transition"
          >
            All comparisons
          </Link>
        </div>
      </div>
    </main>
  );
}
