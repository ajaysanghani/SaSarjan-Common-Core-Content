import type { EcosystemMessaging } from "../config/types";

/**
 * The ecosystem's messaging hierarchy and common introduction, written once. The footer
 * (`footer.ts`) and the `/ecosystem` page (`introduction.ts`) reference these strings rather than
 * repeating them.
 *
 * Approved by the content owner on 2026-11-24. Copy from the v0.2 content brief; nothing here was written by the
 * package maintainers.
 */
export const ecosystemMessaging: EcosystemMessaging = {
  status: "approved",
  hierarchy: {
    vision: "Collective Prosperity.",
    mission: "Solve the Unsolved. Advance Collective Prosperity.",
    approach: "CoCreating the Future, Together.",
    // Updated 2026-11-25 from the owner's /ecosystem suggestions ("Inspire" became "Contribute").
    participation: "Learn. Earn. Lead. Contribute. CoCreate.",
  },
  introduction: {
    body: "We unite youth, professionals, experts, entrepreneurs, institutions, communities, funders and AI to develop human potential, strengthen organisations, empower communities, redesign systems and regenerate nature.",
    summary: "Seven interconnected initiatives. One shared vision. Countless possibilities.",
  },
  closingLine: "SaSarjan – CoCreating Collective Prosperity.",
};
