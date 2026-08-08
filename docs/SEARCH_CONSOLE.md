# Google Search Console — StackClash

Primary domain: **https://stackclash.io**

## 1. Add property
1. Open [Google Search Console](https://search.google.com/search-console)
2. **Add property** → **URL prefix**
3. Enter: `https://stackclash.io`
4. Verify via **DNS** (recommended with your registrar) or HTML tag

## 2. Submit sitemap
After verification:
1. Left nav → **Sitemaps**
2. Enter: `sitemap.xml`
3. Submit

Live (once DNS + Vercel are live):
- https://stackclash.io/sitemap.xml
- https://stackclash.io/robots.txt

## 3. Sanity checks
- URL Inspection on `/` and `/salesforce-vs-hubspot`
- Request indexing for flagship pages after major content updates

## Note
Keep `NEXT_PUBLIC_SITE_URL=https://stackclash.io` on Vercel so sitemap/OG stay correct.
