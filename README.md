# tollbooth-dpyc-site

Marketing site for [Tollbooth-DPYC](https://github.com/lonniev/tollbooth-dpyc) and Pricing Studio.

Live at **https://tollbooth-dpyc.com** (and `https://tollbooth-dpyc.org` redirects there).

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind 3 + `@tailwindcss/typography`
- `framer-motion` for entrance animations
- `lucide-react` for iconography
- Cloudflare Pages for hosting (auto-deploys from `main`)

## Develop

```bash
npm install
npm run fetch:members   # pull live DPYC community registry into src/data/operators.json
npm run dev             # http://localhost:5173
```

## Build

```bash
npm run build           # outputs to dist/
npm run preview         # preview the production build locally
```

`npm run build` does not auto-fetch members — run `npm run fetch:members` first if the
registry snapshot is stale. (Production builds on Cloudflare Pages run both via the
configured build command, see below.)

## Deploy: Cloudflare Pages

After buying the domain at Cloudflare and connecting this repo as a Pages project:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run fetch:members && npm run build` |
| Build output dir | `dist` |
| Root directory | `/` |
| Node version | 20 (set via `NODE_VERSION` env var) |

Cloudflare Pages edge-flattens the apex CNAME, so `tollbooth-dpyc.com` (apex) and
`www.tollbooth-dpyc.com` both work without an apex-redirect workaround.

## Redirect from .org → .com

The `.org` domain is in AWS Route 53. Cleanest setup is a redirect-only S3 bucket:

1. Create bucket `tollbooth-dpyc.org` in S3, **Static website hosting** → "Redirect requests for an object" → host `tollbooth-dpyc.com`, protocol `https`.
2. Create the same for `www.tollbooth-dpyc.org`.
3. Route 53 ALIAS records from both apex and `www.` to the corresponding S3 website endpoints.
4. (Optional) Front with CloudFront for HTTPS at apex; without CloudFront the redirect works on HTTP only at apex.

## Editing the marketing copy

Every component has a `[ ... TBD ]` comment marker where the placeholder copy lives.
Search for `TBD` to find them all. Owner-voice rewrites land directly in the components —
no CMS, no backend.

## Pricing Studio screenshot

Drop a PNG (or video poster + Loom embed) at `public/pricing-studio.png` and update the
placeholder in `src/components/PricingStudio.tsx`.
