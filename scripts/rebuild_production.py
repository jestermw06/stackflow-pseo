#!/usr/bin/env python3
"""
Rebuild data/production_comparisons.json from high-intent pairs only.

Priority:
1. Hand-authored flagship content (quality)
2. Template-based competitive pairs within intent families
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOFTWARE = json.loads((ROOT / "data" / "software.json").read_text())
BY_ID = {s["id"]: s for s in SOFTWARE}

# Competitive families: tools buyers actually compare head-to-head
FAMILIES: dict[str, list[str]] = {
    "crm": ["salesforce", "hubspot", "pipedrive", "zoho_crm", "activecampaign"],
    "email_marketing": [
        "klaviyo",
        "mailchimp",
        "omnisend",
        "brevo",
        "activecampaign",
        "kit",
        "customer_io",
    ],
    "automation": ["zapier", "make"],
    "forms": ["typeform", "jotform"],
    "ecommerce": ["shopify", "woocommerce"],
    "support": ["hubspot", "zendesk", "intercom"],
    "project_mgmt": ["monday_com", "asana"],
}

# Ordered high-intent pairs (id_a, id_b). First is softwareA.
CURATED_PAIRS: list[tuple[str, str]] = [
    # CRM — highest CPC
    ("salesforce", "hubspot"),
    ("hubspot", "pipedrive"),
    ("hubspot", "zoho_crm"),
    ("salesforce", "pipedrive"),
    ("salesforce", "zoho_crm"),
    ("pipedrive", "zoho_crm"),
    ("hubspot", "activecampaign"),
    ("activecampaign", "pipedrive"),
    ("activecampaign", "zoho_crm"),
    ("salesforce", "activecampaign"),
    # Email / marketing automation
    ("mailchimp", "klaviyo"),
    ("klaviyo", "omnisend"),
    ("mailchimp", "omnisend"),
    ("mailchimp", "brevo"),
    ("klaviyo", "brevo"),
    ("omnisend", "brevo"),
    ("mailchimp", "activecampaign"),
    ("activecampaign", "klaviyo"),
    ("activecampaign", "brevo"),
    ("activecampaign", "omnisend"),
    ("mailchimp", "kit"),
    ("klaviyo", "customer_io"),
    ("activecampaign", "customer_io"),
    # Automation
    ("make", "zapier"),
    # Forms
    ("typeform", "jotform"),
    # Commerce platforms
    ("shopify", "woocommerce"),
    # Support / messaging
    ("hubspot", "zendesk"),
    ("zendesk", "intercom"),
    ("hubspot", "intercom"),
    # Project management
    ("monday_com", "asana"),
]

# Flagship hand-authored content keyed by "id_a-vs-id_b" (slug may differ)
FLAGSHIPS: dict[str, dict] = {
    "salesforce-vs-hubspot": {
        "verdict": "HubSpot",
        "verdictReason": "HubSpot wins for most growing teams that want CRM + marketing in one product without a heavy services project.",
        "comparisonPoints": [
            {"feature": "Native marketing automation", "softwareA": True, "softwareB": True},
            {"feature": "Enterprise customization depth", "softwareA": True, "softwareB": False},
            {"feature": "Time-to-value for SMBs", "softwareA": False, "softwareB": True},
            {"feature": "Advanced analytics / Einstein-class AI", "softwareA": True, "softwareB": True},
            {"feature": "Predictable free/starter tiers", "softwareA": False, "softwareB": True},
            {"feature": "Global enterprise ecosystem", "softwareA": True, "softwareB": False},
            {"feature": "All-in-one CRM + content + email", "softwareA": False, "softwareB": True},
            {"feature": "Complex multi-cloud architecture", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Unmatched scale for large, complex sales orgs",
            "Deep customization across Sales, Service, and Marketing Cloud",
            "Mature AppExchange and partner ecosystem",
        ],
        "consA": [
            "Steep learning curve and implementation cost",
            "Total cost of ownership climbs quickly with clouds and seats",
        ],
        "prosB": [
            "Faster onboarding with a unified free-to-paid CRM",
            "Strong inbound marketing, email, and workflows out of the box",
            "Cleaner UX for non-admin operators",
        ],
        "consB": [
            "Less flexible for extreme enterprise process customization",
            "Advanced seats and add-ons can still get expensive at scale",
        ],
    },
    "mailchimp-vs-klaviyo": {
        "verdict": "Klaviyo",
        "verdictReason": "Klaviyo wins for e-commerce brands that need product-aware email/SMS; Mailchimp remains simpler for general newsletters.",
        "comparisonPoints": [
            {"feature": "E-commerce data model (orders, LTV, products)", "softwareA": False, "softwareB": True},
            {"feature": "Beginner-friendly email builder", "softwareA": True, "softwareB": True},
            {"feature": "Advanced segmentation on purchase behavior", "softwareA": False, "softwareB": True},
            {"feature": "Built-in SMS with shared profiles", "softwareA": False, "softwareB": True},
            {"feature": "Lower entry cost for small lists", "softwareA": True, "softwareB": False},
            {"feature": "Predictive analytics (churn, CLV)", "softwareA": False, "softwareB": True},
            {"feature": "Broad non-commerce use cases", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Easy setup for basic campaigns and automations",
            "Friendly pricing for small audiences",
            "Solid templates and brand toolkit",
        ],
        "consA": [
            "Weaker product/order-level personalization than commerce specialists",
            "Segmentation depth lags for serious DTC brands",
        ],
        "prosB": [
            "Best-in-class Shopify/WooCommerce event data",
            "Flows that react to browse, cart, and purchase signals",
            "Unified email + SMS profiles",
        ],
        "consB": [
            "Pricing scales with contacts and usage",
            "Overkill for simple monthly newsletters",
        ],
    },
    "make-vs-zapier": {
        "verdict": "Zapier",
        "verdictReason": "Zapier wins for most teams that want reliable app-to-app automation fast; Make wins when you need complex multi-step logic visually.",
        "comparisonPoints": [
            {"feature": "Largest app directory", "softwareA": False, "softwareB": True},
            {"feature": "Visual scenario builder for complex branches", "softwareA": True, "softwareB": False},
            {"feature": "Operations pricing efficiency at volume", "softwareA": True, "softwareB": False},
            {"feature": "Fastest time-to-first-automation", "softwareA": False, "softwareB": True},
            {"feature": "Advanced data transformation", "softwareA": True, "softwareB": True},
            {"feature": "Enterprise governance & SSO maturity", "softwareA": True, "softwareB": True},
            {"feature": "Beginner onboarding docs & community", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "Powerful visual builder for multi-path workflows",
            "Often cheaper per operation for complex scenarios",
            "Strong data mapping and iterators/aggregators",
        ],
        "consA": [
            "Steeper learning curve for non-technical users",
            "Smaller app ecosystem than Zapier",
        ],
        "prosB": [
            "Huge integration catalog and templates",
            "Simple trigger → action model teams already know",
            "Excellent docs and ecosystem momentum",
        ],
        "consB": [
            "Task-based pricing can get costly at high volume",
            "Complex branching is less elegant than Make scenarios",
        ],
    },
    "hubspot-vs-pipedrive": {
        "verdict": "HubSpot",
        "verdictReason": "HubSpot wins when marketing and CRM must share one database; Pipedrive wins for pure sales pipeline simplicity.",
        "comparisonPoints": [
            {"feature": "Visual sales pipeline", "softwareA": True, "softwareB": True},
            {"feature": "Native marketing automation", "softwareA": True, "softwareB": False},
            {"feature": "Sales-first UX simplicity", "softwareA": False, "softwareB": True},
            {"feature": "Free CRM tier", "softwareA": True, "softwareB": False},
            {"feature": "Activity reminders & deal focus", "softwareA": True, "softwareB": True},
            {"feature": "Content CMS + inbound tools", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Marketing, sales, and service on one contact record",
            "Generous free tools to start",
            "Strong automation and reporting depth",
        ],
        "consA": [
            "Can feel heavy if you only need a pipeline",
            "Paid hubs add up as the team grows",
        ],
        "prosB": [
            "Laser focus on closing deals and pipeline hygiene",
            "Fast adoption for sales-only teams",
            "Clear activity-based selling workflow",
        ],
        "consB": [
            "Marketing automation requires other tools",
            "Less of an all-in-one growth platform",
        ],
    },
    "omnisend-vs-brevo": {
        "verdict": "Omnisend",
        "verdictReason": "Omnisend wins for e-commerce multi-channel (email, SMS, push); Brevo wins for broader SMB multi-channel at a lower price.",
        "comparisonPoints": [
            {"feature": "E-commerce product recommendations", "softwareA": True, "softwareB": False},
            {"feature": "Push notifications", "softwareA": True, "softwareB": False},
            {"feature": "Transactional email strength", "softwareA": False, "softwareB": True},
            {"feature": "CRM-lite / contact management", "softwareA": False, "softwareB": True},
            {"feature": "SMS marketing", "softwareA": True, "softwareB": True},
            {"feature": "Landing pages", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "Built for online stores and product-aware journeys",
            "Email + SMS + push in one commerce stack",
            "Strong segmentation for shoppers",
        ],
        "consA": [
            "Less ideal as a general-purpose ESP outside e-com",
            "Fewer non-commerce CRM features",
        ],
        "prosB": [
            "Affordable multi-channel (email, SMS, WhatsApp)",
            "Solid transactional email and CRM-lite",
            "Landing pages without another tool",
        ],
        "consB": [
            "Weaker product recommendation depth for DTC",
            "Less specialized for pure Shopify/Woo brands",
        ],
    },
    "typeform-vs-jotform": {
        "verdict": "Jotform",
        "verdictReason": "Jotform wins for power users who need payments, PDFs, and complex forms; Typeform wins for conversational UX and brand polish.",
        "comparisonPoints": [
            {"feature": "Conversational one-question UX", "softwareA": True, "softwareB": False},
            {"feature": "Payment collection on forms", "softwareA": True, "softwareB": True},
            {"feature": "Template breadth & widgets", "softwareA": False, "softwareB": True},
            {"feature": "Logic jumps / conditional flows", "softwareA": True, "softwareB": True},
            {"feature": "PDF / document generation", "softwareA": False, "softwareB": True},
            {"feature": "Brand-forward respondent experience", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Beautiful, high-completion conversational forms",
            "Strong logic and integrations for lead gen",
            "Great for brand-sensitive surveys and quizzes",
        ],
        "consA": [
            "Can get pricey as responses scale",
            "Fewer industrial form widgets than Jotform",
        ],
        "prosB": [
            "Huge template and widget library",
            "Payments, approvals, and PDF workflows",
            "Strong value on higher-tier plans",
        ],
        "consB": [
            "UX is more classic form than conversational",
            "Design polish trails Typeform for marketing pages",
        ],
    },
    "shopify-vs-woocommerce": {
        "verdict": "Shopify",
        "verdictReason": "Shopify wins for most merchants who want a hosted store that just works; WooCommerce wins when you need full WordPress ownership and control.",
        "comparisonPoints": [
            {"feature": "Hosted platform (less ops burden)", "softwareA": True, "softwareB": False},
            {"feature": "WordPress CMS ownership", "softwareA": False, "softwareB": True},
            {"feature": "App / plugin ecosystem", "softwareA": True, "softwareB": True},
            {"feature": "Checkout conversion optimizations", "softwareA": True, "softwareB": True},
            {"feature": "Self-host flexibility", "softwareA": False, "softwareB": True},
            {"feature": "Faster launch for non-developers", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Reliable hosted stack with less server babysitting",
            "Polished admin and app store for growth tools",
            "Strong payments and checkout options",
        ],
        "consA": [
            "Monthly platform + app costs add up",
            "Less raw control than self-hosted WordPress",
        ],
        "prosB": [
            "Full control on your own hosting and theme stack",
            "No platform transaction fee model like Shopify's plans",
            "Deep WordPress content + commerce integration",
        ],
        "consB": [
            "You own security, updates, and performance",
            "Quality varies widely by plugins and host",
        ],
    },
    "hubspot-vs-zendesk": {
        "verdict": "HubSpot",
        "verdictReason": "HubSpot wins for teams uniting marketing, sales, and service; Zendesk wins when world-class ticketing is the only priority.",
        "comparisonPoints": [
            {"feature": "Enterprise ticketing", "softwareA": True, "softwareB": True},
            {"feature": "Marketing + sales + service CRM", "softwareA": True, "softwareB": False},
            {"feature": "Omnichannel support maturity", "softwareA": True, "softwareB": True},
            {"feature": "Knowledge base", "softwareA": True, "softwareB": True},
            {"feature": "Inbound marketing suite", "softwareA": True, "softwareB": False},
            {"feature": "Support-first agent workspace", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "One platform for the full customer lifecycle",
            "Service Hub ties tickets to marketing/sales history",
            "Strong free and starter entry points",
        ],
        "consA": [
            "Support depth still trails pure-play help desks at extreme scale",
            "Multiple hubs increase cost",
        ],
        "prosB": [
            "Industry-standard ticketing and agent productivity",
            "Mature omnichannel and workforce tools",
            "Huge marketplace of support apps",
        ],
        "consB": [
            "Not a marketing automation platform",
            "CRM story is support-centric, not growth-centric",
        ],
    },
    "salesforce-vs-zoho-crm": {
        "verdict": "Salesforce",
        "verdictReason": "Salesforce wins for enterprise scale and ecosystem; Zoho CRM wins when budget and all-in-one Zoho suite matter more.",
        "comparisonPoints": [
            {"feature": "Enterprise customization depth", "softwareA": True, "softwareB": False},
            {"feature": "Aggressive value pricing", "softwareA": False, "softwareB": True},
            {"feature": "AppExchange-scale ecosystem", "softwareA": True, "softwareB": False},
            {"feature": "Native Zoho suite integration", "softwareA": False, "softwareB": True},
            {"feature": "Advanced analytics & AI layers", "softwareA": True, "softwareB": True},
            {"feature": "Lower total cost for SMBs", "softwareA": False, "softwareB": True},
            {"feature": "Global partner / SI network", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Industry default for complex enterprise CRM",
            "Unmatched partner and integration ecosystem",
            "Deep multi-cloud sales, service, and marketing options",
        ],
        "consA": [
            "Expensive and implementation-heavy",
            "Overkill for simple sales pipelines",
        ],
        "prosB": [
            "Strong feature set at mid-market prices",
            "Fits naturally if you already use Zoho apps",
            "Faster to stand up than full Salesforce",
        ],
        "consB": [
            "Smaller ecosystem and enterprise pedigree",
            "Customization ceiling below Salesforce for huge orgs",
        ],
    },
    "mailchimp-vs-omnisend": {
        "verdict": "Omnisend",
        "verdictReason": "Omnisend wins for online stores that need email + SMS + push; Mailchimp wins for general brands and simple newsletters.",
        "comparisonPoints": [
            {"feature": "E-commerce automation focus", "softwareA": False, "softwareB": True},
            {"feature": "Beginner email campaigns", "softwareA": True, "softwareB": True},
            {"feature": "SMS + push with email", "softwareA": False, "softwareB": True},
            {"feature": "Broad non-retail use cases", "softwareA": True, "softwareB": False},
            {"feature": "Product recommendations", "softwareA": False, "softwareB": True},
            {"feature": "Brand toolkit & templates", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "Familiar UI for small teams and creators",
            "Solid all-purpose email and basic automations",
            "Helpful free/entry tiers for tiny lists",
        ],
        "consA": [
            "Weaker shopper-event depth than commerce ESPs",
            "Multi-channel retail tooling lags specialists",
        ],
        "prosB": [
            "Purpose-built for Shopify/Woo-style stores",
            "Email, SMS, and push in one commerce stack",
            "Strong product and cart-driven journeys",
        ],
        "consB": [
            "Less ideal outside e-commerce",
            "Pricing and channels should match store volume",
        ],
    },
    "hubspot-vs-activecampaign": {
        "verdict": "HubSpot",
        "verdictReason": "HubSpot wins as an all-in-one CRM + marketing platform; ActiveCampaign wins for automation-heavy email at a sharper mid-market price.",
        "comparisonPoints": [
            {"feature": "Full CRM free tier", "softwareA": True, "softwareB": False},
            {"feature": "Visual marketing automation depth", "softwareA": True, "softwareB": True},
            {"feature": "CMS / content hub", "softwareA": True, "softwareB": False},
            {"feature": "Aggressive automation pricing", "softwareA": False, "softwareB": True},
            {"feature": "Sales + service hubs", "softwareA": True, "softwareB": False},
            {"feature": "Lead scoring & CRM lite", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "One database across marketing, sales, and service",
            "Strong free tools and inbound ecosystem",
            "Reporting and CRM depth for growing teams",
        ],
        "consA": [
            "Paid hubs get expensive as you scale seats",
            "Can feel large if you only need email automation",
        ],
        "prosB": [
            "Excellent automation builder for nurture sequences",
            "Often better price-to-automation ratio mid-market",
            "CRM features solid for sales-assisted marketing",
        ],
        "consB": [
            "Not a full multi-hub customer platform like HubSpot",
            "Content/CMS story is thinner",
        ],
    },
    "klaviyo-vs-omnisend": {
        "verdict": "Klaviyo",
        "verdictReason": "Klaviyo wins for data-rich DTC brands; Omnisend wins when multi-channel push/SMS simplicity and price matter more.",
        "comparisonPoints": [
            {"feature": "Deep e-commerce event data model", "softwareA": True, "softwareB": True},
            {"feature": "Predictive analytics (CLV, churn)", "softwareA": True, "softwareB": False},
            {"feature": "Push notifications", "softwareA": False, "softwareB": True},
            {"feature": "SMS + email unified profiles", "softwareA": True, "softwareB": True},
            {"feature": "Enterprise-grade segmentation", "softwareA": True, "softwareB": False},
            {"feature": "Faster mid-market multi-channel setup", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "Best-in-class profiles and flows for serious DTC",
            "Powerful segmentation and predictive insights",
            "Strong SMS alongside email on the same identity",
        ],
        "consA": [
            "Cost climbs with contacts and channels",
            "Can be more than small catalogs need",
        ],
        "prosB": [
            "Email + SMS + push without stitching tools",
            "Approachable for growing Shopify stores",
            "Commerce templates that ship quickly",
        ],
        "consB": [
            "Analytics depth trails Klaviyo at the high end",
            "Less of an enterprise data platform feel",
        ],
    },
    "zendesk-vs-intercom": {
        "verdict": "Zendesk",
        "verdictReason": "Zendesk wins for classic high-volume ticketing and ops; Intercom wins for product-led messaging and modern chat-first support.",
        "comparisonPoints": [
            {"feature": "Enterprise ticketing & SLAs", "softwareA": True, "softwareB": True},
            {"feature": "In-product chat & messenger", "softwareA": True, "softwareB": True},
            {"feature": "Product tours & outbound engagement", "softwareA": False, "softwareB": True},
            {"feature": "Workforce / agent productivity suite", "softwareA": True, "softwareB": False},
            {"feature": "Help center / knowledge base", "softwareA": True, "softwareB": True},
            {"feature": "Product-led growth messaging", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "Battle-tested ticketing for large support orgs",
            "Mature omnichannel and reporting",
            "Huge app marketplace for support stacks",
        ],
        "consA": [
            "Less modern for product-led engagement",
            "Can feel heavy for chat-first startups",
        ],
        "prosB": [
            "Excellent messenger for SaaS product UX",
            "Outbound and onboarding in the same suite",
            "Strong fit for PLG companies",
        ],
        "consB": [
            "Pricing can surprise as seats and products stack",
            "Deep ticket ops still often favor Zendesk",
        ],
    },
    "monday-com-vs-asana": {
        "verdict": "Asana",
        "verdictReason": "Asana wins for clear work management and goals; Monday.com wins when highly customizable Work OS boards are the priority.",
        "comparisonPoints": [
            {"feature": "Flexible Work OS boards", "softwareA": True, "softwareB": False},
            {"feature": "Task & project hierarchy clarity", "softwareA": True, "softwareB": True},
            {"feature": "Timeline / Gantt views", "softwareA": True, "softwareB": True},
            {"feature": "Goals & portfolio management", "softwareA": False, "softwareB": True},
            {"feature": "No/low-code board customization", "softwareA": True, "softwareB": False},
            {"feature": "Workload views", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "Extremely customizable boards and automations",
            "Visual dashboards teams can shape quickly",
            "Broad use cases beyond pure task lists",
        ],
        "consA": [
            "Can become messy without governance",
            "Pricing tiers add up with seats and features",
        ],
        "prosB": [
            "Clear structure for tasks, projects, and goals",
            "Strong planning views for cross-functional work",
            "Mature product for PM-led organizations",
        ],
        "consB": [
            "Less of a free-form Work OS canvas than Monday",
            "Power features concentrate on higher plans",
        ],
    },
    "mailchimp-vs-kit": {
        "verdict": "Kit (ConvertKit)",
        "verdictReason": "Kit wins for creators and digital-product businesses; Mailchimp wins for general SMBs and broader brand email.",
        "comparisonPoints": [
            {"feature": "Creator-first landing pages & forms", "softwareA": False, "softwareB": True},
            {"feature": "General SMB email marketing", "softwareA": True, "softwareB": False},
            {"feature": "Tag-based creator automations", "softwareA": True, "softwareB": True},
            {"feature": "Digital product / commerce tools", "softwareA": False, "softwareB": True},
            {"feature": "Templates & brand kit for any industry", "softwareA": True, "softwareB": False},
            {"feature": "Newsletter-centric workflows", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "Versatile for many industries and list types",
            "Familiar feature set and free-entry options",
            "Solid templates and creative tools",
        ],
        "consA": [
            "Not specialized for creator monetization",
            "Commerce/creator tooling is secondary",
        ],
        "prosB": [
            "Built around creators, newsletters, and courses",
            "Clean visual automations and tagging",
            "Landing pages and products in one flow",
        ],
        "consB": [
            "Less ideal as a generic enterprise ESP",
            "E-commerce retail depth trails Klaviyo-class tools",
        ],
    },
    "hubspot-vs-intercom": {
        "verdict": "HubSpot",
        "verdictReason": "HubSpot wins when CRM + marketing + service must share one system; Intercom wins for in-product messaging and PLG support.",
        "comparisonPoints": [
            {"feature": "Full CRM & marketing hubs", "softwareA": True, "softwareB": False},
            {"feature": "In-product messenger", "softwareA": True, "softwareB": True},
            {"feature": "Product tours & outbound series", "softwareA": False, "softwareB": True},
            {"feature": "Inbound content & SEO tools", "softwareA": True, "softwareB": False},
            {"feature": "Ticketing / service desk", "softwareA": True, "softwareB": True},
            {"feature": "PLG engagement focus", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "Complete growth stack on one contact graph",
            "Strong free CRM entry and hub expansion path",
            "Marketing automation beyond chat alone",
        ],
        "consA": [
            "Messenger experience is good, not Intercom-native",
            "Cost rises with multiple hubs",
        ],
        "prosB": [
            "Best-in-class product messaging for SaaS",
            "Onboarding and support in the product UI",
            "Outbound and help content for modern support",
        ],
        "consB": [
            "Not a substitute for full CRM/marketing suite",
            "Seat and add-on pricing needs careful planning",
        ],
    },
    "salesforce-vs-pipedrive": {
        "verdict": "Pipedrive",
        "verdictReason": "Pipedrive wins for sales teams that want pipeline speed without admin overhead; Salesforce wins when enterprise process complexity demands it.",
        "comparisonPoints": [
            {"feature": "Visual pipeline simplicity", "softwareA": False, "softwareB": True},
            {"feature": "Enterprise process customization", "softwareA": True, "softwareB": False},
            {"feature": "Activity-based selling UX", "softwareA": True, "softwareB": True},
            {"feature": "AppExchange ecosystem", "softwareA": True, "softwareB": False},
            {"feature": "Fast onboarding for sales reps", "softwareA": False, "softwareB": True},
            {"feature": "Complex multi-cloud architecture", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Handles complex enterprise sales motions",
            "Deep reporting and platform extensibility",
            "Trusted by large global sales orgs",
        ],
        "consA": [
            "Slow and costly to implement well",
            "Reps often need training and admin support",
        ],
        "prosB": [
            "Pipeline-first design salespeople actually use",
            "Quick time-to-value for SMB and mid-market",
            "Clean activity and deal hygiene workflows",
        ],
        "consB": [
            "Not built for extreme enterprise customization",
            "Marketing automation needs other tools",
        ],
    },
    "klaviyo-vs-customer-io": {
        "verdict": "Klaviyo",
        "verdictReason": "Klaviyo wins for e-commerce marketers; Customer.io wins for product/engineering-led behavioral messaging across channels.",
        "comparisonPoints": [
            {"feature": "E-commerce marketer UX", "softwareA": True, "softwareB": False},
            {"feature": "Developer-friendly event APIs", "softwareA": True, "softwareB": True},
            {"feature": "Shopify-native data model", "softwareA": True, "softwareB": False},
            {"feature": "Multi-channel behavioral campaigns", "softwareA": True, "softwareB": True},
            {"feature": "Segment builder flexibility", "softwareA": True, "softwareB": True},
            {"feature": "Product-led / app messaging focus", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "Default choice for serious online retail email/SMS",
            "Marketer-friendly flows and analytics",
            "Rich store and catalog integrations",
        ],
        "consA": [
            "Less ideal as a pure product messaging brain",
            "Pricing is contact- and usage-sensitive",
        ],
        "prosB": [
            "Excellent for event-driven product messaging",
            "Flexible for app, email, push, and SMS logic",
            "Appeals to technical growth teams",
        ],
        "consB": [
            "Steeper for pure retail marketers",
            "Less out-of-box Shopify polish than Klaviyo",
        ],
    },
}


def slug_for(a_id: str, b_id: str) -> str:
    return f"{a_id.replace('_', '-')}-vs-{b_id.replace('_', '-')}"


def default_points(a: dict, b: dict) -> list[dict]:
    points = []
    for feat in a.get("key_features", [])[:4]:
        points.append(
            {
                "feature": feat,
                "softwareA": True,
                "softwareB": feat in b.get("key_features", []),
            }
        )
    for feat in b.get("key_features", [])[:4]:
        if any(p["feature"] == feat for p in points):
            continue
        points.append(
            {
                "feature": feat,
                "softwareA": feat in a.get("key_features", []),
                "softwareB": True,
            }
        )
    return points[:8]


def default_content(a: dict, b: dict) -> dict:
    a_only = [f for f in a["key_features"] if f not in b["key_features"]]
    b_only = [f for f in b["key_features"] if f not in a["key_features"]]
    # Prefer the tool with more unique strengths as a mild heuristic — still honest framing
    verdict = a["name"] if len(a_only) >= len(b_only) else b["name"]
    focus = (a_only or a["key_features"])[0]
    return {
        "verdict": verdict,
        "verdictReason": (
            f"{verdict} is the stronger default when your priority is {focus.lower()}, "
            f"given how {a['name']} and {b['name']} split on core capabilities."
        ),
        "comparisonPoints": default_points(a, b),
        "prosA": (a_only or a["key_features"])[:3],
        "consA": [
            f"Less emphasis on {b_only[0].lower()}" if b_only else f"Overlaps heavily with {b['name']}",
            f"Evaluate total cost vs {b['name']} for your team size",
        ][:2],
        "prosB": (b_only or b["key_features"])[:3],
        "consB": [
            f"Less emphasis on {a_only[0].lower()}" if a_only else f"Overlaps heavily with {a['name']}",
            f"Confirm integrations match your stack beyond {a['name']}",
        ][:2],
    }


def build_entry(a_id: str, b_id: str) -> dict:
    if a_id not in BY_ID or b_id not in BY_ID:
        raise SystemExit(f"Unknown software id: {a_id} or {b_id}")
    a, b = BY_ID[a_id], BY_ID[b_id]
    slug = slug_for(a_id, b_id)
    body = FLAGSHIPS.get(slug) or default_content(a, b)
    return {
        "slug": slug,
        "title": f"{a['name']} vs {b['name']}",
        "softwareA": a,
        "softwareB": b,
        "verdict": body["verdict"],
        "verdictReason": body["verdictReason"],
        "comparisonPoints": body["comparisonPoints"],
        "prosA": body["prosA"],
        "consA": body["consA"],
        "prosB": body["prosB"],
        "consB": body["consB"],
        "intentFamily": next(
            (name for name, ids in FAMILIES.items() if a_id in ids and b_id in ids),
            "adjacent",
        ),
        "quality": "flagship" if slug in FLAGSHIPS else "curated",
    }


def main() -> None:
    # de-dupe while preserving order (also skip reverse duplicates)
    seen_pairs: set[frozenset[str]] = set()
    out: list[dict] = []
    for a_id, b_id in CURATED_PAIRS:
        key = frozenset((a_id, b_id))
        if key in seen_pairs:
            continue
        seen_pairs.add(key)
        out.append(build_entry(a_id, b_id))

    out.sort(key=lambda x: (0 if x.get("quality") == "flagship" else 1, x["slug"]))
    path = ROOT / "data" / "production_comparisons.json"
    path.write_text(json.dumps(out, indent=2) + "\n")
    flagships = sum(1 for x in out if x.get("quality") == "flagship")
    print(f"Wrote {len(out)} comparisons ({flagships} flagship) → {path}")
    for x in out:
        print(f"  [{x.get('quality','?'):8}] {x['slug']}")


if __name__ == "__main__":
    main()
