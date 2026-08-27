import type { FaqItem } from './longform/types';
import { SITE_DESCRIPTION, SITE_DISAMBIGUATION, SITE_NAME, SITE_URL } from './site';
import type { Comparison, Software } from './types';

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: ['StackClash.io', 'Stack Clash MarTech'],
    url: SITE_URL,
    description: `${SITE_DESCRIPTION} ${SITE_DISAMBIGUATION}`,
    knowsAbout: [
      'marketing automation',
      'CRM software',
      'email marketing',
      'ecommerce platforms',
    ],
    disambiguatingDescription: SITE_DISAMBIGUATION,
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function articleJsonLd(comparison: Comparison, reviewed: string) {
  const title =
    comparison.title ||
    `${comparison.softwareA?.name} vs ${comparison.softwareB?.name}`;
  const url = `${SITE_URL}/${comparison.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: comparison.verdictReason,
    dateModified: reviewed,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: url,
    about: [
      comparison.softwareA?.name,
      comparison.softwareB?.name,
      'software comparison',
    ].filter(Boolean),
  };
}

export function softwareGuideJsonLd(software: Software, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: software.name,
    applicationCategory: software.category,
    url: software.official_url,
    description,
    sameAs: software.official_url,
  };
}

export function homeItemListJsonLd(comparisons: Comparison[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} software comparisons`,
    itemListElement: comparisons.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${c.slug}`,
      name: c.title || `${c.softwareA?.name} vs ${c.softwareB?.name}`,
    })),
  };
}

export function comparisonJsonLd(comparison: Comparison) {
  const title =
    comparison.title ||
    `${comparison.softwareA?.name} vs ${comparison.softwareB?.name}`;
  const url = `${SITE_URL}/${comparison.slug}`;
  const nameA = comparison.softwareA?.name ?? 'Software A';
  const nameB = comparison.softwareB?.name ?? 'Software B';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url,
    description: comparison.verdictReason,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Comparisons',
          item: `${SITE_URL}/comparisons`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: url,
        },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      name: title,
      description: comparison.verdictReason,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: nameA,
            applicationCategory: comparison.softwareA?.category,
            url: comparison.softwareA?.official_url,
            description: comparison.softwareA?.description,
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: nameB,
            applicationCategory: comparison.softwareB?.category,
            url: comparison.softwareB?.official_url,
            description: comparison.softwareB?.description,
          },
        },
      ],
    },
    about: [
      {
        '@type': 'SoftwareApplication',
        name: nameA,
        applicationCategory: comparison.softwareA?.category,
      },
      {
        '@type': 'SoftwareApplication',
        name: nameB,
        applicationCategory: comparison.softwareB?.category,
      },
    ],
    speaksAbout: comparison.verdict
      ? `Verdict: ${comparison.verdict}. ${comparison.verdictReason || ''}`
      : comparison.verdictReason,
  };
}
