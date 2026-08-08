# Google Search Console — indexing checklist

**Property:** `https://stackclash.io` (verified)  
**Sitemap:** `https://stackclash.io/sitemap.xml`  
**Robots:** `https://stackclash.io/robots.txt`

## 1. Submit sitemap (once)

1. GSC → **Sitemaps**
2. Enter: `sitemap.xml`
3. Submit → wait for **Success**

## 2. Request indexing (manual — Google has no free bulk API for this)

GSC → **URL Inspection** → paste URL → **Request indexing**

### Priority batch (do these first)

```
https://stackclash.io/
https://stackclash.io/comparisons
https://stackclash.io/salesforce-vs-hubspot
https://stackclash.io/mailchimp-vs-klaviyo
https://stackclash.io/make-vs-zapier
https://stackclash.io/hubspot-vs-pipedrive
https://stackclash.io/shopify-vs-woocommerce
https://stackclash.io/zendesk-vs-intercom
https://stackclash.io/monday-com-vs-asana
https://stackclash.io/hubspot-vs-mailchimp
```

### Full comparison list

After deploy, generate the latest list:

```bash
python3 -c "
import json
base='https://stackclash.io'
print(base+'/')
print(base+'/comparisons')
for c in sorted(json.load(open('data/production_comparisons.json')), key=lambda x: x['slug']):
    print(f\"{base}/{c['slug']}\")
"
```

Google rate-limits inspection requests (~a few dozen/day). Prioritize homepage + flagships; sitemap covers the rest over time.

## 3. What we cannot automate from the agent

- Clicking **Request indexing** in your Google account
- Instant ranking (days–weeks is normal)

## 4. After requesting

- Coverage / Pages report may lag
- Re-request after major content rewrites on a URL
