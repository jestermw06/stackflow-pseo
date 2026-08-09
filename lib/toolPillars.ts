/**
 * Hand-authored pillar copy for high-coverage tools.
 * Tools without an entry still get a solid /tools/[id] page from software.json + comparisons.
 */
export interface ToolPillarCopy {
  /** SEO-focused subtitle under the H1 */
  tagline: string;
  /** 1–2 short paragraphs */
  overview: string[];
  bestFor: string[];
  notIdealFor: string[];
  /** Optional pricing note — keep high-level; plans change */
  pricingNote?: string;
  verdict: string;
}

export const TOOL_PILLARS: Record<string, ToolPillarCopy> = {
  activecampaign: {
    tagline: 'Marketing automation + CRM for teams that outgrow basic email tools',
    overview: [
      'ActiveCampaign sits between simple ESPs and full enterprise suites: visual automations, lead scoring, and enough CRM to run sales-assisted funnels without a multi-hub Salesforce project.',
      'On StackClash we compare it most often against HubSpot, Klaviyo, Mailchimp, Pipedrive, and other MAP/CRM options—because that is where buyers actually get stuck.',
    ],
    bestFor: [
      'Mid-market teams that need automation depth and light CRM together',
      'B2B and services businesses nurturing leads into a pipeline',
      'Marketers who want scoring, conditional journeys, and sales handoff',
    ],
    notIdealFor: [
      'Pure DTC brands that need Klaviyo-class product/event data',
      'Enterprise orgs standardizing on Salesforce multi-cloud',
      'Creators who only need a simple newsletter stack (consider Kit)',
    ],
    pricingNote:
      'Plans scale with contacts and features. Expect to pay more as automation and CRM seats grow—compare total cost against HubSpot hubs and lighter ESPs.',
    verdict:
      'Strong default for growth teams that want serious automation without enterprise CRM complexity. Validate fit against HubSpot (all-in-one) and Klaviyo (e-commerce) using our head-to-heads below.',
  },
  hubspot: {
    tagline: 'All-in-one CRM, marketing, and service for teams building on one contact graph',
    overview: [
      'HubSpot is the growth platform many teams graduate into: free CRM entry, then Marketing, Sales, and Service hubs as needs expand.',
      'Buyers usually compare it to Salesforce (enterprise depth), Pipedrive (sales simplicity), ActiveCampaign (automation value), and support tools like Zendesk or Intercom.',
    ],
    bestFor: [
      'Teams that want marketing + sales + service on one database',
      'Companies starting free and expanding hubs over time',
      'Inbound-led motions with content and CRM together',
    ],
    notIdealFor: [
      'Orgs that only need a lightweight pipeline CRM',
      'Extreme enterprise customization better suited to Salesforce',
      'Pure e-commerce email teams better served by Klaviyo-class tools',
    ],
    pricingNote:
      'Hub costs stack by seat and hub. Model multi-hub pricing carefully against “good enough” automation CRMs.',
    verdict:
      'Best when you want one system of record for growth. If you only need email automation or a pure pipeline, lighter tools often win—see comparisons below.',
  },
  klaviyo: {
    tagline: 'Data-driven email and SMS for e-commerce brands',
    overview: [
      'Klaviyo is built around store and profile data: flows that react to browse, cart, purchase, and predicted value—not just blast campaigns.',
      'We match it against Mailchimp, Omnisend, ActiveCampaign, Kit, and Customer.io depending on whether the buyer is retail, creator, or product-led.',
    ],
    bestFor: [
      'Shopify/WooCommerce and similar DTC brands',
      'Teams that need email + SMS on shared profiles',
      'Marketers optimizing revenue per recipient, not just open rates',
    ],
    notIdealFor: [
      'B2B services that need CRM-first automation',
      'Creators who only need newsletter + digital products (Kit)',
      'Budgets that cannot absorb contact-based pricing at scale',
    ],
    pricingNote:
      'Pricing grows with active profiles and channels. High-volume stores should model SMS + email together.',
    verdict:
      'Default shortlist for serious e-commerce messaging. Non-retail teams should pressure-test against ActiveCampaign or HubSpot.',
  },
  mailchimp: {
    tagline: 'Approachable email marketing for campaigns and everyday lists',
    overview: [
      'Mailchimp remains a common first ESP: templates, simple automations, and broad brand familiarity.',
      'Comparisons on StackClash usually ask whether to stay with Mailchimp or move to Klaviyo, ActiveCampaign, Brevo, Omnisend, or Kit.',
    ],
    bestFor: [
      'Small teams starting email without heavy automation',
      'General brands and mixed audiences (not only DTC)',
      'Simple newsletters and basic journeys',
    ],
    notIdealFor: [
      'Advanced e-commerce personalization (Klaviyo/Omnisend)',
      'Deep CRM + scoring funnels (ActiveCampaign/HubSpot)',
      'Creator commerce stacks purpose-built in Kit',
    ],
    verdict:
      'Fine starting point; many StackClash readers outgrow it into MAP/CRM or commerce specialists—use the matchups below to decide.',
  },
  omnisend: {
    tagline: 'Multi-channel marketing automation for online stores',
    overview: [
      'Omnisend focuses on e-commerce journeys across email, SMS, and push—with product-aware campaigns aimed at store growth.',
      'Buyers compare it to Klaviyo (depth), Brevo (price/channels), Mailchimp (simplicity), and ActiveCampaign (CRM automation).',
    ],
    bestFor: [
      'Growing Shopify/Woo stores wanting email + SMS + push',
      'Teams that want commerce templates without stitching tools',
      'Mid-market retail that is not yet on enterprise Klaviyo complexity',
    ],
    notIdealFor: [
      'Non-retail B2B lead gen as the primary use case',
      'Creator newsletter businesses (Kit)',
      'Heavy CRM/sales pipeline requirements',
    ],
    verdict:
      'Strong multi-channel retail option. Compare with Klaviyo for data depth and Brevo for budget multi-channel.',
  },
  kit: {
    tagline: 'Creator-first email, landing pages, and digital-product funnels',
    overview: [
      'Kit (formerly ConvertKit) is built for creators: newsletters, tagging, landing pages, and selling digital products without enterprise CRM baggage.',
      'We compare it to Mailchimp, Brevo, ActiveCampaign, Klaviyo, and Customer.io so creators and small teams can pick the right lane.',
    ],
    bestFor: [
      'Creators, course sellers, and newsletter businesses',
      'Simple automations and audience tagging',
      'Landing pages and digital product workflows nearby',
    ],
    notIdealFor: [
      'Enterprise B2B CRM and sales ops',
      'Large-scale product-event e-commerce (Klaviyo)',
      'Agencies needing full MAP + pipeline CRM',
    ],
    verdict:
      'Best when the audience is creator- or newsletter-led. Commerce retailers and B2B teams should check the alternatives below.',
  },
  brevo: {
    tagline: 'Affordable multi-channel email, SMS, and transactional messaging',
    overview: [
      'Brevo (formerly Sendinblue) packages email, SMS, WhatsApp-style channels, transactional mail, and light CRM for SMBs that want breadth without flagship MAP pricing.',
      'StackClash comparisons often pit it against Mailchimp, ActiveCampaign, Omnisend, Kit, and Customer.io.',
    ],
    bestFor: [
      'SMBs needing email + SMS without complex stacks',
      'Teams that want transactional + marketing together',
      'Budget-conscious multi-channel experiments',
    ],
    notIdealFor: [
      'Advanced DTC predictive personalization',
      'Full HubSpot-style multi-hub CRM',
      'Creator-native product suites (Kit)',
    ],
    verdict:
      'Compelling value multi-channel play. Pressure-test automation depth vs ActiveCampaign and retail depth vs Omnisend/Klaviyo.',
  },
  customer_io: {
    tagline: 'Behavioral messaging for product- and event-led teams',
    overview: [
      'Customer.io is built around events and lifecycle messaging across email, push, SMS, and in-app—popular with product-led and technical growth teams.',
      'We compare it to Klaviyo, ActiveCampaign, Omnisend, Mailchimp, Brevo, and Kit depending on retail vs product vs creator needs.',
    ],
    bestFor: [
      'Product-led SaaS and app messaging',
      'Teams comfortable with event data and APIs',
      'Multi-channel lifecycle beyond blast email',
    ],
    notIdealFor: [
      'Non-technical teams wanting pure drag-and-drop ESP',
      'Retail brands standardized on Klaviyo’s store model',
      'Sales CRM-first organizations',
    ],
    verdict:
      'Excellent when product events drive the message. Marketers without event infrastructure may prefer ActiveCampaign or Klaviyo.',
  },
  salesforce: {
    tagline: 'Enterprise CRM platform for complex sales and multi-cloud stacks',
    overview: [
      'Salesforce is the enterprise CRM default: deep customization, ecosystem, and multi-cloud expansion—with matching implementation cost.',
      'StackClash focuses on Salesforce vs HubSpot, Pipedrive, Zoho CRM, and ActiveCampaign for buyers choosing platform weight.',
    ],
    bestFor: [
      'Large or complex sales organizations',
      'Teams that need heavy customization and partners',
      'Multi-cloud CRM/service/marketing roadmaps',
    ],
    notIdealFor: [
      'SMBs wanting fast time-to-value',
      'Teams that only need pipeline hygiene',
      'Budgets that cannot fund admin and implementation',
    ],
    verdict:
      'Choose Salesforce when platform ceiling matters more than speed. Otherwise HubSpot, Pipedrive, or Zoho often win—see below.',
  },
  pipedrive: {
    tagline: 'Sales-first CRM built around pipeline velocity',
    overview: [
      'Pipedrive optimizes for deal flow and activity-based selling with a UX sales teams actually use.',
      'Comparisons on StackClash typically weigh it against HubSpot, Salesforce, Zoho CRM, and ActiveCampaign.',
    ],
    bestFor: [
      'Sales teams that live in the pipeline daily',
      'SMB and mid-market orgs without heavy marketing CRM needs',
      'Fast onboarding for reps',
    ],
    notIdealFor: [
      'Marketing-led companies needing full MAP + CRM',
      'Enterprise multi-cloud requirements',
      'Support-first organizations',
    ],
    verdict:
      'Wins on sales adoption and clarity. Pair or switch when marketing automation becomes the bottleneck.',
  },
  zoho_crm: {
    tagline: 'Feature-rich CRM at mid-market pricing in the Zoho suite',
    overview: [
      'Zoho CRM delivers broad CRM capability at aggressive price points, especially if you already use Zoho apps.',
      'We compare it with HubSpot, Salesforce, Pipedrive, and ActiveCampaign for buyers balancing cost and depth.',
    ],
    bestFor: [
      'Cost-conscious teams needing real CRM modules',
      'Companies standardized on Zoho',
      'SMBs avoiding HubSpot hub stacks or Salesforce SI projects',
    ],
    notIdealFor: [
      'Teams that want HubSpot-class inbound marketing built-in',
      'Orgs needing Salesforce-scale ecosystems',
      'Sales teams that prefer Pipedrive’s pure pipeline UX',
    ],
    verdict:
      'Strong value CRM option. Validate marketing automation and UX against HubSpot and Pipedrive in the matchups below.',
  },
};

/** Minimum comparisons before we list a tool on /tools index */
export const TOOL_PILLAR_MIN_COMPARISONS = 4;
