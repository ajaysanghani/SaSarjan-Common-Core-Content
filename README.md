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

- **`variant="full"`** (default) is a complete `<footer>` landmark for a site without a footer of
  its own. It shows the brand line (SaSarjan | स सर्जन), the common introduction, "Explore the
  SaSarjan Ecosystem" with all seven initiatives (icon, name, headline; your site marked "You are
  here"), the CoCreator block (only with a `cocreator` destination), your site name and link groups,
  contact details (when configured), the closing lines, copyright and policy links.
- **`variant="band"`** is a compact ecosystem `<section>` to put inside or next to a footer the
  site already has: the brand line and tagline, the seven-initiative directory, the CoCreator button
  (only with a destination) and one closing line.

Every block can be turned off in `site.config.ts` under `footer.sections`:

| Key              | Block                                                 | Default                                  |
| ---------------- | ----------------------------------------------------- | ---------------------------------------- |
| `brand`          | Brand line                                            | on                                       |
| `tagline`        | "CoCreating the Future, Together." and the mission    | same as `ecosystemIntro`                 |
| `introduction`   | The rest of the common introduction                   | `full`: as `ecosystemIntro`; `band`: off |
| `ecosystemIntro` | Site name (`full`) and the "About the ecosystem" link | on                                       |
| `ecosystemLinks` | Seven-initiative directory                            | on                                       |
| `cocreator`      | "Become a CoCreator" block (needs `cocreator.href`)   | on                                       |
| `siteLinks`      | Your link groups (`full`)                             | on                                       |
| `contact`        | Contact email (`full`)                                | on                                       |
| `policies`       | Policy links (`full`)                                 | on                                       |
| `closing`        | Closing lines (two in `full`, one in `band`)          | on                                       |

**Condensed footer.** Pages that already show the tagline and introduction, such as `/ecosystem`,
should render `<SharedFooter condensed />`. It drops the tagline, the introduction and the "About
the ecosystem" link, so the tagline appears at most twice on the page. In the App Router, render the
footer from route layouts rather than the root layout so `/ecosystem` can pass the prop:

```tsx
// app/(site)/layout.tsx           → <SharedFooter site={site} linkComponent={Link} />
// app/ecosystem/layout.tsx        → <SharedFooter site={site} linkComponent={Link} condensed />
```

`examples/next-app` is set up this way.

### 3. Add the `/ecosystem` page

```tsx
// app/ecosystem/page.tsx   (SevaPremi: app/[locale]/ecosystem/page.tsx)
import type { Metadata } from "next";
import Link from "next/link";
import { IntroductionPage, introductionMetadata } from "@sasarjan/web-core";
import { site } from "@/site.config";

export const metadata: Metadata = {
  ...introductionMetadata, // { title, description }: plain data, no next import
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

The page has eight sections, in this order: the hero (the page's only `<h1>`, the common
introduction, "Explore Our Initiatives" and "Become a CoCreator"), the vision, the CoCreation
approach, the seven initiative cards, the top-down/bottom-up systems diagram, the participation
pathways, "Become a CoCreator", and the closing lines. Every section is labelled by its `<h2>`, and
every id is `swc-` prefixed (`#swc-initiatives` is the initiatives section).

- **Become a CoCreator** links to `cocreator` from your site config, in the hero and in section 7.
  With no `cocreator` set, both buttons are hidden; the section's text still shows.
- **Your CTAs** (`introduction.ctas`, or the `ctas` prop) and **your `children`** render together
  after "Become a CoCreator", before the closing lines.
- **The initiative cards** always list all seven initiatives and mark yours "You are here".
  `ecosystem.overrides` and `ecosystem.openInNewTab` apply to them. Long focus-area lists show four
  items and collapse the rest into a native `<details>`, so no JavaScript is needed.
- **Translated content in the 0.1 shape.** If you pass `content` without `hero`, the page renders
  the 0.1 layout (title, three sections, directory grid, your CTAs) exactly as before.
- **Tagline.** Pair the page with `<SharedFooter condensed />` (see above): the tagline pair then
  appears twice on the page, in the hero and the closing lines, and not in the footer.
- **Sticky header?** Set `--swc-scroll-margin` to its height, so "Explore Our Initiatives" doesn't
  scroll the section heading under it.

`introductionContent.title` and `.lead[0]` still work as a metadata title and description if you
already use them.

## Components

| Export             | What it renders                                                            |
| ------------------ | -------------------------------------------------------------------------- |
| `SharedFooter`     | `full` footer landmark or `band` ecosystem section                         |
| `EcosystemLinks`   | `<nav>` of the seven sites: `grid`, `list`, `inline` or `directory` layout |
| `EcosystemIcon`    | An initiative's decorative inline SVG icon (`icon` key from the directory) |
| `IntroductionPage` | `/ecosystem` page body: the eight sections, your CTAs and your content     |
| `SharedPageLayout` | Optional title, intro, sections and CTA scaffold                           |
| `SafeLink`         | A link that renders only allowlisted hrefs                                 |

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

The footer's directory, icons, badge and CoCreator button take their colours from the footer text
by default, so they keep their contrast on light and dark footers without extra tokens. Tokens added
in 0.2, all optional:

| Token                                                                     | Used for                                                   | Default                                    |
| ------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------ |
| `--swc-hover-bg`                                                          | Directory hover and current-site background                | `rgb(127 127 127 / .1)`                    |
| `--swc-icon-bg`, `--swc-icon-color`                                       | Initiative icon tile and stroke                            | `rgb(127 127 127 / .14)`, text colour      |
| `--swc-badge-bg`, `--swc-badge-text`                                      | "You are here" badge in the directory                      | transparent, text colour                   |
| `--swc-footer-focus`                                                      | Focus outline inside the footer                            | `--swc-focus` if set, else the text colour |
| `--swc-footer-card-bg`                                                    | CoCreator block background                                 | `rgb(127 127 127 / .06)`                   |
| `--swc-footer-cta-bg`, `--swc-footer-cta-text`, `--swc-footer-cta-border` | "Become a CoCreator" button (an outline button by default) | transparent, text colour, text colour      |
| `--swc-tint`                                                              | `/ecosystem` hero, framework card, CoCreator panel, icons  | `--swc-accent` at 7% over the page         |
| `--swc-scroll-margin`                                                     | Space above a section reached by an in-page link           | `1.5rem`                                   |

For a dark footer, set the footer tokens on `.swc-footer`. If you set `--swc-focus` on `:root` for
your light pages, also set `--swc-footer-focus` there so focus stays visible:

```css
.swc-footer {
  --swc-footer-bg: transparent; /* inside your own dark footer */
  --swc-footer-text: #fff;
  --swc-footer-muted: rgb(255 255 255 / 0.75);
  --swc-border: rgb(255 255 255 / 0.15);
  --swc-footer-focus: #fff;
}
```

Light and dark come only from these tokens; the stylesheet has no `prefers-color-scheme` rules.

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
