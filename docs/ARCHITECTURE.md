# Architecture

## Goals

- **One source of truth.** Shared footer, ecosystem directory, `/ecosystem` copy and styles live
  in this package.
- **Sync at deploy time.** A site picks up a change when it upgrades its pinned version and
  redeploys. Nothing is fetched at runtime: there is no API, CMS, database or iframe.
- **Safe for seven different stacks.** The sites vary in React version, Tailwind version, router layout and footer
  setup (see the matrix below).

## Package layout

```
src/
  index.ts                 entry "."        components, content, types (no zod)
  config.ts                entry "./config" defineSiteConfig, schemas, draft checks (zod)
  components/              SharedFooter, EcosystemLinks, IntroductionPage, SharedPageLayout, SafeLink
  content/                 sites.ts, introduction.ts, footer.ts (shared content + default labels)
  config/                  types.ts (public types), schema.ts (zod schemas)
  lib/                     url.ts (href allowlist), resolve.ts (defaults, merging)
  styles/shared.css        copied to dist/styles.css → "./styles.css"
tests/                     vitest: url, config, components (jsdom), ssr (React 19 and 18)
tests/react18/             separate npm install of React 18.3 for `pnpm test:react18`
examples/next-app/         Next 16 + React 19 + Tailwind v4, App Router
examples/next15-react18/   Next 15.5 + React 18.3 + Tailwind v3, footer inside "use client"
scripts/                   build, release-gate and verification scripts
```

The build uses tsup. It produces ESM-only JavaScript, `.d.ts` files and source maps. Both entries share one chunk for
content and URL helpers. Every consumer is on Next.js 15 or later, which handles ESM natively.

## Compatibility matrix (inspected 2026-11-03)

| Site         | Next    | React   | Styling      | Notes                                |
| ------------ | ------- | ------- | ------------ | ------------------------------------ |
| SaSarjan     | 15.5.28 | 19.1.10 | plain CSS    | tokens on `:root` (`--bg`, `--text`) |
| TalentExcel  | 15.5.28 | 19.1.10 | Tailwind 3.4 |                                      |
| 10xGrowth    | 15.5.12 | 18.3.1  | Tailwind 3.4 | footer rendered from `"use client"`  |
| SevaPremi    | 15.5.27 | 19.0.0  | Tailwind 3.4 | next-intl, `app/[locale]`            |
| Nanha Sitara | 15.5.28 | 19.0.0  | plain CSS    |                                      |
| IT Vidya     | 16.4.3  | 19.3.0  | Tailwind 4   | optional static export               |
| Incubator.in | 15.5.28 | 19.1.10 | Tailwind 4.1 |                                      |

This gives `peerDependencies` of `react` and `react-dom` at `^18.3.0 || ^19.0.0`, with no dependency on
`next`. The only runtime dependency is zod 4, and only `./config` imports it.

## Server and client boundaries

The components are pure functions of their props. They use no hooks, state, effects, context,
browser APIs or `next/*` imports, and have no `"use client"` or `server-only` directive. As a result:

- In a **server component** they render to HTML and ship **no JavaScript**.
  `pnpm test:examples` checks this by searching the Next 16 example's client chunks for the
  package's class names.
- Inside a **client component**, as in 10xGrowth, they work too. That example deliberately bundles them,
  and the check expects to find them in its client chunks.
- **Static export** (IT Vidya's `output: "export"`) works because nothing depends on the request.
- **Hydration:** output depends only on props. The one time-dependent value is the copyright year
  (`new Date()`). Pass `year` if a footer is rendered in a client component and you want to rule
  out a mismatch around New Year.

zod is kept out of the component entry so a client-rendered footer doesn't pull a validation
library into the browser. `pnpm test:examples` also checks that zod is absent from client chunks.

`linkComponent` lets a site pass `next/link` for site-relative links. Links to sister sites always use
plain `<a>`, because they go to other domains.

## CSS isolation

- The stylesheet uses only `.swc-` class selectors. There are no element, `:root`, `html` or `body` selectors
  and no resets.
- It uses **no `@layer`.** Unlayered rules always beat layered ones, so Tailwind v3's base reset and the
  plain-CSS sites' global element rules (`h2 { … }`, `a { … }`) would override layered package
  styles. Unlayered single-class selectors beat element selectors on specificity, and any site
  class aimed at the same element still wins over the package.
- Tokens are `--swc-*` with defaults inside `var()` fallbacks, never declared on a class.
  A value set on any ancestor therefore reaches nested components, such as the `EcosystemLinks`
  inside `SharedFooter`. The prefix avoids collisions with sites' generic tokens like SaSarjan's `--bg`.
- Fonts and body text colour inherit from the site.

The Next 15 example adds hostile global rules (`a { color: red }`, `h2 { font-size: 3rem }`,
`ul { list-style: square }`). The browser check confirmed none of them reach the shared components.

## Content model

Content is typed TypeScript data validated by zod schemas in tests and at release:

| Module                    | Holds                                                                    |
| ------------------------- | ------------------------------------------------------------------------ |
| `content/sites.ts`        | the seven sites: id, name, domain, canonical URL, blurb                  |
| `content/introduction.ts` | `/ecosystem` copy: lead, Vision, CoCreation, initiatives                 |
| `content/footer.ts`       | ecosystem blurb, contact, copyright holder, policy links, default labels |
| site `site.config.ts`     | per-site config, validated by `defineSiteConfig`                         |

Every content module has `status: "draft" | "approved"`. `pnpm check:drafts` fails while
anything is draft, and the release workflow runs it for `latest` releases.

## Security

- **Href allowlist** (`lib/url.ts`): site-relative paths, `#anchors`, `https:` without credentials,
  `mailto:` and `tel:`. Rejected: `javascript:`, `data:`, `vbscript:`, `http:`, `//host`, `/\host`,
  control characters and whitespace. Unsafe values are rejected by `defineSiteConfig` at build time
  and rendered as plain text by `SafeLink` at render time.
- External links opened in a new tab get `rel="noopener noreferrer"` and screen-reader text.
- `scripts/check-pack.mjs` refuses to publish sources, tests, examples, `.env*`, `.npmrc`, keys
  or tarballs.
- Publishing uses npm trusted publishing (OIDC), so no npm token is stored anywhere.

## Accessibility

- Landmarks: the `full` footer is a `<footer>` (contentinfo), and `band` is a labelled `<section>`, which
  avoids a second contentinfo. Directories and link groups are labelled `<nav>` elements.
- The current site is marked `aria-current="true"` with a visible "You are here" badge.
- `IntroductionPage` and `SharedPageLayout` render one `<h1>`, and each section is labelled by its `<h2>`.
- Links have visible focus outlines (`--swc-focus`) and buttons have a 44px minimum height. Layouts reflow down to 320px with no
  horizontal scroll (checked at 375px).
- Default colours meet WCAG AA contrast on white: text #1c1d21, muted #4b5060, accent #8a1f5c.
  If you override tokens, check your own contrast.
