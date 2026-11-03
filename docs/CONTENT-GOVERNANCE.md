# Content governance

This package is **public on npm**. Anything committed to `src/content/` can be read by anyone,
forever, in every published version. Treat it like a press release.

## What may go in

- Ecosystem messaging approved for public use (vision, CoCreation, initiative descriptions)
- Site names, approved domains and canonical URLs
- Contact details explicitly approved for public, ecosystem-wide use
- Links to published policy pages

## What must never go in

- Secrets, tokens, API keys, `.env` values, internal URLs (admin panels, previews, staging)
- Private business information: pricing, client names, metrics not already public, internal plans
- Personal contact details not approved for publication
- Invented facts: URLs, phone numbers, addresses, legal entity names or claims nobody has confirmed

## Draft and approval workflow

Every content module and every site entry has a `status`:

- `draft`: renders normally, but **blocks a `latest` release** (`pnpm check:drafts`).
- `approved`: signed off by a content owner.

To change content:

1. Edit `src/content/*.ts` in a PR. Anything new or reworded goes back to `status: "draft"`, unless the
   approver is reviewing this same PR.
2. Add a changeset (`pnpm changeset`) describing the wording change for the site teams.
3. A content owner reviews the wording on the PR, ideally using a Vercel preview of a site on a
   `next` build.
4. On approval, set `status: "approved"` and remove the `// DRAFT: requires approval` comment
   in the same PR, or in a follow-up PR the owner approves.
5. Release ([RELEASE.md](RELEASE.md)).

`pnpm check:drafts` lists exactly which items are still draft.

## Owners

| Content                                        | File                          | Owner (to confirm)           |
| ---------------------------------------------- | ----------------------------- | ---------------------------- |
| Ecosystem directory: names, URLs, descriptions | `src/content/sites.ts`        | each site's owner + SaSarjan |
| `/ecosystem` copy                              | `src/content/introduction.ts` | SaSarjan                     |
| Footer blurb, contact, copyright, policies     | `src/content/footer.ts`       | SaSarjan + legal             |
| Interface labels                               | `src/content/footer.ts`       | package maintainers          |

`.github/CODEOWNERS` requests review from the repository owner on every PR. Add the content owners
there once they are named.

## Sources of the current drafts

Nothing was invented. Each draft was condensed from existing published copy:

| Item                                            | Source                                                                                                                                                               |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SaSarjan description, intro, Vision, CoCreation | SaSarjan `src/config/site.ts` tagline and hero, `layout.tsx` description, FAQ                                                                                        |
| TalentExcel description                         | TalentExcel `app/layout.tsx` metadata                                                                                                                                |
| 10xGrowth description                           | 10xGrowth `layout.tsx` metadata (headline numbers left out)                                                                                                          |
| SevaPremi description                           | SevaPremi `packages/i18n/messages/en.json` `footer.description`                                                                                                      |
| Nanha Sitara description                        | Nanha Sitara `app/layout.tsx` title and description                                                                                                                  |
| IT Vidya description                            | IT Vidya `src/content/site.ts` statement                                                                                                                             |
| Incubator.in description                        | Incubator `apps/web/app/layout.tsx` description                                                                                                                      |
| Footer ecosystem blurb                          | 10xGrowth `@platform/ui` Footer                                                                                                                                      |
| Canonical URLs                                  | sevapremi: `www.` (repo canonical); 10xgrowth, itvidya, sasarjan: bare domain (repo config); talentexcel, nanhasitara, incubator: **not found, assumed bare domain** |

## Open decisions

These must be settled before the first `latest` release:

1. **Canonical URL per site**, www or bare. Confirmed in repos for SevaPremi, 10xGrowth, IT Vidya and
   SaSarjan. Unconfirmed for TalentExcel, Nanha Sitara and Incubator.in.
2. **Display names and descriptions.** For example, is SaSarjan listed as "SaSarjan" or as its provisional
   name "CoCreate India's Future"?
3. **Shared contact email.** `info@sasarjan.com` appears in the SaSarjan config but is not yet
   approved for ecosystem-wide use (`footerContent.contactEmail` is `null`).
4. **Copyright holder.** The legal entity name. Until then, each site's own name is used.
5. **Shared policy links.** Are privacy and terms shared across sites or per site? Currently per site.
6. **Content license.** The code is MIT. Is the brand copy also MIT, or reserved (e.g. "© SaSarjan, all
   rights reserved" for `src/content/`)? Decide, and update `LICENSE` and the README if it is
   reserved.
7. **Translations.** Who supplies and approves Hindi or other copy (SevaPremi already serves Hindi).
8. **Ecosystem copy.** Sign-off on the Vision, CoCreation and initiatives text in
   `src/content/introduction.ts`.

## Adding a site

1. Add the id to `SiteId` (`src/config/types.ts`) and `siteIds` (`src/config/schema.ts`).
2. Add the entry to `src/content/sites.ts` as `draft`.
3. Update the tests that assert the domain list.
4. Add a **minor** changeset, then follow the approval workflow above.

Removing a site is a **major** change for the sites that list it.
