import type { LongformArticle } from './types';

const article: LongformArticle = {
  slug: 'shopify-vs-woocommerce',
  reviewed: 'August 27, 2026',
  dek: 'Shopify wins for most merchants who want a hosted store that just works. WooCommerce wins when you need full WordPress ownership and are willing to operate it.',
  intro: [
    'Shopify vs WooCommerce is hosted commerce versus a WordPress plugin. Shopify is a product: checkout, payments, hosting, admin, POS, and an app store, with plans from $29/month annually (Basic) to $79 (Grow) to $299 (Advanced) and Plus from $2,300/month. Card rates start at 2.9% + 30¢ on Basic with Shopify Payments, falling as you climb plans. WooCommerce is free software. You still pay for WordPress hosting, a domain, SSL (usually included), a theme, extensions, and someone to keep PHP, plugins, and checkouts from colliding.',
    'Total cost of ownership is where WooCommerce “is free” dies. A competent Woo store is hosting ($10–50+/month), premium theme, payment fees (Stripe/WooPayments similar to card networks), and $200–2,000+ in extensions over a year — plus the hours. Shopify’s subscription is obvious; its apps and payment rates are the hidden line. High-volume merchants still often prefer Shopify’s checkout conversion and operational ceiling. Developers who want to own every template and data table still prefer Woo.',
    'StackClash gives Shopify the verdict for most merchants. WooCommerce is the right call when WordPress is already the CMS, you need unconstrained customization, or you refuse a SaaS tax on the catalog. If you do not have a developer on call, do not pick Woo because it is free.',
  ],
  scores: [
    {
      criterion: 'Time to a working store',
      a: 9,
      b: 5,
      note: 'Shopify can be live this week. Woo is a WordPress project.',
    },
    {
      criterion: 'Checkout conversion / ops',
      a: 9,
      b: 6,
      note: 'Shopify’s checkout is the product. Woo checkout quality depends on your stack.',
    },
    {
      criterion: 'Customization / ownership',
      a: 6,
      b: 10,
      note: 'Woo is your database and your PHP. Shopify is a platform with APIs and theme limits (Plus unlocks more).',
    },
    {
      criterion: 'Predictable cost',
      a: 7,
      b: 5,
      note: 'Shopify is a visible bill plus apps. Woo is a fog of plugins and retainers.',
    },
    {
      criterion: 'WordPress content + commerce',
      a: 5,
      b: 9,
      note: 'If the blog is the business, Woo stays in the CMS you already run.',
    },
    {
      criterion: 'POS / omnichannel',
      a: 9,
      b: 5,
      note: 'Shopify POS is a real retail product (POS Pro $89/location/month). Woo is assembled.',
    },
  ],
  differ: [
    'Shopify hosts the store. PCI, SSL, scaling Black Friday, and core checkout are their problem. You pay a subscription and rates, and you live inside their admin, Liquid/OS 2.0 themes, and app review process. Plus ($2,300+/month) is for checkout extensibility, B2B catalogs, and higher API limits.',
    'WooCommerce runs on your WordPress. You pick host (WP Engine, Kinsta, Cloudways, cheap shared — choose poorly and the store feels cheap). Extensions for subscriptions, bookings, wholesale, and memberships are a marketplace with overlapping quality. You can fork anything. You must patch anything.',
    'Payments: Shopify Payments avoids extra third-party transaction fees if you stay on it; using Stripe on Shopify still incurs Shopify’s third-party fee (2% on Basic, lower on higher plans). Woo typically uses Stripe/WooPayments/PayPal at processor rates without a platform overlay, which can beat Shopify on fees at volume if you operate well.',
  ],
  chooseA: [
    'You want to sell, not run servers and plugin updates',
    'Checkout conversion and uptime matter more than owning the database',
    'You need POS, Shop app, or multi-channel without stitching',
    'You will pay $29–299/mo plus apps and card rates for that operational floor',
  ],
  chooseB: [
    'WordPress is already the site and the team speaks PHP',
    'You need custom product types, memberships, or logic Shopify apps cannot do cleanly',
    'You want to own data and avoid a platform exit tax later',
    'You have (or will hire) someone to own hosting, backups, and plugin hygiene',
  ],
  pricingCaption:
    'USD, Shopify annual list prices from shopify.com/pricing (August 2026). WooCommerce is the official plugin — hosting and extensions vary.',
  pricingRows: [
    {
      label: 'Software',
      a: 'Basic $29/mo annual ($39 monthly)',
      b: 'Plugin $0',
    },
    {
      label: 'Next tiers',
      a: 'Grow $79/mo annual; Advanced $299/mo annual',
      b: 'Hosting typically $10–80+/mo; premium themes extra',
    },
    {
      label: 'High end',
      a: 'Plus from $2,300/mo',
      b: 'Enterprise WordPress hosts + agency retainers',
    },
    {
      label: 'Online card rates (typical US)',
      a: 'Shopify Payments from 2.9%+30¢ (Basic) to 2.5%+30¢ (Advanced)',
      b: 'Stripe/WooPayments network rates; no Shopify overlay',
    },
    {
      label: 'POS',
      a: 'Lite included; POS Pro $89/mo per location',
      b: 'Hardware + plugins; you assemble it',
    },
  ],
  pricingNotes: [
    'Shopify third-party payment fees apply if you do not use Shopify Payments (2% Basic, 1% Grow, 0.6% Advanced, 0.2% Plus).',
    'Woo “free” ignores theme, page builder, subscriptions plugin, page speed, and the person who updates WooCommerce after a core release.',
    'App stores on both sides become a second rent. Audit monthly.',
    'Migrating off Shopify is a project. Migrating off Woo is also a project. Neither is casual.',
  ],
  sections: [
    {
      heading: 'Checkout and conversion',
      paragraphs: [
        'Shopify markets checkout conversion as the reason to stay. Shop Pay, a tightly controlled checkout, and less plugin roulette are real. Woo can match a good checkout with the right theme and a disciplined plugin list; many stores do not have that discipline. If you cannot name your hosting stack and your last WooCommerce update, Shopify is safer.',
      ],
    },
    {
      heading: 'Customization reality in 2026',
      paragraphs: [
        'Shopify themes plus Checkout Extensibility (especially on Plus) cover more than 2019 Shopify did. You still do not own the database. Woo still wins weird catalogs, custom memberships, and “this ERP must write to these tables.” Headless is available on both; it is not a reason to pick Woo by itself.',
      ],
    },
    {
      heading: 'Content and SEO',
      paragraphs: [
        'WordPress is still the better general CMS. If your growth loop is publishing and the store is attached to the editorial machine, Woo keeps URLs, plugins, and editorial workflow in one place. Shopify’s blog is fine for a brand journal, not a media company. SEO differences are mostly implementation, not magic platform juice — slow Woo hosts lose to average Shopify stores on Core Web Vitals every day.',
      ],
    },
    {
      heading: 'Who actually regrets which',
      paragraphs: [
        'Shopify regrets: app stack costs, wanting a data model they do not control, Plus sticker shock. Woo regrets: a $12 host, twenty plugins, a broken checkout after an auto-update, and no owner. Pick the regret you can live with.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is WooCommerce really free?',
      a: 'The plugin is. The store is not. Hosting, theme, extensions, payments, and maintenance are the real bill.',
    },
    {
      q: 'Is Shopify cheaper than WooCommerce?',
      a: 'For a solo merchant who would otherwise hire a developer, Shopify is often cheaper in time and incidents. At scale, payment rates and apps can make Shopify more expensive than a well-run Woo + Stripe stack.',
    },
    {
      q: 'Which is better for SEO?',
      a: 'Neither automatically. WordPress gives more CMS control. Shopify gives more consistent performance if you do not wreck the theme with apps.',
    },
    {
      q: 'Can I migrate from Woo to Shopify (or back)?',
      a: 'Yes. Products and customers move. Redirects, apps, and theme logic are the work. Budget it as a launch, not an export.',
    },
    {
      q: 'What about Shopify Plus vs Woo at enterprise?',
      a: 'Plus is the supported commerce cloud with checkout customization and B2B. Enterprise Woo is a custom WordPress program. Choose based on team (platform ops vs PHP shop), not the logo.',
    },
  ],
  sources: [
    { label: 'Shopify pricing', href: 'https://www.shopify.com/pricing' },
    { label: 'WooCommerce', href: 'https://woocommerce.com' },
  ],
};

export default article;
