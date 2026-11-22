---
"@sasarjan/web-core": minor
---

New ecosystem messaging (v0.2 content model). **Nothing is removed or renamed**, and every new field
is optional, so existing site configs, label overrides and custom `content` keep working unchanged.
The footer and `/ecosystem` layouts don't change in this release; they start using the new content
in the next ones.

**Reworded copy (draft).** Your footer directory and `/ecosystem` page show new wording after you
upgrade:

- Every site's `description` is now the first sentence of its new positioning statement.
- The directory lists the seven initiatives in the content brief's order: Nanha Sitara moves to the end.
- `introductionContent.title` is now "CoCreating the Future, Together." and `lead` is the common
  introduction. If you build page metadata from `introductionContent.title` and `.lead[0]`
  (TalentExcel does), the new wording flows into your title and description.
- The Vision, CoCreation and initiatives section titles and paragraphs are rewritten.

All of it is `draft` and blocks a `latest` release until approved.

**New content.**

- `ecosystemMessaging` (new export): the messaging hierarchy, the common introduction and the closing
  line, written once and shared by the footer and the page.
- `EcosystemSite`: optional `nativeName`, `nativeNameLang`, `headline`, `positioning`, `focusAreas`,
  `category`, `icon` and `role` (`"framework"` for SaSarjan, `"initiative"` for the others), filled in
  for all seven sites.
- `IntroductionContent`: optional `hero`, `systems`, `participation`, `cocreator` and `closing`
  sections, plus optional `items` and `itemsLabel` on every section.
- `FooterContent`: optional `brand`, `cocreator` and `closing`. `ecosystemBlurb` stays.

**New labels**, all overridable through `labels` (for example in Hindi): `directoryHeading`,
`exploreWebsite`, `exploreInitiatives`, `becomeCoCreator`, `focusAreas` and `frameworkBadge`.

**New config field:** `cocreator: { href, label? }` in `site.config.ts` sets where "Become a
CoCreator" links. It goes through the same link allowlist as other links. Leave it unset (no site has a
destination yet) and the CoCreator call to action stays hidden.

**Translations:** `ecosystem.overrides` now also accepts `headline`, `positioning`, `focusAreas` and
`category`.

New exports: `ecosystemMessaging` and the types `CoCreatorLink`, `CoCreatorSection`,
`ContentItem`, `EcosystemIconKey`, `EcosystemMessaging`, `EcosystemRole`, `EcosystemSiteOverride`,
`SystemsSection` and `SystemsTier` from `@sasarjan/web-core`. From `@sasarjan/web-core/config`:
`ecosystemMessagingSchema`, `labelsSchema` and `ecosystemIconKeys`. `defaultLabels` is now typed
`Required<Labels>`, so code that reads it sees every label as present.
