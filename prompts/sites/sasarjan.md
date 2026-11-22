# Site prompt: SaSarjan (first integration)

Run in: `C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SaSarjan`.

---

Integrate `@sasarjan/web-core` into SaSarjan for the first time. First read
`C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SaSarjan-Common-Core-Content\prompts\sites\site-common.md`
and section 5 of `SEVEN-SITE-ROLLOUT.md`, and follow them. Use TalentExcel's integration as the
reference pattern.

Known setup: pnpm, Next 15.5, React 19, plain CSS with generic `:root` tokens (`--bg`, `--text`).
The footer is `src/components/Footer.tsx`. `src/config/site.ts` has the provisional name
"CoCreate India's Future" and `contactEmail: "info@sasarjan.com"`.

SaSarjan is the overarching framework. Check that its own pages don't contradict the new positioning
in the package (top-down systems redesign; the other six are complementary). List any
contradictions in the PR; don't rewrite the site's own pages in this PR.

Do:

1. `pnpm add -E @sasarjan/web-core@<version>`; commit the lockfile.
2. Add `site.config.ts` (`siteId: "sasarjan"`). Don't set `siteName` to the provisional name unless I
   confirm it; the directory should say "SaSarjan". Don't set the shared contact email; that decision
   is still open.
3. Add `<SharedFooter variant="band" />` inside or after `Footer.tsx`. Map tokens to `--swc-*`.
4. Add `src/app/ecosystem/page.tsx` with `IntroductionPage`, `introductionMetadata` and a canonical.
   If SaSarjan already has an "about the ecosystem" page, link to `/ecosystem` rather than keeping two.
