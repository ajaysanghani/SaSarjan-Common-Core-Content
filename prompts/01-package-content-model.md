# Prompt 01: content model and copy (package repo)

Run in: `SaSarjan-Common-Core-Content`, on a new branch from `main`.

---

You are enhancing the existing `@sasarjan/web-core` package (shared footer, ecosystem directory
and `/ecosystem` page for the seven SaSarjan sites). This is not a new project: no new package, no
parallel components, no new design system.

**Read first, in this order, and follow them:** `docs/ARCHITECTURE.md`, `docs/CONTENT-GOVERNANCE.md`,
`docs/RELEASE.md`, then `prompts/content-brief.md` (the copy and the decisions table: apply the
default for any decision left blank). Then read `src/config/types.ts`, `src/config/schema.ts`,
`src/content/*.ts`, `src/lib/resolve.ts` and the tests.

## Scope of this step

Data and copy only. Components may change only as far as needed to keep typecheck and tests green.
Footer layout is prompt 02; the page is prompt 03.

## What to do

1. **Extend `EcosystemSite`** with optional fields: native name (e.g. स सर्जन), `headline`,
   `positioning`, `focusAreas`, `category`, an icon key, and a way to mark SaSarjan as the overarching
   framework (for example `role: "framework" | "initiative"`). Keep every existing field. Update the
   zod schemas and `ecosystem.overrides` so sites can translate the new fields too.
2. **Add the messaging hierarchy and common introduction once**, in one content module that both the
   footer and the page will import. No copy may be duplicated across modules.
3. **Extend `IntroductionContent`** with optional fields for the eight page sections in the brief.
   Keep `vision`, `cocreation`, `initiatives`, `title` and `lead` present and meaningful: TalentExcel
   reads `introductionContent.title` and `introductionContent.lead[0]` for its metadata today, and
   sites may pass their own `content` in the old shape.
4. **Extend `FooterContent`** with the footer blocks in the brief (brand line, CoCreator block,
   closing). Keep `ecosystemBlurb`.
5. **Add `Labels`** for every new interface string ("Explore website", "Become a CoCreator",
   section headings that are UI rather than content). Everything visible must be overridable for
   SevaPremi's Hindi.
6. **Add a CoCreator destination to `SiteConfig`** (a `LinkItem`-style field), validated by the
   existing href allowlist. Absent means the CTA is hidden. Do not invent URLs.
7. **Fill in the seven initiatives** from the brief. Set `description` to the first sentence of the
   positioning. Keep URLs per decision D2.
8. **Status:** every new or reworded item is `status: "draft"` with the `// DRAFT: requires approval`
   comment. Never set anything to `approved`.
9. **Docs:** update the "Sources of the current drafts" and "Open decisions" tables in
   `docs/CONTENT-GOVERNANCE.md`, and the content-model table in `docs/ARCHITECTURE.md`.
10. **Changeset:** `minor`, written for the site teams: new optional fields, new labels, new config
    field, reworded descriptions. State that nothing is removed or renamed.

## Rules

- Additive only. No removed or renamed exports, props, types, classes or `--swc-*` tokens.
- No new runtime dependencies. zod stays out of the `.` entry.
- `src/content/` is published publicly on npm: no internal URLs, emails or names that aren't approved.

## Done when

- `pnpm verify` passes. `pnpm check:drafts` fails only because of draft content, and lists it.
- Tests cover: the new schema fields (valid and invalid), all seven sites parse, the CoCreator href
  goes through the allowlist, old-shape `content` still typechecks.
- A PR is open against `main` with a summary of type changes, a list of any copy you wrote yourself,
  and the decisions you defaulted. Do not merge it.
