# Prompt 02: footer (package repo)

Run in: `SaSarjan-Common-Core-Content`, on a new branch from `main` after prompt 01's PR is merged.

---

Improve the existing `SharedFooter` in `@sasarjan/web-core`. Do not create a second footer.

**Read first:** `docs/ARCHITECTURE.md` (server/client boundaries, CSS isolation, accessibility),
`prompts/content-brief.md` (footer copy), `src/components/SharedFooter.tsx`,
`src/components/EcosystemLinks.tsx`, `src/styles/shared.css`, and the content modules prompt 01
added. Then look at how the sites use the footer today:

- TalentExcel: `variant="band"` inside `components/PublicShell.tsx`, with `next/link`.
- Incubator.in: rendered with its own `SiteFooter` (see `docs/SEVEN-SITE-ROLLOUT.md`).
- Planned: `band` inside a dark footer (IT Vidya), inside a `"use client"` footer (10xGrowth),
  with next-intl links (SevaPremi). See the site notes in `docs/SEVEN-SITE-ROLLOUT.md`.

## What the footer should show

**`full` variant** (a site with no footer of its own): brand line (SaSarjan | स सर्जन, with
`lang="hi"` on the Devanagari), the common introduction, "Explore the SaSarjan Ecosystem" with all
seven initiatives (icon, name, headline, link; current site marked), the CoCreator block when the
site configures a destination, the site's own link groups, contact and policies (as today), then the
closing lines and the copyright.

**`band` variant** (inside an existing site footer) must stay compact: brand line and tagline, a
compact seven-initiative directory (name and headline), the CoCreator CTA if configured, and one
closing line. Keep the long introduction out of `band` unless the site turns it on.

Every block can be switched off through `FooterSections`. Add new keys for the new blocks; keep the
existing keys and their defaults.

Add a way for a page to ask for the condensed footer, so `/ecosystem` doesn't repeat the tagline
(brief: at most twice per page, footer included). A new optional prop is fine.

## Design

Modern, clean and calm. A clear hierarchy, an attractive but compact directory, reflowing cleanly
from 320px to wide desktop. SaSarjan can lead the directory, but it stays one of seven, not a
parent brand. No animation beyond subtle hover and focus states.

- **Icons:** small inline SVGs in the package, one per initiative, consistent stroke and size,
  `aria-hidden`. No icon library and no image files.
- **Theming:** use only `--swc-*` tokens with `var()` fallbacks. Light and dark come from the host
  site setting tokens (IT Vidya sets dark footer tokens); don't add `prefers-color-scheme` rules.
  Check contrast in both the default and IT Vidya's dark token set.
- **CSS rules from ARCHITECTURE.md:** `.swc-` class selectors only, no `@layer`, no element or
  `:root` selectors. New tokens are allowed, documented in the README.

## Rules

- Pure server-safe components: no hooks, state, effects, `next/*` imports or `"use client"`.
- Existing props, class names and tokens keep working. Additive only (minor changeset).
- No new dependencies.

## Done when

- Tests render `full` and `band` for all seven `siteId`s, with and without a CoCreator destination,
  and with Hindi label overrides. They assert one landmark per variant (`<footer>` for `full`,
  labelled `<section>` for `band`), `aria-current` on the current site, and that the CTA is absent
  when unconfigured.
- `pnpm verify:release` passes (includes the React 18 tests and both example builds, which also check
  that the components ship no client JS in the Next 16 example).
- You ran an example app and checked the footer in a browser at 375, 768 and 1280px: no horizontal
  scroll, visible keyboard focus, logical tab order, hostile global CSS in the Next 15 example has no
  effect. Attach screenshots to the PR.
- A PR is open with a changeset. Do not merge it.
