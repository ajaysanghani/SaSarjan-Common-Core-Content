import type { FooterContent, Labels } from "../config/types";
import { ecosystemMessaging } from "./messaging";
import { ecosystemSites } from "./sites";

const framework = ecosystemSites.find((site) => site.role === "framework");

/**
 * Shared footer content.
 *
 * Approved by the content owner on 2026-11-24.
 * - ecosystemBlurb is adapted from the 10xGrowth footer. It is kept for the 0.1 footer layout.
 * - contactEmail is null: `info@sasarjan.com` appears in the SaSarjan site config, but it has not
 *   been approved as the contact for the whole ecosystem.
 * - copyrightHolder is null, so each site's own name is used until a legal entity is confirmed.
 * - policyLinks is empty: no shared privacy or terms pages exist yet. Sites pass their own.
 * - brand, cocreator and closing come from the v0.2 content brief. brand and closing reference the
 *   ecosystem directory and `messaging.ts` instead of repeating their text.
 */
export const footerContent: FooterContent = {
  status: "approved",
  ecosystemBlurb:
    "Part of the SaSarjan ecosystem: initiatives building collective prosperity through co-creation, community and service.",
  contactEmail: null,
  copyrightHolder: null,
  policyLinks: [],
  // "SaSarjan | स सर्जन"
  brand: framework
    ? { name: framework.name, nativeName: framework.nativeName, nativeNameLang: framework.nativeNameLang }
    : undefined,
  cocreator: {
    heading: "Become a CoCreator",
    body: "Bring your ideas, knowledge, skills, experience, resources and enthusiasm. Together, we can create solutions and opportunities that contribute to Collective Prosperity.",
  },
  // Closing line from brief decision D3.
  closing: [ecosystemMessaging.closingLine, ecosystemMessaging.introduction.summary],
};

/**
 * Default interface strings. Every visible string the components render that is not content can be
 * overridden through `SiteConfig.labels`, e.g. for SevaPremi's Hindi.
 */
export const defaultLabels: Required<Labels> = {
  ecosystemNav: "SaSarjan ecosystem",
  ecosystemHeading: "The SaSarjan ecosystem",
  currentSite: "You are here",
  opensInNewTab: "(opens in a new tab)",
  aboutEcosystem: "About the ecosystem",
  contactHeading: "Contact",
  policiesNav: "Policies",
  copyright: "© {years} {holder}",
  directoryHeading: "Explore the SaSarjan Ecosystem",
  exploreWebsite: "Explore website",
  exploreInitiatives: "Explore Our Initiatives",
  becomeCoCreator: "Become a CoCreator",
  focusAreas: "Focus areas",
  frameworkBadge: "Overarching framework",
  moreFocusAreas: "{count} more",
};
