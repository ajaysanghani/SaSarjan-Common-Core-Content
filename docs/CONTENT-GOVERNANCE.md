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
| Messaging hierarchy, common introduction       | `src/content/messaging.ts`    | SaSarjan                     |
| Ecosystem directory: names, URLs, descriptions | `src/content/sites.ts`        | each site's owner + SaSarjan |
| `/ecosystem` copy                              | `src/content/introduction.ts` | SaSarjan                     |
| Footer blurb, contact, copyright, policies     | `src/content/footer.ts`       | SaSarjan + legal             |
| Interface labels                               | `src/content/footer.ts`       | package maintainers          |

`.github/CODEOWNERS` requests review from the repository owner on every PR. Add the content owners
there once they are named.

## Sources of the current drafts

Nothing was invented. Since v0.2 most copy comes from the content brief
([prompts/content-brief.md](../prompts/content-brief.md)); a few short lines the brief asked for were
written for the package and are marked `// Written for the package.` in the source.

| Item                                                                                      | Source                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Messaging hierarchy, common introduction, closing line (`messaging.ts`)                   | Content brief, "Messaging hierarchy" and decision D3                                                                                                                                          |
| All seven sites: headline, positioning, focus areas, native name                          | Content brief, "The seven initiatives"                                                                                                                                                        |
| All seven sites: description                                                              | First sentence of the brief's positioning (replaces the 0.1 descriptions condensed from each site's metadata)                                                                                 |
| All seven sites: category                                                                 | Content brief, proposed categories (decision D5)                                                                                                                                              |
| `/ecosystem` sections 1–8 (`introduction.ts`)                                             | Content brief, "`/ecosystem` page copy"                                                                                                                                                       |
| `/ecosystem` systems connection line                                                      | Content brief, **proposed, needs sign-off**                                                                                                                                                   |
| `/ecosystem` participant one-liners, CoCreation and initiatives paragraphs, list headings | **Written for the package** (the brief asks for them); see the source comments                                                                                                                |
| `introductionContent.eyebrow`                                                             | Unchanged from 0.1                                                                                                                                                                            |
| Footer brand line, CoCreator block, closing                                               | Content brief, "Footer copy"                                                                                                                                                                  |
| Footer ecosystem blurb (0.1 layout)                                                       | 10xGrowth `@platform/ui` Footer                                                                                                                                                               |
| New labels                                                                                | Content brief ("Explore website", "Become a CoCreator", "Explore Our Initiatives", "Explore the SaSarjan Ecosystem"); "Focus areas" and "Overarching framework" written for the package       |
| Canonical URLs                                                                            | Unchanged (decision D2). sevapremi: `www.` (repo canonical); 10xgrowth, itvidya, sasarjan: bare domain (repo config); talentexcel, nanhasitara, incubator: **not found, assumed bare domain** |

## Open decisions

Decisions D1–D7 in the [content brief](../prompts/content-brief.md) settled the display names (D1:
keep the current names), canonical URLs (D2: keep the current ones), the closing line (D3), the
approver (D4: the repository owner), the categories (D5: proposed, draft), the CoCreator destination
(D6: none yet, so the CTA is hidden) and shipping draft copy on `next` (D7).

These must still be settled before the first `latest` release:

1. **Canonical URL per site.** D2 keeps the current URLs, but TalentExcel, Nanha Sitara and
   Incubator.in were never confirmed in their repos (bare domain assumed).
2. **Copy sign-off.** The repository owner (D4) approves everything in `messaging.ts`, `sites.ts`,
   `introduction.ts` and `footer.ts`, in particular:
   - the proposed initiative categories (D5);
   - the systems connection line ("The two meet where district-level systems work and block-level
     community action overlap."), marked as needing sign-off in the brief;
   - the lines written for the package, marked `// Written for the package.` in the source.
3. **Shared contact email.** `info@sasarjan.com` appears in the SaSarjan config but is not yet
   approved for ecosystem-wide use (`footerContent.contactEmail` is `null`).
4. **Copyright holder.** The legal entity name. Until then, each site's own name is used.
5. **Shared policy links.** Are privacy and terms shared across sites or per site? Currently per site.
6. **Content license.** The code is MIT. Is the brand copy also MIT, or reserved (e.g. "© SaSarjan, all
   rights reserved" for `src/content/`)? Decide, and update `LICENSE` and the README if it is
   reserved.
7. **Translations.** Who supplies and approves Hindi or other copy (SevaPremi already serves Hindi).
   Every new field and label can be overridden per site, so this doesn't block the package.
8. **CoCreator destination (D6).** None exists yet. Each site turns the CTA on by setting
   `cocreator` in its `site.config.ts` once a real destination is agreed. Never invent one.

## Adding a site

1. Add the id to `SiteId` (`src/config/types.ts`) and `siteIds` (`src/config/schema.ts`).
2. Add the entry to `src/content/sites.ts` as `draft`.
3. Update the tests that assert the domain list.
4. Add a **minor** changeset, then follow the approval workflow above.

Removing a site is a **major** change for the sites that list it.
