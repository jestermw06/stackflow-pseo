# Google Search Console — StackFlow

Do this once the production domain is stable (`https://stackflow-pseo.vercel.app` or a custom domain).

## 1. Add property
1. Open [Google Search Console](https://search.google.com/search-console)
2. **Add property** → choose **URL prefix**
3. Enter: `https://stackflow-pseo.vercel.app`
4. Verify with one of:
   - **HTML tag** — paste the meta tag into `app/layout.tsx` `<head>` (ask the agent to add it), or
   - **DNS** — if you later use a custom domain, or
   - **Vercel domain verification** if offered for your Google account

## 2. Submit sitemap
After verification:
1. Left nav → **Sitemaps**
2. Enter: `sitemap.xml`
3. Submit

Live sitemap: https://stackflow-pseo.vercel.app/sitemap.xml  
Robots: https://stackflow-pseo.vercel.app/robots.txt

## 3. Sanity checks
- URL Inspection on `/` and `/salesforce-vs-hubspot`
- Request indexing for flagship pages after major content updates
- Watch **Coverage** / **Pages** for soft-404s or excluded test routes

## 4. Optional later
- Add custom domain → re-verify → resubmit sitemap with new host
- Set `NEXT_PUBLIC_SITE_URL` on Vercel to the custom domain (used by sitemap/OG)
