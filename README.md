# Garber Lab website

Source for the Garber Lab website — Department of Genomics and Computational Biology, UMass Chan Medical School.

## Stack

Next.js (static export), React, TypeScript, Tailwind CSS. Deployed as a
Cloudflare Worker with static assets (Workers Builds deploys every push to
`main`). The public address https://garberlab.umassmed.edu is an Apache
reverse proxy in front of the `workers.dev` host.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Produces a static export in `out/`.

## Content

Site copy lives in `data/*.ts`, separate from the presentational components
in `components/*.tsx`. Edit the data files to change page content without
touching component code.

## Search engines

`app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml` and `robots.txt`
at build time. New pages appear in the sitemap once they are added to
`data/navigation.ts`. Every page declares its canonical URL on
garberlab.umassmed.edu, so search engines ignore the `workers.dev` copy.

## Engagement analytics

`components/analytics.tsx` sends small beacons (page opens, scroll depth,
visible time, sections read, clicks on publications and outbound links) to
the Worker in `worker/index.ts`, which stores them in the D1 database
`garberlab-analytics`. No cookies and no fingerprinting; a random id in
sessionStorage groups one browser tab. The visitor's organization and
location come from Cloudflare's own request metadata.

The dashboard is at https://garberlab.umassmed.edu/admin (HTTP Basic Auth).
Raw events are kept for 400 days and visitor IPs for 90 days (daily cron).

One-time setup, run by someone with access to the Cloudflare account:

```bash
npx wrangler d1 create garberlab-analytics   # paste the id into wrangler.jsonc
npm run db:migrate:remote
npx wrangler secret put ADMIN_USER
npx wrangler secret put ADMIN_PASSWORD         # prompts, never type it inline
```

Local preview of the Worker and dashboard:

```bash
npm run db:migrate:local
echo "ADMIN_OPEN_LOCALHOST=1" > .dev.vars      # skips the password on localhost only
npm run dev:worker                             # http://localhost:8787/?track=1 then /admin
npm test                                       # Worker helper unit tests
```
