# Site prompt: Nanha Sitara (first integration)

Run in: `C:\Users\ajay\OneDrive\Desktop\Happy-Coder\NanhaSitara`.

---

Integrate `@sasarjan/web-core` into Nanha Sitara for the first time. First read
`C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SaSarjan-Common-Core-Content\prompts\sites\site-common.md`
and section 3 of `SEVEN-SITE-ROLLOUT.md`, and follow them. Use TalentExcel's integration
(`..\TalentExcel\site.config.ts`, `components\PublicShell.tsx`, `app\ecosystem\page.tsx`) as the
reference pattern.

Known setup: npm, Next 15.5, React 19, plain CSS (`app/globals.css`, 1,400+ lines, tokens on
`:root`). The footer is written inline in `app/layout.tsx`.

Do:

1. `npm install -E @sasarjan/web-core@<version>`; commit the lockfile.
2. Add `site.config.ts` with `siteId: "nanhasitara"`, the existing footer links as `siteLinks`, the
   policy links and `launchYear`.
3. Footer: prefer replacing the inline footer with `variant="full"`, moving its links into
   `siteLinks`. If the inline footer has content that doesn't fit, keep it and add `band` instead.
   Explain the choice in the PR.
4. Map the site's `:root` brand tokens to `--swc-*` tokens in `globals.css`.
5. Add `app/ecosystem/page.tsx` with `IntroductionPage`, `introductionMetadata` and a canonical URL.
6. Link `/ecosystem` from the footer or navigation.
7. Remove any hard-coded ecosystem copy the site already has.
