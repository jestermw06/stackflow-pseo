import Link from 'next/link';
import { SITE_NAME } from '../lib/site';

export default function NotFound() {
  return (
    <main className="site-container flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="section-title">Page not found</h1>
      <p className="mt-3 max-w-md text-zinc-500">
        That comparison doesn&apos;t exist (or the URL is wrong). Browse live
        matchups on {SITE_NAME}.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link href="/comparisons" className="btn-secondary">
          All comparisons
        </Link>
      </div>
    </main>
  );
}
