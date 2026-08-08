import affiliateData from '../data/affiliates.json';

const links = (affiliateData as { links: Record<string, string> }).links || {};

/**
 * Resolve outbound CTA URL for a software tool.
 * Prefers affiliate map; falls back to official_url.
 */
export function getOutboundUrl(
  softwareId: string | undefined,
  officialUrl?: string
): string {
  if (softwareId && links[softwareId]) {
    return links[softwareId];
  }
  return officialUrl || '#';
}

/** True when the URL comes from the affiliate map (mark as sponsored). */
export function isAffiliateLink(softwareId: string | undefined): boolean {
  return Boolean(softwareId && links[softwareId]);
}
