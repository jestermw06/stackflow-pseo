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
    # Extra high-intent volume
    ("hubspot", "mailchimp"),
    ("activecampaign", "kit"),
    ("kit", "brevo"),
    ("customer_io", "brevo"),
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
    # --- upgraded from curated ---
    "activecampaign-vs-brevo": {
        "verdict": "ActiveCampaign",
        "verdictReason": "ActiveCampaign wins for automation-heavy CRM marketing; Brevo wins when affordable multi-channel (email, SMS, WhatsApp) is the priority.",
        "comparisonPoints": [
            {"feature": "Advanced marketing automation", "softwareA": True, "softwareB": True},
            {"feature": "CRM + lead scoring depth", "softwareA": True, "softwareB": False},
            {"feature": "Transactional email strength", "softwareA": False, "softwareB": True},
            {"feature": "WhatsApp / broad SMS pricing appeal", "softwareA": False, "softwareB": True},
            {"feature": "Visual nurture builders", "softwareA": True, "softwareB": True},
            {"feature": "Landing pages included", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "Strong automation + CRM for growing sales teams",
            "Lead scoring and pipeline-aware marketing",
            "Mature visual automation experience",
        ],
        "consA": [
            "Can cost more as contacts and seats grow",
            "Less of a budget multi-channel SMS/WhatsApp play",
        ],
        "prosB": [
            "Attractive multi-channel pricing for SMBs",
            "Solid transactional email and CRM-lite",
            "Easy entry for email + SMS + WhatsApp",
        ],
        "consB": [
            "Automation depth trails ActiveCampaign at the high end",
            "CRM is lighter for complex sales orgs",
        ],
    },
    "activecampaign-vs-customer-io": {
        "verdict": "ActiveCampaign",
        "verdictReason": "ActiveCampaign wins for marketing teams that want CRM + automation UI; Customer.io wins for event-driven product messaging owned by growth eng.",
        "comparisonPoints": [
            {"feature": "Marketer-friendly CRM automation", "softwareA": True, "softwareB": False},
            {"feature": "Behavioral event engine", "softwareA": True, "softwareB": True},
            {"feature": "Lead scoring & sales CRM", "softwareA": True, "softwareB": False},
            {"feature": "Developer-centric APIs & data model", "softwareA": False, "softwareB": True},
            {"feature": "Email automation journeys", "softwareA": True, "softwareB": True},
            {"feature": "Product/app messaging focus", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "Familiar automation UI for marketing ops",
            "CRM features for sales-assisted funnels",
            "Faster for non-technical campaign owners",
        ],
        "consA": [
            "Less flexible as a pure event/product message bus",
            "Not built first for in-app product messaging",
        ],
        "prosB": [
            "Excellent event-triggered multi-channel logic",
            "Fits product-led and engineering-led stacks",
            "Powerful segment and trigger control",
        ],
        "consB": [
            "Steeper for classic inbound marketing teams",
            "Weaker out-of-box CRM sales workflow",
        ],
    },
    "activecampaign-vs-klaviyo": {
        "verdict": "Klaviyo",
        "verdictReason": "Klaviyo wins for e-commerce revenue automation; ActiveCampaign wins for B2B/service businesses needing CRM + nurture beyond retail.",
        "comparisonPoints": [
            {"feature": "E-commerce data & catalog sync", "softwareA": False, "softwareB": True},
            {"feature": "B2B CRM + lead scoring", "softwareA": True, "softwareB": False},
            {"feature": "SMS with shared profiles", "softwareA": True, "softwareB": True},
            {"feature": "Visual automation builder", "softwareA": True, "softwareB": True},
            {"feature": "Predictive retail analytics", "softwareA": False, "softwareB": True},
            {"feature": "Sales pipeline CRM features", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Better fit for B2B and service funnels",
            "CRM-aware automations and scoring",
            "Strong multi-step nurture without a full HubSpot suite",
        ],
        "consA": [
            "Weaker native retail product intelligence",
            "Not the default for pure DTC brands",
        ],
        "prosB": [
            "Best-in-class store and profile data for online retail",
            "Flows that map to browse, cart, and LTV",
            "SMS + email on commerce-grade identity",
        ],
        "consB": [
            "Overkill or misaligned for non-commerce B2B",
            "Contact-based pricing can sting at scale",
        ],
    },
    "activecampaign-vs-omnisend": {
        "verdict": "Omnisend",
        "verdictReason": "Omnisend wins for multi-channel e-commerce (email, SMS, push); ActiveCampaign wins when CRM automation outside pure retail is required.",
        "comparisonPoints": [
            {"feature": "E-commerce multi-channel (email/SMS/push)", "softwareA": False, "softwareB": True},
            {"feature": "CRM + sales automation", "softwareA": True, "softwareB": False},
            {"feature": "Product recommendations", "softwareA": False, "softwareB": True},
            {"feature": "Lead scoring", "softwareA": True, "softwareB": False},
            {"feature": "Visual automations", "softwareA": True, "softwareB": True},
            {"feature": "Shopify-first journeys", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "CRM depth for mixed marketing/sales teams",
            "Flexible automation beyond store events",
            "Strong mid-market automation value",
        ],
        "consA": [
            "Less specialized for product-aware retail channels",
            "Push/SMS commerce tooling trails Omnisend",
        ],
        "prosB": [
            "Purpose-built for online stores",
            "Email + SMS + push without bolting tools on",
            "Commerce templates that convert faster to launch",
        ],
        "consB": [
            "Not a full B2B CRM platform",
            "Weaker for non-retail lead pipelines",
        ],
    },
    "activecampaign-vs-pipedrive": {
        "verdict": "ActiveCampaign",
        "verdictReason": "ActiveCampaign wins when marketing automation must drive the pipeline; Pipedrive wins for pure sales execution without heavy marketing.",
        "comparisonPoints": [
            {"feature": "Marketing automation engine", "softwareA": True, "softwareB": False},
            {"feature": "Visual sales pipeline", "softwareA": True, "softwareB": True},
            {"feature": "Lead scoring", "softwareA": True, "softwareB": False},
            {"feature": "Sales-first activity UX", "softwareA": False, "softwareB": True},
            {"feature": "Email nurture sequences", "softwareA": True, "softwareB": False},
            {"feature": "Deal hygiene & reminders", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "Combines automation and CRM for inbound + sales",
            "Better for marketing-sourced pipeline",
            "One tool instead of ESP + CRM stitch",
        ],
        "consA": [
            "Sales UX is good, not as pure as Pipedrive",
            "Marketers may own the tool more than reps",
        ],
        "prosB": [
            "Pipeline CRM that sales teams adopt quickly",
            "Clean deal and activity focus",
            "Less complexity if marketing lives elsewhere",
        ],
        "consB": [
            "Needs a separate marketing automation stack",
            "Limited native nurture sophistication",
        ],
    },
    "activecampaign-vs-zoho-crm": {
        "verdict": "ActiveCampaign",
        "verdictReason": "ActiveCampaign wins for marketing automation first; Zoho CRM wins when you need a broader CRM suite inside the Zoho ecosystem.",
        "comparisonPoints": [
            {"feature": "Marketing automation depth", "softwareA": True, "softwareB": False},
            {"feature": "Full CRM modules (sales-centric)", "softwareA": True, "softwareB": True},
            {"feature": "Zoho suite integration", "softwareA": False, "softwareB": True},
            {"feature": "Email journey builders", "softwareA": True, "softwareB": False},
            {"feature": "Value pricing for CRM seats", "softwareA": True, "softwareB": True},
            {"feature": "Lead scoring & nurture", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "Automation quality marketers expect",
            "Tighter email + CRM loop for growth teams",
            "Strong mid-market automation reputation",
        ],
        "consA": [
            "CRM breadth below large suite vendors",
            "Less native fit if already all-in on Zoho",
        ],
        "prosB": [
            "Affordable CRM with wide module coverage",
            "Natural fit with Zoho Books, Campaigns, etc.",
            "Solid for sales ops on a budget",
        ],
        "consB": [
            "Marketing automation usually needs Zoho Campaigns or other tools",
            "UX polish varies across modules",
        ],
    },
    "hubspot-vs-zoho-crm": {
        "verdict": "HubSpot",
        "verdictReason": "HubSpot wins for unified free-to-paid growth stacks; Zoho CRM wins when maximizing CRM features per dollar in the Zoho suite.",
        "comparisonPoints": [
            {"feature": "Free CRM + marketing starter tools", "softwareA": True, "softwareB": False},
            {"feature": "All-in-one marketing hubs", "softwareA": True, "softwareB": False},
            {"feature": "Aggressive CRM seat pricing", "softwareA": False, "softwareB": True},
            {"feature": "Zoho ecosystem native apps", "softwareA": False, "softwareB": True},
            {"feature": "Inbound content & CMS", "softwareA": True, "softwareB": False},
            {"feature": "Sales CRM customization", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "Best-known path from free CRM to full hubs",
            "Marketing, sales, and service on one record",
            "Strong education and partner ecosystem",
        ],
        "consA": [
            "Paid hubs become expensive at scale",
            "Can feel heavy for CRM-only needs",
        ],
        "prosB": [
            "Feature-rich CRM without HubSpot hub pricing",
            "Excellent if standardized on Zoho",
            "Broad admin controls for sales processes",
        ],
        "consB": [
            "Marketing automation is not HubSpot-class natively",
            "Brand and UX consistency lag HubSpot",
        ],
    },
    "klaviyo-vs-brevo": {
        "verdict": "Klaviyo",
        "verdictReason": "Klaviyo wins for serious e-commerce personalization; Brevo wins for budget multi-channel email/SMS outside pure DTC complexity.",
        "comparisonPoints": [
            {"feature": "E-commerce event intelligence", "softwareA": True, "softwareB": False},
            {"feature": "Affordable multi-channel SMS/WhatsApp", "softwareA": False, "softwareB": True},
            {"feature": "Predictive CLV / churn style insights", "softwareA": True, "softwareB": False},
            {"feature": "Transactional email", "softwareA": True, "softwareB": True},
            {"feature": "Retail flow templates", "softwareA": True, "softwareB": False},
            {"feature": "SMB pricing simplicity", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "Top-tier for Shopify-class revenue automation",
            "Deep segments on purchase behavior",
            "Email + SMS on robust profiles",
        ],
        "consA": [
            "Price scales with contacts and sophistication",
            "Overbuilt for simple newsletter senders",
        ],
        "prosB": [
            "Strong value for email + SMS + WhatsApp",
            "Approachable for smaller lists and budgets",
            "CRM-lite and transactional options included",
        ],
        "consB": [
            "Lacks Klaviyo-depth commerce data modeling",
            "Fewer advanced predictive retail features",
        ],
    },
    "mailchimp-vs-activecampaign": {
        "verdict": "ActiveCampaign",
        "verdictReason": "ActiveCampaign wins when automation and CRM matter; Mailchimp wins for simple campaigns and brand-friendly email basics.",
        "comparisonPoints": [
            {"feature": "Advanced automation & scoring", "softwareA": False, "softwareB": True},
            {"feature": "Easy campaign builder for beginners", "softwareA": True, "softwareB": True},
            {"feature": "CRM pipeline features", "softwareA": False, "softwareB": True},
            {"feature": "Templates & creative toolkit", "softwareA": True, "softwareB": True},
            {"feature": "Lead nurturing complexity", "softwareA": False, "softwareB": True},
            {"feature": "Low-friction free/entry plans", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Friendly for small teams starting email",
            "Polished templates and brand tools",
            "Low barrier to send the first campaign",
        ],
        "consA": [
            "Automation depth plateaus sooner",
            "CRM/sales alignment is limited",
        ],
        "prosB": [
            "Automation that supports real funnel ops",
            "CRM features for sales-assisted motion",
            "Better long-term home for complex nurture",
        ],
        "consB": [
            "Slightly steeper learning curve",
            "Can be more than pure newsletter needs",
        ],
    },
    "mailchimp-vs-brevo": {
        "verdict": "Brevo",
        "verdictReason": "Brevo wins for multi-channel and transactional value; Mailchimp wins for mainstream brand email UX and templates.",
        "comparisonPoints": [
            {"feature": "Multi-channel SMS/WhatsApp", "softwareA": False, "softwareB": True},
            {"feature": "Beginner email UX & templates", "softwareA": True, "softwareB": True},
            {"feature": "Transactional email", "softwareA": True, "softwareB": True},
            {"feature": "CRM-lite contacts", "softwareA": True, "softwareB": True},
            {"feature": "Aggressive entry pricing", "softwareA": False, "softwareB": True},
            {"feature": "Brand design toolkit", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Well-known, easy campaign experience",
            "Strong creative and template ecosystem",
            "Fine for general SMB newsletters",
        ],
        "consA": [
            "Multi-channel and transactional value lag Brevo",
            "Automation for complex funnels is limited",
        ],
        "prosB": [
            "Email + SMS + WhatsApp without patchwork",
            "Competitive pricing including transactional",
            "Landing pages and CRM-lite included",
        ],
        "consB": [
            "Brand polish and mindshare trail Mailchimp",
            "Less 'default' for pure creative teams",
        ],
    },
    "pipedrive-vs-zoho-crm": {
        "verdict": "Pipedrive",
        "verdictReason": "Pipedrive wins for sales teams obsessed with pipeline velocity; Zoho CRM wins for broader CRM modules at suite pricing.",
        "comparisonPoints": [
            {"feature": "Pipeline-first sales UX", "softwareA": True, "softwareB": False},
            {"feature": "Broad CRM module coverage", "softwareA": False, "softwareB": True},
            {"feature": "Activity-based selling", "softwareA": True, "softwareB": True},
            {"feature": "Zoho suite connectivity", "softwareA": False, "softwareB": True},
            {"feature": "Fast rep onboarding", "softwareA": True, "softwareB": False},
            {"feature": "Admin customization breadth", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "Designed so salespeople actually update deals",
            "Clear focus on closing and activities",
            "Minimal bloat for pipeline CRM",
        ],
        "consA": [
            "Not an all-suite business platform",
            "Marketing and service need other products",
        ],
        "prosB": [
            "More CRM surface area per dollar",
            "Fits multi-app Zoho environments",
            "Flexible for varied sales processes",
        ],
        "consB": [
            "UX can feel less sales-obsessed than Pipedrive",
            "Easy to over-configure",
        ],
    },
    "salesforce-vs-activecampaign": {
        "verdict": "Salesforce",
        "verdictReason": "Salesforce wins for enterprise CRM platforms; ActiveCampaign wins for mid-market teams that want automation without a multi-cloud project.",
        "comparisonPoints": [
            {"feature": "Enterprise CRM platform scale", "softwareA": True, "softwareB": False},
            {"feature": "Marketing automation out of the box", "softwareA": True, "softwareB": True},
            {"feature": "AppExchange ecosystem", "softwareA": True, "softwareB": False},
            {"feature": "Mid-market time-to-value", "softwareA": False, "softwareB": True},
            {"feature": "Visual nurture automation", "softwareA": True, "softwareB": True},
            {"feature": "Lower implementation overhead", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "The enterprise standard for complex CRM",
            "Unlimited path to customize and integrate",
            "Trusted for global sales operations",
        ],
        "consA": [
            "Cost and complexity exclude many mid-market teams",
            "Marketing clouds add more spend and vendors",
        ],
        "prosB": [
            "Automation + CRM without enterprise SI budgets",
            "Faster path to live nurture programs",
            "Right-sized for growth-stage companies",
        ],
        "consB": [
            "Cannot match Salesforce platform ceiling",
            "Ecosystem and enterprise controls are smaller",
        ],
    },
    "hubspot-vs-mailchimp": {
        "verdict": "HubSpot",
        "verdictReason": "HubSpot wins when email must live inside a CRM growth platform; Mailchimp wins for standalone email marketing simplicity.",
        "comparisonPoints": [
            {"feature": "CRM-native email & automation", "softwareA": True, "softwareB": False},
            {"feature": "Standalone email ease of use", "softwareA": True, "softwareB": True},
            {"feature": "Free CRM + free marketing tools", "softwareA": True, "softwareB": True},
            {"feature": "Sales pipeline on same contacts", "softwareA": True, "softwareB": False},
            {"feature": "Creative templates & brand kit", "softwareA": True, "softwareB": True},
            {"feature": "All-in-one hubs expansion path", "softwareA": True, "softwareB": False},
        ],
        "prosA": [
            "Email tied to deals, tickets, and lifecycle stages",
            "Clear upgrade path across hubs",
            "Better for teams aligning marketing and sales",
        ],
        "consA": [
            "Can be more platform than a simple newsletter needs",
            "Paid features stack as you grow",
        ],
        "prosB": [
            "Straightforward email for campaigns and basics",
            "Strong brand recognition and templates",
            "Fine when CRM lives somewhere else",
        ],
        "consB": [
            "Weaker as a system of record for revenue teams",
            "Automation depth below dedicated MAP/CRM suites",
        ],
    },
    "activecampaign-vs-kit": {
        "verdict": "ActiveCampaign",
        "verdictReason": "ActiveCampaign wins for business automation and CRM; Kit wins for creator newsletters and digital-product funnels.",
        "comparisonPoints": [
            {"feature": "Creator landing pages & products", "softwareA": False, "softwareB": True},
            {"feature": "B2B CRM + lead scoring", "softwareA": True, "softwareB": False},
            {"feature": "Visual automations", "softwareA": True, "softwareB": True},
            {"feature": "Newsletter-centric creator UX", "softwareA": False, "softwareB": True},
            {"feature": "Sales pipeline features", "softwareA": True, "softwareB": False},
            {"feature": "Tag-based creator segments", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "Built for companies running funnels into sales",
            "Automation + CRM in one mid-market package",
            "Better for agencies and B2B services",
        ],
        "consA": [
            "Not specialized for creator commerce",
            "Heavier than a pure newsletter tool",
        ],
        "prosB": [
            "Delightful for creators and newsletter businesses",
            "Landing pages and digital products nearby",
            "Clean tagging and simple automations",
        ],
        "consB": [
            "Not a sales CRM platform",
            "Limited for complex B2B pipeline ops",
        ],
    },
    "kit-vs-brevo": {
        "verdict": "Kit (ConvertKit)",
        "verdictReason": "Kit wins for creators; Brevo wins for multi-channel SMB email/SMS beyond the creator niche.",
        "comparisonPoints": [
            {"feature": "Creator-first workflows", "softwareA": True, "softwareB": False},
            {"feature": "SMS / WhatsApp multi-channel", "softwareA": False, "softwareB": True},
            {"feature": "Digital product selling tools", "softwareA": True, "softwareB": False},
            {"feature": "Transactional email", "softwareA": False, "softwareB": True},
            {"feature": "Landing pages for audiences", "softwareA": True, "softwareB": True},
            {"feature": "Broad SMB pricing appeal", "softwareA": True, "softwareB": True},
        ],
        "prosA": [
            "Purpose-built for creators and course sellers",
            "Audience tagging and creator automations",
            "Simple path from content to email to product",
        ],
        "consA": [
            "Weak multi-channel SMS/WhatsApp story",
            "Not aimed at general retail or enterprise",
        ],
        "prosB": [
            "Channels beyond email at accessible prices",
            "Transactional + marketing in one vendor",
            "Works for many SMB verticals",
        ],
        "consB": [
            "Less creator-native than Kit",
            "Community/mindshare in creator space trails Kit",
        ],
    },
    "customer-io-vs-brevo": {
        "verdict": "Customer.io",
        "verdictReason": "Customer.io wins for behavioral product messaging; Brevo wins for affordable classic email/SMS marketing for SMBs.",
        "comparisonPoints": [
            {"feature": "Event-driven product messaging", "softwareA": True, "softwareB": False},
            {"feature": "SMB multi-channel affordability", "softwareA": False, "softwareB": True},
            {"feature": "Developer-friendly data model", "softwareA": True, "softwareB": False},
            {"feature": "WhatsApp / broad SMS packaging", "softwareA": False, "softwareB": True},
            {"feature": "Segment + trigger sophistication", "softwareA": True, "softwareB": True},
            {"feature": "CRM-lite for small teams", "softwareA": False, "softwareB": True},
        ],
        "prosA": [
            "Built for lifecycle messages from product events",
            "Flexible multi-channel orchestration",
            "Appeals to technical growth stacks",
        ],
        "consA": [
            "More setup than a simple ESP",
            "Overkill for basic newsletter sending",
        ],
        "prosB": [
            "Easy multi-channel for non-technical SMBs",
            "Strong price entry for email + SMS",
            "Landing pages and CRM-lite included",
        ],
        "consB": [
            "Shallower event/product messaging model",
            "Less ideal as a product-led messaging brain",
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
