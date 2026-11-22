# Site prompt: SevaPremi (first integration)

Run in: `C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SevaPremi`. Before starting: the repository is
`ajaysanghani/SevaPremi`, not `sevapremi-old`. The local checkout's only remote is `old`
(`sevapremi-old.git`), so add `ajaysanghani/SevaPremi` as `origin` yourself; don't leave it to Claude.

---

Integrate `@sasarjan/web-core` into SevaPremi for the first time. First read
`C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SaSarjan-Common-Core-Content\prompts\sites\site-common.md`,
section 6 of `SEVEN-SITE-ROLLOUT.md`, and the repo's `CLAUDE.md`, and follow them.

Known setup: pnpm 10 monorepo, app in `apps/web`, Next 15.5, React 19, Tailwind 3.4, next-intl with
`app/[locale]`, Hindi alongside English. Footer: `apps/web/components/site-footer.tsx`. `.nvmrc`
pins Node 20.18.1.

SevaPremi is the bottom-up counterpart to SaSarjan in the page's diagram, so check that its entry
and focus areas render correctly in both languages.

Do:

1. `pnpm add -E @sasarjan/web-core@<version> --filter <the apps/web package name>`; commit the
   lockfile.
2. Add `site.config.ts` (`siteId: "sevapremi"`), server-only.
3. Pass SevaPremi's `Link` from `@/i18n/routing` as `linkComponent`, so `/ecosystem` becomes
   `/<locale>/ecosystem`. If typed pathnames reject `/ecosystem`, add the route to the routing config.
4. Add `SharedFooter variant="band"` to the footer, with labels from `getTranslations("ecosystem")`
   (pattern in the rollout notes). Add English keys to the message files. For Hindi, add the keys with
   English text and list them in the PR as needing translation. Don't machine-translate brand copy.
5. Add `apps/web/app/[locale]/ecosystem/page.tsx` with `IntroductionPage`, `introductionMetadata` and
   a locale-aware canonical.
6. Node 20 is deprecated on Vercel. Don't change it in this PR unless the build needs it; mention it.
