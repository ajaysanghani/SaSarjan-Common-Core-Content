---
"@sasarjan/web-core": minor
---

New `SharedFooter` layout built on the v0.2 messaging. **Nothing is removed or renamed**: existing
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
