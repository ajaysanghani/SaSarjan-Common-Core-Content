# Site prompt: 10xGrowth (first integration, last)

Run in: `C:\Users\ajay\OneDrive\Desktop\Happy-Coder\10xGrowth`. The checkout is on
`homepage-hero-rewrite`; branch from `main` (confirm `main`, not `pre-main`, is the production
branch).

---

Integrate `@sasarjan/web-core` into 10xGrowth for the first time. First read
`C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SaSarjan-Common-Core-Content\prompts\sites\site-common.md`,
section 7 of `SEVEN-SITE-ROLLOUT.md`, and the repo's `CLAUDE.md`, and follow them.

Known setup: pnpm 9 monorepo, app in `apps/10xgrowth` (package `10xgrowth-website`), Next 15.5.12,
**React 18.3.1**, Tailwind 3.4. The footer comes from `@platform/ui`, a `"use client"` module, and
contains the ecosystem blurb the package was originally based on.

Do:

1. `pnpm add -E @sasarjan/web-core@<version> --filter 10xgrowth-website`; commit the lockfile.
2. Add `apps/10xgrowth/site.config.ts` (`siteId: "10xgrowth"`), server-only.
3. Render `<SharedFooter variant="band" />` from `apps/10xgrowth/src/app/layout.tsx` (a server
   component) next to the existing `<Footer />`, not inside the client footer.
4. Remove the old ecosystem blurb and the placeholder social links (`href="#"`) from the
   `@platform/ui` footer. First check whether another app in the monorepo uses that footer; if one
   does, make the removal configurable instead.
5. Add `apps/10xgrowth/src/app/ecosystem/page.tsx` with `IntroductionPage`, `introductionMetadata`
   and a canonical.
6. Check that the 10xGrowth card (studios list) reads correctly, and that `next/link` as
   `linkComponent` has no React 18 type errors.
