import type { FooterContent, Labels } from "../config/types";

/**
 * Shared footer content.
 *
 * DRAFT: requires approval.
 * - ecosystemBlurb is adapted from the 10xGrowth footer.
 * - contactEmail is null: `info@sasarjan.com` appears in the SaSarjan site config, but it has not
 *   been approved as the contact for the whole ecosystem.
 * - copyrightHolder is null, so each site's own name is used until a legal entity is confirmed.
 * - policyLinks is empty: no shared privacy or terms pages exist yet. Sites pass their own.
 */
export const footerContent: FooterContent = {
  status: "draft",
  ecosystemBlurb:
    "Part of the SaSarjan ecosystem: initiatives building collective prosperity through co-creation, community and service.",
  contactEmail: null,
  copyrightHolder: null,
  policyLinks: [],
};

export const defaultLabels: Labels = {
  ecosystemNav: "SaSarjan ecosystem",
  ecosystemHeading: "The SaSarjan ecosystem",
  currentSite: "You are here",
  opensInNewTab: "(opens in a new tab)",
  aboutEcosystem: "About the ecosystem",
  contactHeading: "Contact",
  policiesNav: "Policies",
  copyright: "© {years} {holder}",
};
