import Link from 'next/link';
import BrandMark from './BrandMark';
import { SITE_NAME } from '../lib/site';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-surface-950/80 backdrop-blur-xl">
      <div className="site-container flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <BrandMark className="h-8 w-8 shrink-0 shadow-glow rounded-lg" />
          <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-brand-300 transition">
            {SITE_NAME}
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/comparisons"
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            Comparisons
          </Link>
          <Link
            href="/tools"
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            Guides
          </Link>
          <Link href="/#featured" className="btn-primary !px-4 !py-2 text-xs sm:text-sm">
            Browse
          </Link>
        </nav>
      </div>
    </header>
  );
}
