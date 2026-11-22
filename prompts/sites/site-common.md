# Common rules for every site session

Each per-site prompt in this folder tells Claude to read this file first. The package repo lives at
`C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SaSarjan-Common-Core-Content` (below: `CORE`).

## Read first

1. `CORE\docs\SEVEN-SITE-ROLLOUT.md`: the checklist and this site's section.
2. `CORE\docs\VERCEL-INTEGRATION.md`: install and lockfile rules.
3. `CORE\README.md` and `CORE\CHANGELOG.md`: the current API, especially the new `0.2.0` options
   (CoCreator destination, footer sections, condensed footer, `introductionMetadata`).
4. `CORE\prompts\content-brief.md`: the decisions table. D6: no CoCreator destination is set yet,
   so leave it unset and the CTA stays hidden. D7: this PR may go live on 0.2.0 before the copy is
   approved, so it must be production-ready, not a throwaway preview.
5. This site's own `CLAUDE.md`, if it has one. It wins over these rules on anything site-specific.

The site prompts use the names the package prompts asked for (`introductionMetadata`, "the
condensed footer", "the CoCreator destination"). If the released API names them differently, use
what the package's README and CHANGELOG say.

## Rules

- **Branch** from the site's production branch (usually `main`; check `git branch -a`). Never work on
  an unrelated feature branch that happens to be checked out.
- **Install the exact version** the package release published (expected `0.2.0`), with the site's
  own package manager and `-E`. Commit the lockfile.
- **No copy in the site.** Ecosystem wording comes from the package. Delete old hard-coded ecosystem
  blurbs instead of keeping two versions. Site-specific copy goes in `site.config.ts` or the page's
  `children` slot.
- **Config, not forks.** Everything site-specific goes through `site.config.ts`
  (`defineSiteConfig({ siteId: "…" })`), CSS tokens and component props. Never copy package
  components or CSS into the site.
- **Styles:** import `@sasarjan/web-core/styles.css` in the root layout before the site's global
  CSS. Map brand colours with `--swc-*` tokens only.
- **Server components:** render `SharedFooter` and `IntroductionPage` from server components where
  possible. `site.config.ts` imports zod: keep it server-only (TalentExcel uses
  `import "server-only"`).
- **`/ecosystem`:** use the condensed footer on that page if the site renders the footer from a
  layout that can tell; set metadata from `introductionMetadata` and a canonical URL.
- **Don't** merge, deploy, push to the production branch or change Vercel settings. Push a feature
  branch and open a PR. Ask me before any change outside this site's repo.
- Unrelated problems you notice (outdated Node, broken links elsewhere): list them in the PR, don't
  fix them in this PR.

## Verify before opening the PR

- Lint, typecheck, tests and a production build (`next build`) all pass with the site's own scripts.
- Run the dev server and check in the browser at 375, 768 and 1280px:
  - footer: no horizontal scroll, "You are here" on this site, all seven links go to the right
    canonical hosts, CoCreator CTA present only if configured, visible keyboard focus, logical tab
    order;
  - `/ecosystem`: one `<h1>`, all eight sections, working anchors and CTAs, tagline at most twice
    including the footer, correct `<title>`, description and canonical;
  - no console errors or hydration warnings; the site's own header, footer links and dark mode (if
    any) still look right.
- Screenshots of the footer and `/ecosystem` at mobile and desktop go in the PR.

## Report

End with a short report: files changed, the config you set, what you removed, test and build
results, anything you couldn't verify, and open decisions. Note the PR link.
