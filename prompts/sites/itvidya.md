# Site prompt: IT Vidya (first integration)

Run in: `C:\Users\ajay\OneDrive\Desktop\Happy-Coder\ITVidya`.

---

Integrate `@sasarjan/web-core` into IT Vidya for the first time. First read
`C:\Users\ajay\OneDrive\Desktop\Happy-Coder\SaSarjan-Common-Core-Content\prompts\sites\site-common.md`
and section 4 of `SEVEN-SITE-ROLLOUT.md`, and follow them. Use TalentExcel's integration as the
reference pattern.

Known setup: npm, Next 16.4, React 19.3, Tailwind 4, optional static export (`output: "export"`).
The footer is `src/components/site-footer.tsx`: dark (`bg-forest-deep`) and rich.

Do:

1. `npm install -E @sasarjan/web-core@<version>`; commit the lockfile.
2. Add `site.config.ts` (`siteId: "itvidya"`, policy links, `launchYear`), server-only.
3. Place `<SharedFooter variant="band" />` inside the existing dark footer. Set the dark tokens on
   `.swc-footer` as in the rollout notes (`--swc-footer-bg: transparent`, white text, muted at 75%,
   border at 15%) and check contrast, including the CoCreator CTA and the initiative icons.
4. Add `src/app/ecosystem/page.tsx` with `IntroductionPage`, `introductionMetadata`, a canonical, and
   `next/link` as `linkComponent`.
5. Build both the normal build and the static export (if the repo has a script for it), and check
   `/ecosystem` in the exported output.
6. Remove any duplicated ecosystem copy from the old footer.
