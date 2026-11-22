# Site prompt: TalentExcel (upgrade, pilot)

Run in: `C:\Users\ajay\OneDrive\Desktop\Happy-Coder\TalentExcel`. Run this first among the sites.

---

Upgrade TalentExcel from `@sasarjan/web-core` 0.1.1 to the new release. First read
`C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SaSarjan-Common-Core-Content\prompts\sites\site-common.md`
and follow it.

What exists today (on `main`):

- `package.json` pins `"@sasarjan/web-core": "0.1.1"` (npm).
- `site.config.ts` (`server-only`): `siteId: "talentexcel"`, one link group, three policy links, two
  introduction CTAs.
- `app/layout.tsx` imports the package stylesheet.
- `components/PublicShell.tsx` renders
  `<SharedFooter variant="band" site={sharedSite} linkComponent={Link} />`.
- `app/ecosystem/page.tsx` renders `IntroductionPage` inside `PublicShell`, sets `--swc-gutter: 0px`,
  and builds metadata from `introductionContent.title` and `.lead[0]`.

Do:

1. `npm install -E @sasarjan/web-core@<version>` and commit `package-lock.json`.
2. Leave the CoCreator destination unset (D6: none yet); confirm the CTA is hidden.
3. Switch `/ecosystem` metadata to `introductionMetadata`; keep the canonical.
4. Use the condensed footer on `/ecosystem` (`PublicShell` may need a prop for that).
5. Recheck the `max-w-5xl` shell and zeroed gutter against the new sections; adjust if the page now
   looks cramped, without forking package CSS.
6. Check that logged-in (`app/(app)`) pages are unaffected.

This is the pilot: in the PR, note anything in the package API that felt awkward, so it can be fixed
in the package before the other six sites.
