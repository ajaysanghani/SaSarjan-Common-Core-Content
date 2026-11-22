# Site prompt: Incubator.in (upgrade)

Run in: `C:\Users\ajay\OneDrive\Desktop\Happy-Coder\Incubator`. Before starting: local `main` is one
commit behind `origin/main` (the 0.1.1 integration), so run `git pull` on `main` first.

---

Upgrade Incubator.in from `@sasarjan/web-core` 0.1.1 to the new release. First read
`C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SaSarjan-Common-Core-Content\prompts\sites\site-common.md`
and the repo's `CLAUDE.md`, and follow them.

What exists today (on `origin/main`):

- `apps/web/package.json` pins `0.1.1` (pnpm 10 workspace).
- `apps/web/site.config.ts`; `apps/web/app/layout.tsx` imports the stylesheet before `globals.css`,
  with `--swc-*` tokens mapped to the theme.
- `apps/web/components/SiteFooter.tsx` renders the consent statement, then
  `<SharedFooter site={site} linkComponent={Link} />` (`full`).
- `apps/web/app/ecosystem/page.tsx` renders `IntroductionPage`; `/ecosystem` is in the sitemap.

Do:

1. From the repo root: `pnpm add -E @sasarjan/web-core@<version> --filter @incubator/web`. Commit
   `pnpm-lock.yaml`.
2. Keep the consent statement exactly as it is, above the shared footer.
3. Leave the CoCreator destination unset (D6: none yet), switch `/ecosystem` metadata to
   `introductionMetadata`, and use the condensed footer there.
4. Check that canonicals use `NEXT_PUBLIC_SITE_URL` (don't change Vercel env yourself).
5. Run the repo's Playwright e2e tests if they cover the footer or `/ecosystem`.
