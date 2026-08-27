import hubspotVsActivecampaign from './hubspot-vs-activecampaign';
import hubspotVsMailchimp from './hubspot-vs-mailchimp';
import klaviyoVsOmnisend from './klaviyo-vs-omnisend';
import mailchimpVsActivecampaign from './mailchimp-vs-activecampaign';
import mailchimpVsKlaviyo from './mailchimp-vs-klaviyo';
import makeVsZapier from './make-vs-zapier';
import salesforceVsHubspot from './salesforce-vs-hubspot';
import shopifyVsWoocommerce from './shopify-vs-woocommerce';
import type { LongformArticle } from './types';

const ARTICLES: LongformArticle[] = [
  hubspotVsActivecampaign,
  hubspotVsMailchimp,
  klaviyoVsOmnisend,
  mailchimpVsActivecampaign,
  mailchimpVsKlaviyo,
  makeVsZapier,
  salesforceVsHubspot,
  shopifyVsWoocommerce,
];

const BY_SLUG = new Map(ARTICLES.map((article) => [article.slug, article]));

export function getLongform(slug: string): LongformArticle | null {
  return BY_SLUG.get(slug) ?? null;
}

export function longformSlugs(): string[] {
  return ARTICLES.map((article) => article.slug);
}

export type { LongformArticle } from './types';
