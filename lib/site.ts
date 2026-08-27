/** Canonical public site URL used for sitemap, robots, and Open Graph. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://stackclash.io';

export const SITE_NAME = 'StackClash';

/** Short default title — names the category so Google does not attach the CVE/game/proxy entity. */
export const SITE_TITLE =
  'StackClash — CRM & Email Marketing Comparisons';

export const SITE_TAGLINE =
  'Side-by-side CRM, email, and marketing automation comparisons for teams choosing software.';

export const SITE_DESCRIPTION =
  'Side-by-side CRM, email, and marketing automation comparisons for teams choosing software. Not the Stack Clash CVE or Clash proxy apps.';

/** One-line entity disambiguation used on the homepage and About/methodology. */
export const SITE_DISAMBIGUATION =
  'StackClash is a marketing-software comparison site. It is not related to the 2017 Stack Clash security vulnerability, Clash proxy clients, or Stack Clash mobile games.';
