import type { IntroductionContent } from "../config/types";

/**
 * Copy for the shared /ecosystem page.
 *
 * DRAFT: requires approval. Wording is adapted from the SaSarjan site (tagline, hero and FAQ)
 * and the 10xGrowth footer; nothing here has been signed off as ecosystem-wide messaging.
 */
export const introductionContent: IntroductionContent = {
  status: "draft",
  eyebrow: "The SaSarjan ecosystem",
  title: "Co-creating collective prosperity",
  lead: [
    "SaSarjan brings together India's knowledge, experience and creativity to co-create transparent, inclusive and effective systems for collective prosperity.",
    "This website is one of several initiatives that share that purpose. Each serves a different community; together they form the SaSarjan ecosystem.",
  ],
  vision: {
    id: "swc-vision",
    title: "Vision: Collective Prosperity",
    paragraphs: [
      "Prosperity that is shared: systems that serve people, strengthen communities and regenerate nature, rather than benefiting a few.",
      "India's challenges are interconnected. Their solutions require people who understand different parts of society to learn from one another and work together.",
    ],
  },
  cocreation: {
    id: "swc-cocreation",
    title: "CoCreation",
    paragraphs: [
      "CoCreation means designing solutions with the people they affect, not for them. People across expertise, generations, professions and regions bring what they know to understand challenges, design better systems and develop practical solutions.",
      "Every initiative in the ecosystem is built on this way of working, and invites you to take part.",
    ],
  },
  initiatives: {
    id: "swc-initiatives",
    title: "Ecosystem initiatives",
    paragraphs: ["Each initiative focuses on a different part of collective prosperity."],
  },
};
