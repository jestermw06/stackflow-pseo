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
      'Contact-banded. Starter is commonly ~$15/mo at 1,000 contacts but caps automations at 5 actions — budget Plus (~$49/mo at 1k) as the real product. Pro ~$79/mo and Enterprise ~$145/mo at 1k contacts (2026 list, annual). SMS, WhatsApp, and enhanced CRM are add-ons. Confirm on activecampaign.com/pricing.',
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
      'Free CRM, then Marketing Starter ~$15–20/seat/mo. Marketing Hub Professional is ~$890/mo annual (3 seats, 2,000 marketing contacts) plus a mandatory ~$3,000 onboarding fee. Enterprise ~$3,600/mo + ~$7,000 onboarding. Extra hubs and contact tiers stack. Confirm on hubspot.com/pricing.',
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
      'Active profiles, not just last month’s recipients. Free: 250 profiles / 500 emails. Email plan ~$20 at 500, ~$30 at 1,000, ~$150 at 10,000, ~$720 at 50,000 (Aug 2026). Email + SMS from ~$35 at the first paid band. Suppress cold profiles or you pay for ghosts. Confirm on klaviyo.com/pricing.',
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
    pricingNote:
      'Free under 250 contacts. Standard and Premium are contact-tiered; public tiles often show intro rates (Standard commonly ~$20/mo at small lists; Premium from ~$350/mo intro). SMS is a credit add-on in select countries. Confirm on mailchimp.com/pricing.',
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
    pricingNote:
      'Free: 250 contacts / 500 emails. Standard is list-based (promo tiles often ~$11–16/mo at 500 contacts). Pro adds unlimited email (fair use) and SMS credits from about $0.007–0.009/US message at volume. 3-month-upfront discounts expire — model the list price. Confirm on omnisend.com/pricing.',
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
    pricingNote:
      'Seat × cloud × implementation. Public Starter tiles understate TCO. Budget licenses plus an admin or SI. Marketing is usually another cloud. Compare apples-to-apples against HubSpot hubs, not a $25/user headline.',
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
  zapier: {
    tagline: 'No-code automation across 9,000+ apps — the default connector layer',
    overview: [
      'Zapier is the safest way to move data between apps without engineering: linear Zaps, a huge catalog, and a 2026 surface that includes Agents, Tables, Forms, Canvas, and MCP. Professional starts at $19.99/month annually for 750 tasks.',
      'On StackClash we put it next to Make (visual canvas, cheaper credits). If you need an obscure app or non-technical builders, start here. If multi-step volume would explode the task bill, read the Make matchup.',
    ],
    bestFor: [
      'Teams that need breadth of native apps more than a visual canvas',
      'Non-technical operators shipping linear workflows',
      'Orgs that want Team/Enterprise governance, SSO, and shared connections',
    ],
    notIdealFor: [
      'High-volume multi-step scenarios where every action is a task',
      'Heavy branching, loops, and array iteration (Make is more natural)',
      'Teams that want self-hosted automation (look at n8n)',
    ],
    pricingNote:
      'Free: 100 tasks/mo, two-step Zaps. Professional $19.99/mo annual at 750 tasks; $129/mo annual at 10,000 tasks. Team from $69/mo annual at 2,000 tasks. Tasks = successful action steps. Confirm on zapier.com/pricing.',
    verdict:
      'Default shortlist for app-to-app automation. Pressure-test against Make when workflows get branchy or the task bill climbs.',
  },
  make: {
    tagline: 'Visual automation canvas billed in credits — stronger at complexity and volume',
    overview: [
      'Make (formerly Integromat) is a graph editor: routers, iterators, aggregators, HTTP. Credits replaced operations on 27 August 2025; most non-AI modules still cost one credit per run.',
      'We compare it with Zapier because that is the actual buying question. Make usually wins unit economics. Zapier usually wins catalog and ease.',
    ],
    bestFor: [
      'Power users drawing branching scenarios',
      'Volume that would make Zapier tasks expensive',
      'Teams comfortable owning a credit meter and a canvas',
    ],
    notIdealFor: [
      'Non-technical teams that need a linear builder',
      'A critical app that only works well as a Zapier native',
      'Enterprise governance as the first requirement',
    ],
    pricingNote:
      'Free: 1,000 credits, 2 active scenarios. Core ~$9–12/mo annual for 10,000 credits (Make moved Core pricing during 2026 — confirm the slider). Pro and Teams add observability and roles at the same 10k-credit entry. Annual is typically ~15%+ off monthly. See make.com/en/pricing.',
    verdict:
      'Best when the workflow is a diagram, not a list. Read Make vs Zapier before you standardize the company on either.',
  },
  shopify: {
    tagline: 'Hosted commerce platform — checkout, payments, admin, and app store in one bill',
    overview: [
      'Shopify is the default hosted store: Basic $29/mo annual, Grow $79, Advanced $299, Plus from $2,300. Shopify Payments rates start at 2.9% + 30¢ online on Basic. POS Pro is $89/location/month.',
      'We compare it with WooCommerce, the WordPress alternative. Shopify wins operational simplicity. Woo wins ownership and CMS depth.',
    ],
    bestFor: [
      'Merchants who want to sell, not run servers',
      'Brands that need POS and multi-channel without stitching',
      'Teams that will pay a platform tax for checkout conversion and uptime',
    ],
    notIdealFor: [
      'WordPress-native content machines that need unconstrained PHP',
      'Catalogs and memberships Shopify apps cannot model cleanly',
      'Operators who refuse SaaS lock-in on the product database',
    ],
    pricingNote:
      'Annual: Basic $29/mo, Grow $79, Advanced $299, Plus from $2,300. Monthly is higher ($39 / $105 / $399). Third-party payment fees apply if you skip Shopify Payments (2% on Basic). Confirm on shopify.com/pricing.',
    verdict:
      'Wins for most merchants. If WordPress is already the business, read Shopify vs WooCommerce before you migrate.',
  },
  woocommerce: {
    tagline: 'Free WordPress commerce plugin — you own the stack and the maintenance',
    overview: [
      'WooCommerce is open-source ecommerce on WordPress. The plugin is free. Hosting, theme, extensions, and the person who patches them are not. Payment processing is usually Stripe/WooPayments at network rates, without a Shopify overlay fee.',
      'We compare it with Shopify for the hosted vs owned decision. Pick Woo when you have WordPress skills (or a retainer) and need customization Shopify will not give you.',
    ],
    bestFor: [
      'Sites already on WordPress where content and commerce must share a CMS',
      'Custom product types, memberships, or ERP-tied catalogs',
      'Teams that will own hosting, backups, and plugin hygiene',
    ],
    notIdealFor: [
      'Solo merchants with no developer on call',
      'Operators who need a supported POS and checkout as a product',
      'Anyone choosing Woo only because “it’s free”',
    ],
    pricingNote:
      'Software $0. Add hosting ($10–80+/mo typical), theme, extensions, and card rates. TCO is a project budget, not a tile. Official: woocommerce.com.',
    verdict:
      'Right when you need ownership. Wrong as a free Shopify. See the Shopify matchup for the honest cost comparison.',
  },
};

/** Minimum comparisons before we list a tool on /tools index */
export const TOOL_PILLAR_MIN_COMPARISONS = 4;
