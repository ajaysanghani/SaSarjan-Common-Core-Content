import type { ComponentType, ReactNode } from "react";

/**
 * Every piece of shared content carries a status. `draft` content renders normally but blocks a
 * release (`pnpm check:drafts`) until someone approves it and flips it to `approved`.
 */
export type ContentStatus = "approved" | "draft";

export type SiteId =
  "sasarjan" | "talentexcel" | "10xgrowth" | "sevapremi" | "nanhasitara" | "itvidya" | "incubator";

/** SaSarjan is the overarching CoCreation framework; the other six are initiatives within it. */
export type EcosystemRole = "framework" | "initiative";

/** Key of the package's inline icon for an initiative. */
export type EcosystemIconKey =
  "framework" | "talent" | "growth" | "community" | "learning" | "startup" | "children";

export interface EcosystemSite {
  id: SiteId;
  name: string;
  /** Name in its own script, e.g. `स सर्जन`. Render it with `lang={nativeNameLang}`. */
  nativeName?: string;
  /** BCP 47 language tag of `nativeName`, e.g. `hi`. */
  nativeNameLang?: string;
  /** Bare domain shown to readers, e.g. `talentexcel.com`. */
  domain: string;
  /** Canonical absolute https URL of the site's home page. */
  url: string;
  /** One-line description shown in the ecosystem directory: the first sentence of `positioning`. */
  description: string;
  /** Short line for the footer directory and the initiative card, e.g. "Learn and Earn." */
  headline?: string;
  /** Card body: what the initiative does and for whom. */
  positioning?: string;
  /** The card's list of focus areas. */
  focusAreas?: string[];
  /** Small label on the card, e.g. "Startup ecosystem". */
  category?: string;
  icon?: EcosystemIconKey;
  /** Defaults to `initiative`. At most one site, SaSarjan, is the `framework`. */
  role?: EcosystemRole;
  status: ContentStatus;
}

/** Text of an ecosystem site that a website may replace, e.g. with a translation. */
export interface EcosystemSiteOverride {
  name?: string;
  description?: string;
  headline?: string;
  positioning?: string;
  focusAreas?: string[];
  category?: string;
}

/**
 * The ecosystem's messaging hierarchy and common introduction. Written once, in
 * `content/messaging.ts`, and used by both the footer and the `/ecosystem` page.
 */
export interface EcosystemMessaging {
  status: ContentStatus;
  hierarchy: {
    /** "Collective Prosperity." */
    vision: string;
    /** "Solve the Unsolved. Advance Collective Prosperity." */
    mission: string;
    /** "CoCreating the Future, Together." */
    approach: string;
    /** "Learn. Earn. Lead. Inspire. CoCreate." */
    participation: string;
  };
  /**
   * The common introduction. Rendered in full as `hierarchy.approach`, `hierarchy.mission`,
   * `introduction.body`, `hierarchy.participation`, `introduction.summary`.
   */
  introduction: {
    /** "We unite youth, professionals, …" */
    body: string;
    /** "Seven interconnected initiatives. One shared vision. Countless possibilities." */
    summary: string;
  };
  /** "SaSarjan – CoCreating Collective Prosperity." Closes both the footer and the page. */
  closingLine: string;
}

export interface LinkItem {
  label: string;
  /** Site-relative path (`/privacy`), `#anchor`, absolute `https:` URL, `mailto:` or `tel:`. */
  href: string;
}

export interface LinkGroup {
  heading: string;
  links: LinkItem[];
}

/** Like `LinkItem`, with an optional label. */
export interface CoCreatorLink {
  /** Site-relative path, `#anchor`, absolute `https:` URL, `mailto:` or `tel:`. */
  href: string;
  /** Defaults to `labels.becomeCoCreator`. */
  label?: string;
}

export interface Cta extends LinkItem {
  variant?: "primary" | "secondary";
}

export interface ContentItem {
  title: string;
  text?: string;
}

export interface ContentSection {
  /** Used as the section's DOM id; keep it unique on the page. */
  id: string;
  title: string;
  paragraphs: string[];
  /** A short list shown with the section, e.g. the four dimensions of the vision. */
  items?: ContentItem[];
  /** Accessible name (or visible heading) of `items`. */
  itemsLabel?: string;
}

/** One tier of the systems diagram on `/ecosystem`. */
export interface SystemsTier {
  /** The initiative leading this tier. */
  siteId: SiteId;
  /** e.g. "Top-down systems redesign" */
  title: string;
  /** Ordered levels, e.g. National, State, District. */
  levels: string[];
  /** What the tier works on. */
  focus: string[];
}

export interface SystemsSection {
  id: string;
  title: string;
  paragraphs: string[];
  topDown: SystemsTier;
  bottomUp: SystemsTier;
  /** Where the two tiers meet. */
  connection: string;
  /** The other initiatives and the role each plays around the two tiers. */
  supporting: Array<{ siteId: SiteId; text: string }>;
}

export interface CoCreatorSection {
  id: string;
  title: string;
  paragraphs: string[];
  audiencesHeading: string;
  /** Who can take part. */
  audiences: string[];
  pathwaysHeading: string;
  /** Ways to take part. */
  pathways: string[];
}

