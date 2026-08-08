/** Canonical public site URL used for sitemap, robots, and Open Graph. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://stackflow-pseo.vercel.app';

export const SITE_NAME = 'StackFlow';

export const SITE_DESCRIPTION =
  'Deep technical comparisons for marketing automation tools and integrations. Choose the right CRM, email, and workflow stack.';
