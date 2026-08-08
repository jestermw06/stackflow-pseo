# Domain setup — stackclash.io

## 1. Vercel
1. [Vercel Dashboard](https://vercel.com) → project **stackflow-pseo** (or whatever it’s named)
2. **Settings → Domains → Add**
3. Add:
   - `stackclash.io`
   - `www.stackclash.io` (optional; redirect www → apex or vice versa)

## 2. DNS at your registrar
Vercel will show exact records. Typical setup:

**Apex (`stackclash.io`):**
- Type: `A` → `76.76.21.21`  
  *(or the A/ALIAS values Vercel displays)*

**www:**
- Type: `CNAME` → `cname.vercel-dns.com`  
  *(or the CNAME Vercel displays)*

Save DNS. Propagation is often minutes; can take up to 48h.

## 3. Vercel env (recommended)
**Settings → Environment Variables:**

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://stackclash.io` |

Redeploy after adding.

## 4. Confirm
```bash
curl -sI https://stackclash.io | head -5
curl -s https://stackclash.io/robots.txt
curl -s https://stackclash.io/sitemap.xml | head -20
```

Code defaults already use `https://stackclash.io` and brand **StackClash**.
