import type { LongformArticle } from './types';

const article: LongformArticle = {
  slug: 'salesforce-vs-hubspot',
  reviewed: 'August 27, 2026',
  dek: 'HubSpot wins for most growing teams that want CRM + marketing without a multi-cloud project. Salesforce wins when enterprise process, ecosystem, and customization are the actual requirements.',
  intro: [
    'Salesforce vs HubSpot is platform gravity versus time-to-value. Salesforce is the enterprise CRM default: Sales Cloud, Service Cloud, Marketing Cloud / Account Engagement, AppExchange, and a partner army. HubSpot is the inbound CRM that became a multi-hub customer platform — free CRM, then Marketing, Sales, Service, Content, Data hubs that a mid-market team can actually turn on.',
    'Price stories that say “Salesforce starts at $25/user” and “HubSpot is $890/month” are both true and both incomplete. Salesforce’s bill is seats × clouds × implementation. A 20-rep Sales Cloud Enterprise deployment is a six-figure first year once you add licenses, a SI, and marketing. HubSpot Marketing Hub Professional is ~$890/month plus ~$3,000 onboarding; Sales Hub Professional is a per-seat add. HubSpot can still be cheaper than Salesforce for a 10–40 person GTM team. Salesforce can be cheaper per capability at 400 seats with an existing operating model.',
    'StackClash gives HubSpot the verdict for most growing teams. Salesforce keeps the win for complex enterprises, heavy customization, and orgs that already speak Salesforce. If you do not have an admin (or a budget to rent one), do not buy Salesforce because it is “what serious companies use.”',
  ],
  scores: [
    {
      criterion: 'Time to value',
      a: 5,
      b: 9,
      note: 'HubSpot can be useful in weeks. Salesforce is a program.',
    },
    {
      criterion: 'Customization ceiling',
      a: 10,
      b: 7,
      note: 'Salesforce still goes further (objects, automation, industry clouds). HubSpot is catching up, not caught.',
    },
    {
      criterion: 'Marketing + CRM native',
      a: 6,
      b: 9,
      note: 'HubSpot marketing lives on the CRM. Salesforce marketing is often another cloud (and another project).',
    },
    {
      criterion: 'Ecosystem / ISVs',
      a: 10,
      b: 7,
      note: 'AppExchange remains deeper. HubSpot’s app library covers SMB/mid-market well.',
    },
    {
      criterion: 'Cost for a 15-person GTM team',
      a: 5,
      b: 8,
      note: 'HubSpot usually wins TCO before enterprise discounts and existing SFDC estates.',
    },
    {
      criterion: 'Enterprise process / compliance',
      a: 9,
      b: 7,
      note: 'Salesforce if you have real security, sharing, and multi-entity requirements.',
    },
  ],
  differ: [
    'HubSpot’s bet is one contact graph and opinionated hubs. Lifecycle stages, conversations, and marketing email are in the same UI as deals. That opinionation is why HubSpot feels “easy” and why some enterprises bounce off it when they need 14 record types and a territory model from 2009.',
    'Salesforce’s bet is a data model you can reshape. Flows, Apex, Lightning, Experience Cloud, and industry SKUs exist because a generic CRM cannot encode every company. The cost of that power is administration. Unadministered Salesforce is a worse CRM than HubSpot Starter.',
    'Marketing is the usual trap. HubSpot Marketing Professional is a MAP on the CRM. Salesforce marketing may mean Marketing Cloud, Account Engagement (Pardot), or a third ESP. Adding “Salesforce for sales” and keeping Mailchimp is a valid architecture. Adding Salesforce because you wanted HubSpot-like inbound is how projects go sideways.',
  ],
  chooseA: [
    'You have (or will hire) Salesforce admins / a SI',
    'Sharing rules, complex objects, and AppExchange are requirements',
    'Multiple clouds or an existing Salesforce estate already exist',
    'Sales process complexity is the problem, not “we need a nicer CRM”',
  ],
  chooseB: [
    'Marketing and sales should share one database from week one',
    'You want a usable free CRM and a path to paid hubs',
    'You do not have a six-figure implementation budget',
    'You are mid-market, inbound-led, or replacing a pile of SMB tools',
  ],
  pricingCaption:
    'USD 2026 directional TCO — not a quote. Salesforce list prices vary by edition and agreement. HubSpot figures are published Marketing/Sales hub list prices.',
  pricingRows: [
    {
      label: 'Free',
      a: 'Limited trials / developer orgs — not a free CRM for GTM',
      b: 'Free Smart CRM (seat caps apply)',
    },
    {
      label: 'Sales-led SMB',
      a: 'Sales Cloud Starter/Pro — tens to ~$80+/user/mo list, plus setup',
      b: 'Free CRM or Sales Hub Starter ~$20/seat; Professional ~$100/seat class',
    },
    {
      label: 'Marketing automation',
      a: 'Marketing Cloud / Account Engagement — separate cloud, SI-heavy',
      b: 'Marketing Hub Professional ~$890/mo + ~$3,000 onboarding',
    },
    {
      label: 'Enterprise',
      a: 'Enterprise/Unlimited seats + implementation (often six figures Y1)',
      b: 'Marketing Enterprise ~$3,600/mo + ~$7,000 onboarding; Sales Enterprise per seat',
    },
  ],
  pricingNotes: [
    'Salesforce discounts are real; so are required implementations. Never use the website tile as TCO.',
    'HubSpot Professional onboarding fees on Marketing Hub are mandatory in 2026 list pricing.',
    'Compare the same scope: CRM-only vs CRM+MAP vs CRM+MAP+service. Mixed-scope tables lie.',
  ],
  sections: [
    {
      heading: 'The implementation gap',
      paragraphs: [
        'HubSpot implementations fail when companies treat Professional as a plug-in ESP and never model lifecycle. Salesforce implementations fail when companies buy Enterprise and assign “the intern who likes Salesforce YouTube.” Skill is the product on both sides. Salesforce simply requires more of it.',
        'If your first-year plan does not include an admin, HubSpot is the less dangerous expensive tool. If your first-year plan includes a partner and a data model workshop, Salesforce can be the last CRM you buy.',
      ],
    },
    {
      heading: 'Marketing on the CRM',
      paragraphs: [
        'This is HubSpot’s structural win. Forms, email, ads, and deals report without a connector science fair. Salesforce can match or beat that with the right clouds and data cloud work. Most mid-market teams will not do that work. They will buy Sales Cloud and wonder where the nurture went.',
      ],
    },
    {
      heading: 'When Salesforce is not optional',
      paragraphs: [
        'Regulated sharing, partner communities, CPQ, industry-specific clouds, global sales ops with layered forecasts, or 50 existing AppExchange apps. Those are Salesforce problems. Forcing HubSpot into them is how you end up on Salesforce two years later after a painful HubSpot era.',
      ],
    },
    {
      heading: 'Switching costs',
      paragraphs: [
        'Leaving Salesforce is a multi-year story. Leaving HubSpot is a hard quarter. Buy Salesforce when you are sure. Buy HubSpot when you need to learn whether a real CRM motion works. Using HubSpot as a stepping stone to Salesforce is common; using Salesforce as a stepping stone to HubSpot is a retreat.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is HubSpot cheaper than Salesforce?',
      a: 'For a mid-market team buying CRM + marketing together, usually yes. For a large sales org that only needed Sales Cloud and already has admins, not always.',
    },
    {
      q: 'Can HubSpot replace Salesforce?',
      a: 'For many growth-stage companies, yes. For enterprise process complexity, often no — or not without stretching HubSpot past its comfort zone.',
    },
    {
      q: 'Can Salesforce replace HubSpot marketing?',
      a: 'Yes, with the right marketing cloud and a project. It is not a toggle.',
    },
    {
      q: 'Which is better for B2B SaaS?',
      a: 'HubSpot if PLG/inbound and a lean GTM team. Salesforce if enterprise sales, complex territories, and a RevOps function already exist.',
    },
    {
      q: 'Do we need both?',
      a: 'Some enterprises run Salesforce as system of record and HubSpot as the marketing front door. That architecture is valid and expensive. Only do it with a clear identity owner.',
    },
  ],
  sources: [
    { label: 'HubSpot pricing', href: 'https://www.hubspot.com/pricing' },
    { label: 'Salesforce', href: 'https://www.salesforce.com' },
  ],
};

export default article;
