# @sasarjan/web-core

## 0.3.0

### Minor Changes

- 767b104: Rework the `/ecosystem` page from the owner's suggestions, so a first-time visitor understands
  SaSarjan quickly, finds a relevant initiative and has a way to take part. The page keeps its eight
  parts and its single `<h1>`; sections were reworked rather than added. No prop, export, class or token
  is removed; a few content fields became optional (see below).
  
  **What changes on `/ecosystem`**
  
  - **Hero:** "CoCreating a World of Collective Prosperity", a one-sentence description, "SaSarjan
    (स सर्जन) means CoCreation", and the line "Learn. Earn. Lead. Contribute. CoCreate.". The hero link
    now reads "Explore Our Ecosystem" (same `exploreInitiatives` label key and `#swc-initiatives` target).
  - **Table of contents** under the hero ("On this page"), with working anchors. Sections, cards and
    the closing use `scroll-margin-top: var(--swc-scroll-margin)`: if your site has a sticky header,
    set `--swc-scroll-margin` to its height plus a little room.
  - **Four development dimensions** in the vision section, each with a small icon, one line and the
    initiatives that contribute to it. Nature Regeneration says it has no dedicated initiative yet.
  - **Lighter initiative cards** (now right after the dimensions): name, icon, headline, one line on who
    it serves, dimension tags, the first three focus areas (the rest collapse) and the explore link. The
    category label and the long positioning paragraph are no longer shown on the cards.
  - **"One Ecosystem. Many Pathways. Shared Prosperity."**: a six-step journey, visibly labelled as an
    illustrative example. It replaces the Learn/Earn/Lead/Inspire/CoCreate ring in the shared content.
  - **Participation pathways** replace the "who can take part" and "ways to contribute" lists: eight
    audiences, each with one line, links to the relevant initiatives and, when your site sets
    `cocreator`, an action such as "Join as a volunteer" that links to it with `?interest=<id>`.
  
  **Messaging.** The participation line is now "Learn. Earn. Lead. Contribute. CoCreate." ("Inspire"
  became "Contribute"), which also shows in the `full` footer.
  
  **Draft copy.** The new hero, dimension and pathway audience copy is the owner's own. The dimension
  lines, "who it serves" lines, journey wording, pathway lines and actions and the table-of-contents
  labels were written for the package, so `introductionContent` is `draft` and this version ships on
  the `next` dist-tag until it is approved.
  
  **API additions** (all optional): `EcosystemSite.dimensions`, `ContentItem.dimension` and
  `shortTitle`, `navLabel` on sections, `IntroductionContent.journey` and `initiativeAudiences`,
  `hero.supportingLine` (and `{nativeName}` in `hero.eyebrow`), `CoCreatorSection.participationPathways`,
  the `DimensionIcon` component, the `participationInterests` list for join forms, the
  `developmentDimensions` list in `./config`, the `nav` prop of `SharedPageLayout` (whose `eyebrow` now
  accepts React content) and the labels `onThisPage`, `dimensionTags`, `contributingInitiatives`,
  `noDedicatedInitiative` and `pathwayInitiatives`.
  
  **Possibly breaking for custom `content`** (0.x minor): `hero.subline` and the CoCreator section's
  `audiences`, `audiencesHeading`, `pathways` and `pathwaysHeading` are now optional, and the sections
  render in the order vision, initiatives, CoCreation, systems, journey (or participation), CoCreator.
  Content you pass yourself keeps rendering; only code that reads those fields needs a check.

## 0.2.1

### Patch Changes

- Approve the ecosystem copy. The content owner approved all shared content with no wording changes:
  the seven sites, the messaging hierarchy and common introduction, the `/ecosystem` page copy
  (including its SEO title and description) and the footer content. Nothing renders differently.
  Every content module is now `status: "approved"`, so `pnpm check:drafts` passes and this version
  can be published on the `latest` dist-tag.

## 0.2.0

**Upgrading from 0.1.x.** This release brings the v0.2 ecosystem messaging to the shared footer and
the `/ecosystem` page. **Nothing is removed or renamed**: every existing prop, export, config field,
class name and token keeps working, and every new field is optional. What you'll notice:

- The footer (`full` and `band`) and the `/ecosystem` page have new layouts and new wording. All of
  the new copy is still draft, so this version is published on the `next` tag.
- On `/ecosystem`, render `<SharedFooter condensed />` so the tagline isn't repeated, and use the new
  `introductionMetadata` for the page's title and description. See the README.
- **"Become a CoCreator"** is hidden until your `site.config.ts` sets `cocreator: { href }`
  (optionally with `label`). No destination has been decided yet, so leave it unset for now.
- Your `/ecosystem` CTAs and `children` move to just before the closing lines.

### Minor Changes

