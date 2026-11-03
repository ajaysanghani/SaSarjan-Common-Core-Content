# Seven-site rollout

Roll out one site at a time, starting with the simplest and leaving the most unusual stacks for
last. Each site is a separate PR in its own repo, reviewed on its Vercel preview.

## Site inventory (from local repos, 2026-11-03)

| #   | Site         | App folder       | Package manager | Current footer                                | Recommended variant | `/ecosystem` file                           |
| --- | ------------ | ---------------- | --------------- | --------------------------------------------- | ------------------- | ------------------------------------------- |
| 1   | Incubator.in | `apps/web`       | pnpm 10         | `components/SiteFooter.tsx` (one paragraph)   | `full`              | `apps/web/app/ecosystem/page.tsx`           |
| 2   | TalentExcel  | `.`              | npm             | none found                                    | `full`              | `app/ecosystem/page.tsx`                    |
| 3   | Nanha Sitara | `.`              | npm             | inline in `app/layout.tsx`                    | `full` or `band`    | `app/ecosystem/page.tsx`                    |
| 4   | IT Vidya     | `.`              | npm             | `src/components/site-footer.tsx` (dark, rich) | `band`              | `src/app/ecosystem/page.tsx`                |
| 5   | SaSarjan     | `.`              | pnpm            | `src/components/Footer.tsx` (plain CSS)       | `band`              | `src/app/ecosystem/page.tsx`                |
| 6   | SevaPremi    | `apps/web`       | pnpm 10         | `components/site-footer.tsx` (next-intl)      | `band`              | `apps/web/app/[locale]/ecosystem/page.tsx`  |
| 7   | 10xGrowth    | `apps/10xgrowth` | pnpm 9          | `@platform/ui` Footer (`"use client"`)        | `band`              | `apps/10xgrowth/src/app/ecosystem/page.tsx` |

## Checklist for every site

- [ ] Branch from the site's production branch.
- [ ] Install: `-E @sasarjan/web-core@<version>`, with the lockfile committed ([VERCEL-INTEGRATION.md](VERCEL-INTEGRATION.md#in-each-site)).
- [ ] Add `site.config.ts` with `defineSiteConfig({ siteId: "…" })`, including the site's link groups, policy links and `launchYear`.
- [ ] Import `@sasarjan/web-core/styles.css` in the root layout, **before** the site's global CSS.
- [ ] Set brand tokens (`--swc-accent`, footer tokens if the footer is dark) in the site's global CSS.
- [ ] Render `SharedFooter` (`full`, replacing the old footer; or `band`, inside or after the existing one).
- [ ] Add the `/ecosystem` page with `IntroductionPage`, `metadata` and a canonical URL.
- [ ] Link `/ecosystem` from the site's navigation or footer, if wanted.
- [ ] `next build` passes locally.
- [ ] On the Vercel preview, check:
  - [ ] footer at 375px and desktop, with no horizontal scroll
  - [ ] Tab through the footer: visible focus, logical order
  - [ ] the current site shows "You are here"; sister links go to the right canonical hosts
  - [ ] `/ecosystem` has one `<h1>`, correct title and description, and working CTAs
  - [ ] no console errors or hydration warnings
  - [ ] Lighthouse accessibility score unchanged or better
- [ ] Merge, confirm production, and note the version in the site's README or changelog.
- [ ] Enable Dependabot or Renovate for `@sasarjan/web-core`.

## Site-specific notes

### 1. Incubator.in: pilot

- Tailwind 4.1, Next 15.5, React 19. A clean fit for the `full` variant.
- Keep the existing consent statement: render `<SiteFooter />` above `<SharedFooter variant="full" />`, or move the text into the page.
- Install from the repo root: `pnpm add -E @sasarjan/web-core --filter @incubator/web`.
- `siteUrl()` falls back to `http://localhost:3000`, so make sure `NEXT_PUBLIC_SITE_URL` is set in Vercel. That affects canonical URLs, not this package.

### 2. TalentExcel

- No footer exists yet. Use `full`.
- The local checkout is on `claude/fix-logged-out-page-crash`. Branch from `main` and recheck versions there.
- Route groups (`app/(app)`) don't affect `app/ecosystem`. Decide whether logged-in pages show the footer.

### 3. Nanha Sitara

- Plain CSS (`app/globals.css`, 1,400+ lines) with tokens on `:root`. The `swc-` prefix avoids collisions.
- The footer is written inline in `app/layout.tsx`. Either replace it with `full` or keep it and add `band`.

### 4. IT Vidya

- Tailwind 4, Next 16.4. Supports a static export (`output: "export"`). The components are static-export-safe.
- The footer is dark (`bg-forest-deep`). Place `band` inside it and set
  `--swc-footer-bg: transparent; --swc-footer-text: #fff; --swc-footer-muted: rgb(255 255 255 / .75); --swc-border: rgb(255 255 255 / .15)` on `.swc-footer`.
- The page can pass `next/link` as `linkComponent`.

### 5. SaSarjan

- Plain CSS with generic `:root` tokens (`--bg`, `--text`). No conflict, because the package uses `--swc-*` only.
- `siteConfig.name` is currently the provisional "CoCreate India's Future". Decide whether the ecosystem directory shows "SaSarjan"; `siteName` can override it per site.
- `contactEmail` (`info@sasarjan.com`) may become the shared contact once approved.

### 6. SevaPremi

- next-intl with `app/[locale]`. Pass SevaPremi's own `Link` from `@/i18n/routing` as `linkComponent`, so `/ecosystem` becomes `/<locale>/ecosystem` automatically. If its routing uses typed pathnames that reject `/ecosystem`, add the route to the routing config first.
- Translate labels in the layout, then spread the base config:
  ```tsx
  const t = await getTranslations("ecosystem");
  <SharedFooter
    variant="band"
    linkComponent={Link}
    site={{
      ...site,
      labels: { ecosystemHeading: t("heading"), aboutEcosystem: t("about"), currentSite: t("current") },
    }}
  />;
  ```
- Use the `content` prop of `IntroductionPage` for a Hindi version of the copy once one is approved.
- `.nvmrc` pins Node 20.18.1. Move to 22 or 24 (Vercel deprecated Node 20 on 2026-10-01).
- The local repo's only git remote is named `old` (`sevapremi-old.git`). Confirm which repository Vercel deploys before opening the PR.

### 7. 10xGrowth: last

- React **18.3.1** with Next 15.5.12. Covered by `pnpm test:react18` and `examples/next15-react18`.
- The footer comes from `@platform/ui` (a `"use client"` module). Rendering `SharedFooter` there works but ships it to the browser. Better: render `<SharedFooter variant="band" />` from `apps/10xgrowth/src/app/layout.tsx`, a server component, next to the existing `<Footer />`.
- Remove the placeholder social links (`href="#"`) from the old footer while you are there.
- `pnpm add -E @sasarjan/web-core --filter 10xgrowth-website`.

## After all seven

- [ ] Every repo has the bot config and pins the same version.
- [ ] Shared content approved, `pnpm check:drafts` passes, and a release is tagged `latest`.
- [ ] Old duplicated ecosystem copy has been removed from the sites (for example the 10xGrowth footer blurb).
