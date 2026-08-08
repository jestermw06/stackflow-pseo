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
    ],
    "automation": ["zapier", "make"],
    "forms": ["typeform", "jotform"],
    "ecommerce": ["shopify", "woocommerce"],
    "support_crm": ["hubspot", "zendesk"],  # service hub overlap
}

# Ordered high-intent pairs (id_a, id_b). First is softwareA.
CURATED_PAIRS: list[tuple[str, str]] = [
    # CRM — highest CPC
    ("salesforce", "hubspot"),
    ("hubspot", "pipedrive"),
    ("hubspot", "zoho_crm"),
    ("salesforce", "pipedrive"),
    ("pipedrive", "zoho_crm"),
    ("hubspot", "activecampaign"),
    ("activecampaign", "pipedrive"),
    # Email / marketing automation
    ("mailchimp", "klaviyo"),
    ("klaviyo", "omnisend"),
    ("mailchimp", "brevo"),
    ("klaviyo", "brevo"),
    ("omnisend", "brevo"),
    ("mailchimp", "activecampaign"),
    ("activecampaign", "klaviyo"),
    # Automation
    ("make", "zapier"),
    # Forms
    ("typeform", "jotform"),
    # Commerce platforms
    ("shopify", "woocommerce"),
    # Adjacent but real buyer questions
    ("hubspot", "zendesk"),
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
