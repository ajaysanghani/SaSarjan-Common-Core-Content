import type { ComponentType, ReactNode } from "react";

/**
 * Every piece of shared content carries a status. `draft` content renders normally but blocks a
 * release (`pnpm check:drafts`) until someone approves it and flips it to `approved`.
 */
export type ContentStatus = "approved" | "draft";

export type SiteId =
  "sasarjan" | "talentexcel" | "10xgrowth" | "sevapremi" | "nanhasitara" | "itvidya" | "incubator";

export interface EcosystemSite {
  id: SiteId;
  name: string;
  /** Bare domain shown to readers, e.g. `talentexcel.com`. */
  domain: string;
  /** Canonical absolute https URL of the site's home page. */
  url: string;
  /** One-line description shown in the ecosystem directory. */
  description: string;
  status: ContentStatus;
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

export interface Cta extends LinkItem {
  variant?: "primary" | "secondary";
}

export interface ContentSection {
  /** Used as the section's DOM id; keep it unique on the page. */
  id: string;
  title: string;
  paragraphs: string[];
}

export interface IntroductionContent {
  status: ContentStatus;
  eyebrow: string;
  title: string;
  lead: string[];
  vision: ContentSection;
  cocreation: ContentSection;
  initiatives: ContentSection;
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
    /** Replace names or descriptions of sites in the directory, e.g. translated text. */
    overrides?: Partial<Record<SiteId, { name?: string; description?: string }>>;
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