- 4ffb9fc: New ecosystem messaging (v0.2 content model). **Nothing is removed or renamed**, and every new field
  is optional, so existing site configs, label overrides and custom `content` keep working unchanged.
  The footer and `/ecosystem` page entries below describe the layouts that use this content.

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
- 6a1e651: New `SharedFooter` layout built on the v0.2 messaging. **Nothing is removed or renamed**: existing
  props, `footer.sections` keys, class names and tokens keep working. Your footer looks different
  after you upgrade.

  **`full`** now shows, in order: the brand line (SaSarjan | स सर्जन, with `lang="hi"` on the
  Devanagari), the common introduction, "Explore the SaSarjan Ecosystem" with all seven initiatives
  (icon, name, headline; your site marked "You are here"), the CoCreator block, your site name and link
  groups, contact, the closing lines, then copyright and policies. The site name moves from the top
  into the row with your link groups. The summary line ("Seven interconnected initiatives…") ends the
  introduction and is not repeated in the closing lines.

  **`band`** stays compact: brand line and tagline, a compact seven-initiative directory (icon, name,
  headline), the CoCreator button and one closing line. The long introduction is off unless you turn
  it on with `footer.sections.introduction: true`. Its region keeps its accessible name
  (`labels.ecosystemHeading`), but the visible "The SaSarjan ecosystem" heading is replaced by the
  brand line, and the directory's heading is now `labels.directoryHeading`.

  The 0.1 `footerContent.ecosystemBlurb` is no longer rendered; the common introduction replaces it.
  The export stays.

  **CoCreator.** Shown only when `site.config.ts` sets `cocreator: { href }` (no site does yet, so
  nothing changes until one does). `cocreator.label` replaces the button text.

  **New `condensed` prop.** `<SharedFooter condensed />` leaves out the tagline, the introduction and
  the "About the ecosystem" link, for pages that already show them, such as `/ecosystem`. Render the
  footer from route layouts (for example `app/(site)/layout.tsx` and `app/ecosystem/layout.tsx`) so
  that page can pass it; see the README.

  **New `footer.sections` keys**, all optional: `brand`, `tagline`, `introduction`, `cocreator` and
  `closing`. `tagline` and `introduction` default to the value of `ecosystemIntro`, so a site that
  turned the 0.1 ecosystem intro off doesn't suddenly get the long introduction (`introduction` is
  always off by default in `band`).

  **New exports:** `EcosystemIcon` (with `EcosystemIconProps`), one decorative inline SVG per
  initiative, and a `directory` layout for `EcosystemLinks` (icon, name, headline).

  **New optional tokens:** `--swc-hover-bg`, `--swc-icon-bg`, `--swc-icon-color`, `--swc-badge-bg`,
  `--swc-badge-text`, `--swc-footer-focus`, `--swc-footer-card-bg`, `--swc-footer-cta-bg`,
  `--swc-footer-cta-text` and `--swc-footer-cta-border`. Their defaults derive from the footer text
  colour, so dark footers that set only `--swc-footer-text`, `--swc-footer-muted` and `--swc-border`
  keep their contrast. One visible change: with no tokens set, the focus outline inside the footer
  now uses the footer text colour instead of `#8a1f5c`. `--swc-focus`, if you set it, still applies.
- 905761c: `IntroductionPage` renders the v0.2 `/ecosystem` page. **Nothing is removed or renamed**: the
  `site`, `ctas`, `content`, `children`, `linkComponent`, `as` and `className` props keep working, and
  your page looks different after you upgrade.

  The page now has eight sections: a hero (the page's only `<h1>` is "Learn. Earn. Lead. Inspire.
  CoCreate.", with the common introduction and an "Explore Our Initiatives" button), the vision's four
  dimensions, the eight CoCreation participants, seven initiative cards (icon, category, name,
  headline, positioning, focus areas and an "Explore website" link; SaSarjan shown as the framework,
  your site marked "You are here"), a top-down/bottom-up systems diagram built from headings and
  ordered lists, the five participation pathways, "Become a CoCreator", and the closing lines. It
  ships no JavaScript: long focus-area lists collapse into a native `<details>`.

  - **"Become a CoCreator"** appears in the hero and in section 7 only when `site.config.ts` sets
    `cocreator: { href }`. No site does yet, so it stays hidden.
  - **Your `introduction.ctas` and `children`** now render together after "Become a CoCreator",
    before the closing lines, instead of after the directory.
  - **Content in the 0.1 shape.** A `content` prop without `hero` (for example your own translation)
    renders the 0.1 layout, unchanged.
  - **Tagline.** With `<SharedFooter condensed />` on `/ecosystem`, the tagline pair appears twice on
    the page, in the hero and the closing lines.

  **New export `introductionMetadata`** (`{ title, description }`, type `IntroductionMetadata`): the
  page's SEO title and description as plain data with no `next` import, for
  `export const metadata = { ...introductionMetadata }`. It is also `introductionContent.seo`, and
  `introductionContent.title` and `.lead[0]` keep working for existing metadata.

  **Also additive:** `SharedPageLayout` takes `subline` and `headerCtas`, and a section can take a
  `className`; `IntroductionContent.seo` and `SystemsSection.supportingTitle` are optional new content
  fields; `labels.moreFocusAreas` (`"{count} more"`) names the collapsed focus areas; and two optional
  tokens, `--swc-tint` (the hero, framework card and CoCreator panel background) and
  `--swc-scroll-margin` (set it to your sticky header's height).

## 0.1.1

### Patch Changes

- Publish through GitHub Actions with provenance; no code changes.

## 0.1.0

### Minor Changes

- ab6e33d: First release: SharedFooter (full and band variants), EcosystemLinks, IntroductionPage,
  SharedPageLayout, validated site configuration (`@sasarjan/web-core/config`) and shared styles
  (`@sasarjan/web-core/styles.css`). All shared content is marked draft pending approval.
