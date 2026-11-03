# SaSarjan Common Core Content

`@sasarjan/web-core` holds the shared footer, ecosystem links, `/ecosystem` introduction page,
content and styles for the seven SaSarjan websites. Each piece of content lives here once. The sites
install a pinned version, and a change reaches a site when that site upgrades and redeploys.

| Site         | Domain          |
| ------------ | --------------- |
| SaSarjan     | sasarjan.com    |
| TalentExcel  | talentexcel.com |
| 10xGrowth    | 10xgrowth.com   |
| SevaPremi    | sevapremi.com   |
| Nanha Sitara | nanhasitara.com |
| IT Vidya     | itvidya.com     |
| Incubator.in | incubator.in    |

> **Status:** pre-release. All shared content is marked **draft** until approved
> ([content governance](docs/CONTENT-GOVERNANCE.md)). Drafts can ship on the `next` dist-tag only.

## What belongs here

- The shared footer, links to sister sites, shared legal and contact links
- Other text, links or images repeated across the sites
- Nothing site-specific, nothing private, and no secrets, tokens or `.env` files. **This package
  is public on npm.**

## Install

```bash
npm install @sasarjan/web-core@0.1.0 --save-exact     # or: pnpm add -E @sasarjan/web-core@0.1.0
```

Pin an exact version (`--save-exact` / `-E`). Upgrades should be deliberate pull requests, so
Vercel builds a preview of each site before it goes live.

Requirements: React 18.3 or 19, Next.js 15.5 or 16 (App Router), Node 20.9+. Next.js is not a dependency: the
components work in any React server or client renderer.

## Use it in a site

### 1. Configure the site once

```ts
// site.config.ts
import { defineSiteConfig } from "@sasarjan/web-core/config";

export const site = defineSiteConfig({
  siteId: "talentexcel", // sasarjan | talentexcel | 10xgrowth | sevapremi | nanhasitara | itvidya | incubator
  footer: {
    siteLinks: [{ heading: "TalentExcel", links: [{ label: "Log in", href: "/login" }] }],
    policyLinks: [{ label: "Privacy", href: "/privacy" }],
    launchYear: 2025,
  },
});
```

`defineSiteConfig` validates the config when the module loads, so a typo or unsafe link fails
`next build` with a readable message. Keep this import in server code. `@sasarjan/web-core/config`
contains zod, and the component entry deliberately does not.

### 2. Import the stylesheet and render the footer

```tsx
// app/layout.tsx
import Link from "next/link";
import { SharedFooter } from "@sasarjan/web-core";
import "@sasarjan/web-core/styles.css"; // once, before your own global CSS
import "./globals.css";
import { site } from "@/site.config";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SharedFooter site={site} linkComponent={Link} />
      </body>
    </html>
  );
}
```

There are two footer variants:

- **`variant="full"`** (default) is a complete `<footer>` landmark containing the site name, ecosystem blurb,
  your link groups, the ecosystem directory, contact details (when configured), copyright and policy links.
- **`variant="band"`** is an ecosystem `<section>` to put inside or next to a footer the site already has.

### 3. Add the `/ecosystem` page

```tsx
// app/ecosystem/page.tsx   (SevaPremi: app/[locale]/ecosystem/page.tsx)
import type { Metadata } from "next";
import Link from "next/link";
import { IntroductionPage, introductionContent } from "@sasarjan/web-core";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: introductionContent.title,
  description: introductionContent.lead[0],
  alternates: { canonical: "/ecosystem" },
};

export default function EcosystemPage() {
  return (
    <IntroductionPage site={site} linkComponent={Link}>
      {/* optional site-specific section */}
    </IntroductionPage>
  );
}
```

## Components

| Export             | What it renders                                                             |
| ------------------ | --------------------------------------------------------------------------- |
| `SharedFooter`     | `full` footer landmark or `band` ecosystem section                          |
| `EcosystemLinks`   | `<nav>` directory of the seven sites: `grid`, `list` or `inline` layout     |
| `IntroductionPage` | `/ecosystem` page body: vision, CoCreation, initiatives, CTAs, your content |
| `SharedPageLayout` | Optional title, intro, sections and CTA scaffold                            |
| `SafeLink`         | A link that renders only allowlisted hrefs                                  |

All components are server-compatible. They use no hooks, no `"use client"`, no browser APIs and
no Next.js imports, and ship no JavaScript to the browser unless you render them inside a client
component. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

Links: sister sites open in the same tab by default (`ecosystem.openInNewTab` changes that). Only
`/paths`, `#anchors`, `https:` URLs, `mailto:` and `tel:` are rendered as links. Anything else,
such as `javascript:`, `data:` or `http:`, is rendered as plain text and rejected by `defineSiteConfig`.

## Styling

The stylesheet uses only `.swc-`-prefixed class selectors. It doesn't use resets, element selectors, `:root` or
`@layer`, so it works alongside Tailwind v3, Tailwind v4 and plain global CSS. Fonts and text
colour inherit from the site. Brand it with tokens:

```css
:root {
  --swc-accent: #2b2d7c;
}
.swc-footer {
  --swc-footer-bg: #12352a;
  --swc-footer-text: #fff;
  --swc-footer-muted: #d3e2dc;
}
```

The full token list is at the top of [`src/styles/shared.css`](src/styles/shared.css).

## Translation

Every interface string can be replaced through `labels`. Site names and descriptions can be replaced
through `ecosystem.overrides`, and the introduction copy through the `content` prop of `IntroductionPage`.

## Develop

```bash
pnpm install
pnpm verify          # typecheck, lint, format, tests (React 19 + 18), build, publint, attw, pack check
pnpm test:examples   # pack, install the tarball into examples/, next build both
pnpm check:drafts    # lists content still awaiting approval
```

Use Node 24.15 or later (`.nvmrc`); the test tooling needs it.

## Docs

- [Architecture](docs/ARCHITECTURE.md)
- [Release, upgrade and rollback](docs/RELEASE.md)
- [Vercel and CI integration](docs/VERCEL-INTEGRATION.md)
- [Seven-site rollout](docs/SEVEN-SITE-ROLLOUT.md)
- [Content governance](docs/CONTENT-GOVERNANCE.md)

## License

MIT for the code. Whether the shared brand copy is also MIT-licensed is
[still to be decided](docs/CONTENT-GOVERNANCE.md#open-decisions).