/**
 * Copy for the `/ecosystem` page. The required fields are the 0.1 shape and are enough to render
 * the page; the optional ones add the sections of the 0.2 page. In page order:
 *
 * 1. `hero` (with `lead` as its body) · 2. `vision` · 3. `cocreation` · 4. `initiatives` (cards
 * from the ecosystem directory) · 5. `systems` · 6. `participation` · 7. `cocreator` · 8. `closing`
 */
export interface IntroductionContent {
  status: ContentStatus;
  eyebrow: string;
  /** The page's `<h1>` in the 0.1 layout. Also suitable as a metadata title. */
  title: string;
  /** Introductory paragraphs. `lead[0]` is suitable as a metadata description. */
  lead: string[];
  vision: ContentSection;
  cocreation: ContentSection;
  initiatives: ContentSection;
  hero?: {
    eyebrow: string;
    subline: string;
    /** The hero's prominent line. */
    headline: string;
  };
  systems?: SystemsSection;
  participation?: ContentSection;
  cocreator?: CoCreatorSection;
  /** Closing lines at the end of the page. */
  closing?: { id: string; lines: string[] };
}

export interface FooterContent {
  status: ContentStatus;
  /** Short statement about the ecosystem shown in footers. */
  ecosystemBlurb: string;
  /** Shared contact email. `null` until an address is approved for ecosystem-wide use. */
  contactEmail: string | null;
  /** Legal name for the copyright line. `null` falls back to each site's own name. */
  copyrightHolder: string | null;
  /** Policy links shared by every site. Empty until approved; sites can supply their own. */
  policyLinks: LinkItem[];
  /** Brand line, e.g. "SaSarjan | स सर्जन". Render `nativeName` with `lang={nativeNameLang}`. */
  brand?: { name: string; nativeName?: string; nativeNameLang?: string };
  /** "Become a CoCreator" block. Its link is `SiteConfig.cocreator`; hidden when that is unset. */
  cocreator?: { heading: string; body: string };
  /** Closing lines above the copyright. */
  closing?: string[];
}

/** Every user-visible string the components render that is not content. Override for translation. */
export interface Labels {
  ecosystemNav: string;
  ecosystemHeading: string;
  currentSite: string;
  opensInNewTab: string;
  aboutEcosystem: string;
  contactHeading: string;
  policiesNav: string;
  /** `{years}` and `{holder}` are replaced. */
  copyright: string;
  /** Heading of the footer's initiative directory. */
  directoryHeading?: string;
  /** Link on each initiative card. */
  exploreWebsite?: string;
  /** Hero link to the initiatives section. */
  exploreInitiatives?: string;
  /** Default text of the CoCreator link. */
  becomeCoCreator?: string;
  /** Accessible name of an initiative's focus-area list. */
  focusAreas?: string;
  /** Badge marking SaSarjan as the overarching framework. */
  frameworkBadge?: string;
}

export type FooterVariant = "full" | "band";

export interface FooterSections {
  ecosystemIntro?: boolean;
  ecosystemLinks?: boolean;
  siteLinks?: boolean;
  contact?: boolean;
  policies?: boolean;
}

/**
 * Per-site configuration, written once in each website (usually `site.config.ts`) and passed to
 * the components. Validate it with `defineSiteConfig` from `@sasarjan/web-core/config`.
 */
export interface SiteConfig {
  siteId: SiteId;
  /** Overrides the site name from the shared directory, e.g. for a provisional brand name. */
  siteName?: string;
  /** Where the shared introduction page lives on this site. Defaults to `/ecosystem`. */
  ecosystemPath?: string;
  /** Where "Become a CoCreator" links to. Unset hides the CoCreator call to action everywhere. */
  cocreator?: CoCreatorLink;
  footer?: {
    sections?: FooterSections;
    /** The site's own footer columns, shown by the `full` variant. */
    siteLinks?: LinkGroup[];
    /** Replaces the shared policy links. */
    policyLinks?: LinkItem[];
    /** Replaces the shared contact email; `null` hides it. */
    contactEmail?: string | null;
    copyrightHolder?: string;
    /** First year of the copyright range, e.g. 2024 renders `2024–2026`. */
    launchYear?: number;
  };
  ecosystem?: {
    /** Include this site in its own ecosystem list (marked as current). Defaults to true. */
    includeCurrentSite?: boolean;
    /** Open sister sites in a new tab. Defaults to false. */
    openInNewTab?: boolean;
    /** Replace the text of sites in the directory, e.g. with a translation. */
    overrides?: Partial<Record<SiteId, EcosystemSiteOverride>>;
  };
  introduction?: {
    ctas?: Cta[];
  };
  labels?: Partial<Labels>;
}

export interface LinkComponentProps {
  href: string;
  className?: string;
  children?: ReactNode;
  "aria-current"?: "page" | "true";
}

/**
 * A component such as `next/link` used for site-relative links. Plain `<a>` is used otherwise.
 * Typed as a call signature rather than `ComponentType` because React 18's types add `propTypes`,
 * which makes `next/link` unassignable under `@types/react@18` (as used by 10xGrowth).
 */
export type LinkComponent = ((props: LinkComponentProps) => ReactNode) | ComponentType<LinkComponentProps>;
