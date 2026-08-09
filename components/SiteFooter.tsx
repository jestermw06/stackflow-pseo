import Link from 'next/link';
import BrandMark from './BrandMark';
import { SITE_NAME } from '../lib/site';

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-surface-900/50">
      <div className="site-container flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <BrandMark className="h-7 w-7 shrink-0 rounded-md" />
          <span className="text-sm font-semibold text-zinc-300">{SITE_NAME}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <Link href="/comparisons" className="hover:text-brand-400 transition">
            Comparisons
          </Link>
          <Link href="/tools" className="hover:text-brand-400 transition">
            Guides
          </Link>
          <Link href="/sitemap.xml" className="hover:text-brand-400 transition">
            Sitemap
          </Link>
        </div>
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
