# Prompt 03: `/ecosystem` page (package repo)

Run in: `SaSarjan-Common-Core-Content`, on a new branch from `main` after prompt 02's PR is merged.

---

Improve the existing `IntroductionPage` (and `SharedPageLayout` where needed) in
`@sasarjan/web-core`. Do not add a second page component or route.

**Read first:** `docs/ARCHITECTURE.md`, `prompts/content-brief.md` (the eight sections, the
repetition rule, the SEO copy), `src/components/IntroductionPage.tsx`,
`src/components/SharedPageLayout.tsx`, `src/components/EcosystemLinks.tsx`, `src/styles/shared.css`,
and the content added in prompt 01. Then look at TalentExcel's `app/ecosystem/page.tsx`
(`../TalentExcel`), which is the first consumer: it wraps the page in its own shell, zeroes
`--swc-gutter`, passes `next/link`, and builds metadata from `introductionContent`.

## What to build

The eight sections from the brief, in order, using the shared content modules (no copy inside
components):

1. Hero with both CTAs: "Explore Our Initiatives" jumps to section 4; "Become a CoCreator" uses the
   site's configured destination and is hidden when unset. Site-specific `ctas` (TalentExcel has
   two) keep rendering, placed where they read naturally.
2. Vision: four dimensions as a small grid.
3. CoCreation approach: eight participants as compact tiles.
4. Seven initiative cards: icon, category, name, headline, positioning, focus areas (collapsed to a
   short list where long; no JavaScript), "Explore website" link. SaSarjan visually distinguished as
   the framework. The current site is marked.
5. Top-down / bottom-up diagram built in HTML and CSS: two labelled tiers (National → State →
   District, Village → Ward → Taluka → Block) meeting in the middle, with the five supporting
   initiatives around them. On mobile it stacks vertically. It must make sense to a screen reader
   as an ordered structure, not only visually. No images of text, no canvas, no SVG text-heavy
   diagram.
6. Participation philosophy: five pathways, presented as interconnected, not as steps.
7. Become a CoCreator: who, pathways, CTA.
8. Closing.

Keep the existing `children` slot (site-specific content), `ctas`, `content`, `as` and `className`
props. If a site passes old-shape `content` without the new sections, render the page as it renders
today.

Export the SEO title and description as plain data (for example `introductionMetadata`), with no
`next` import, so sites can use it in `generateMetadata`/`metadata`. Keep `introductionContent.title`
and `.lead` meaningful for existing callers.

## Design

Contemporary, inspiring, trustworthy and community-oriented, not a corporate group directory.
Better typography, spacing and hierarchy; consistent cards; generous but not wasteful whitespace on
mobile. Use the existing `--swc-*` tokens and add new ones only when needed. Fonts inherit from the
host site. Same CSS rules and server-only constraints as prompt 02. Reuse prompt 02's icons.

## Rules

- One `<h1>` on the page; every section labelled by its `<h2>`; sensible heading levels below.
- Anchor ids are unique and `swc-` prefixed.
- Additive API changes only; minor changeset.

## Done when

- Tests cover: one `<h1>`, all eight sections present with new content, old-shape `content` still
  renders the old layout, CoCreator CTA hidden when unset, anchors resolve, all seven `siteId`s.
- `pnpm verify:release` passes.
- You updated both example apps' `/ecosystem` pages to the new API where useful, ran one in a
  browser, and checked 375, 768 and 1280px, keyboard navigation, and that the tagline appears at most
  twice including the footer. Screenshots in the PR.
- A PR is open with a changeset. Do not merge it.
