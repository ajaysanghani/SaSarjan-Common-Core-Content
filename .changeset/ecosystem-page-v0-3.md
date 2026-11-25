---
"@sasarjan/web-core": minor
---

Rework the `/ecosystem` page from the owner's suggestions, so a first-time visitor understands
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
