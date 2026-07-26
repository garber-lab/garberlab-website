# Garber Lab website

Source for the Garber Lab website — Department of Bioinformatics and Computational Biology, UMass Chan Medical School.

## Stack

Next.js (static export), React, TypeScript, Tailwind CSS. Deployed to
Cloudflare Pages.

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
