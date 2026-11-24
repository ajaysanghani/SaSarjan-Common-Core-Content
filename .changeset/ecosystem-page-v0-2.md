---
"@sasarjan/web-core": minor
---

`IntroductionPage` renders the v0.2 `/ecosystem` page. **Nothing is removed or renamed**: the
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
