/** Canonical public site URL used for sitemap, robots, and Open Graph. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://stackclash.io';

export const SITE_NAME = 'StackClash';

export const SITE_DESCRIPTION =
  'Deep technical comparisons for marketing automation tools and integrations. Choose the right CRM, email, and workflow stack.';
