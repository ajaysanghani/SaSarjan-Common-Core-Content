import type { EcosystemMessaging } from "../config/types";

/**
 * The ecosystem's messaging hierarchy and common introduction, written once. The footer
 * (`footer.ts`) and the `/ecosystem` page (`introduction.ts`) reference these strings rather than
 * repeating them.
 *
 * DRAFT: requires approval. Copy from the v0.2 content brief; nothing here was written by the
 * package maintainers.
 */
export const ecosystemMessaging: EcosystemMessaging = {
  status: "draft",
  hierarchy: {
    vision: "Collective Prosperity.",
    mission: "Solve the Unsolved. Advance Collective Prosperity.",
    approach: "CoCreating the Future, Together.",
    participation: "Learn. Earn. Lead. Inspire. CoCreate.",
  },
  introduction: {
    body: "We unite youth, professionals, experts, entrepreneurs, institutions, communities, funders and AI to develop human potential, strengthen organisations, empower communities, redesign systems and regenerate nature.",
    summary: "Seven interconnected initiatives. One shared vision. Countless possibilities.",
  },
  closingLine: "SaSarjan – CoCreating Collective Prosperity.",
};
