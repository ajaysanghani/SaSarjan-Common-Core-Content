import type { IntroductionContent, IntroductionMetadata } from "../config/types";
import { ecosystemMessaging } from "./messaging";

const { hierarchy, introduction, closingLine } = ecosystemMessaging;

/**
 * Title and description for the `/ecosystem` page's metadata, as plain data with no `next` import:
 * `export const metadata = { ...introductionMetadata, alternates: { canonical: "/ecosystem" } }`.
 *
 * DRAFT: requires approval. Proposed in the v0.2 content brief; needs explicit sign-off. Covered by
 * `introductionContent.status`, which carries it as `seo`.
 */
export const introductionMetadata: IntroductionMetadata = {
  title: "The SaSarjan Ecosystem: CoCreating the Future, Together",
  description:
    "Seven interconnected initiatives uniting youth, professionals, experts, entrepreneurs, institutions, communities, funders and AI to advance Collective Prosperity.",
};

/**
 * Copy for the shared /ecosystem page.
 *
 * DRAFT: requires approval. Copy from the v0.2 content brief. The hierarchy and the common
 * introduction are referenced from `messaging.ts`, not repeated. A few short lines were written by
 * the package maintainers where the brief asks for them; each is marked "Written for the package".
 *
 * `title` and `lead` stay meaningful for the 0.1 layout and for sites that build page metadata from
 * them (`title` and `lead[0]`).
 */
export const introductionContent: IntroductionContent = {
  status: "draft",
  eyebrow: "The SaSarjan ecosystem",
  title: hierarchy.approach,
  lead: [introduction.body, introduction.summary],

  // DRAFT: requires approval. 1. Hero; its body is `lead`.
  hero: {
    eyebrow: hierarchy.approach,
    subline: hierarchy.mission,
    headline: hierarchy.participation,
  },

  // DRAFT: requires approval. 2. Vision.
  vision: {
    id: "swc-vision",
    title: "Our Vision: A World Where Everyone Can Flourish.",
    paragraphs: [
      "Prosperity includes human development, harmonious relationships, responsible organisations, thriving communities and coexistence with nature.",
    ],
    itemsLabel: "Collective Prosperity in four dimensions",
    items: [
      { title: "Human Potential Development" },
      { title: "Organisation Potential Development" },
      { title: "Community Potential Development" },
      { title: "Nature Regeneration" },
    ],
  },

  // DRAFT: requires approval. 3. CoCreation approach.
  cocreation: {
    id: "swc-cocreation",
    title: "Our CoCreation Approach: Different Strengths. Shared Possibilities.",
    paragraphs: [
      // Written for the package.
      "Complex challenges rarely yield to one kind of strength. When complementary capabilities come together, each fills the gaps the others leave, and together they create solutions none could create alone.",
    ],
    // Written for the package.
    itemsLabel: "What each participant brings",
    // Participant names from the brief; each one-line text was written for the package.
    items: [
      { title: "Youth", text: "Energy, fresh perspectives and the courage to try new things." },
      { title: "Professionals", text: "Practical skills and experience of getting things done." },
      { title: "Experts", text: "Deep knowledge, research and evidence." },
      { title: "Entrepreneurs", text: "The drive to turn ideas into enterprises." },
      { title: "Institutions", text: "Reach, continuity and structures that sustain change." },
      { title: "Communities", text: "Local knowledge, lived experience and collective action." },
      { title: "Funders and Resource Partners", text: "Resources that help promising ideas grow." },
      {
        title: "AI and Technology",
        text: "Enabling intelligence that complements human knowledge, creativity and participation.",
      },
    ],
  },

  // DRAFT: requires approval. 4. Initiatives; the cards come from the ecosystem directory.
  initiatives: {
    id: "swc-initiatives",
    title: "One Ecosystem. Seven Pathways to Collective Prosperity.",
    paragraphs: [
      // Written for the package.
      "SaSarjan provides the overarching CoCreation framework. Each of the other six initiatives plays a specialised role, and each strengthens the work of the others.",
    ],
  },

  // DRAFT: requires approval. 5. Systems diagram.
  systems: {
    id: "swc-systems",
    title: "Connecting Systems Transformation with Community Action.",
    paragraphs: [],
    topDown: {
      siteId: "sasarjan",
      title: "Top-down systems redesign",
      levels: ["National", "State", "District"],
      focus: ["Governance structures", "Institutional alignment", "Policy and implementation frameworks"],
    },
    bottomUp: {
      siteId: "sevapremi",
      title: "Bottom-up community development",
      levels: ["Village", "Ward", "Taluka", "Block"],
      focus: [
        "Citizen participation",
        "Youth leadership",
        "Local problem identification",
        "Solution design",
        "Volunteer mobilisation",
      ],
    },
    // DRAFT: requires approval. Proposed in the brief; needs explicit sign-off.
    connection: "The two meet where district-level systems work and block-level community action overlap.",
    supporting: [
      { siteId: "talentexcel", text: "Develops people and leadership capabilities" },
      { siteId: "10xgrowth", text: "Strengthens organisations" },
      { siteId: "incubator", text: "Supports startups and entrepreneurship" },
      { siteId: "itvidya", text: "Enables lifelong learning" },
      { siteId: "nanhasitara", text: "Supports the development of children" },
    ],
    // Written for the package.
    supportingTitle: "Five initiatives that strengthen both",
  },

  // DRAFT: requires approval. 6. Participation philosophy.
  participation: {
    id: "swc-participation",
    title: "Everyone Has Something Valuable to Contribute.",
    paragraphs: ["These are interconnected pathways, not sequential stages."],
    itemsLabel: hierarchy.participation,
    items: [
      { title: "Learn", text: "Develop knowledge, understanding and skills." },
      { title: "Earn", text: "Create economic value through meaningful contributions." },
      { title: "Lead", text: "Take responsibility and initiate positive change." },
      { title: "Inspire", text: "Share knowledge, experience and possibilities with others." },
      {
        title: "CoCreate",
        text: "Bring people, ideas, knowledge and resources together to create solutions.",
      },
    ],
  },

  // DRAFT: requires approval. 7. Become a CoCreator; the link comes from `SiteConfig.cocreator`.
  cocreator: {
    id: "swc-cocreator",
    title: "The Future Is Something We Create Together.",
    paragraphs: [],
    // Written for the package.
    audiencesHeading: "Who can take part",
    audiences: [
      "Students",
      "Professionals",
      "Entrepreneurs",
      "Experts",
      "Institutions",
      "Volunteers",
      "Mentors",
      "Funders",
      "Community leaders",
    ],
    // Written for the package.
    pathwaysHeading: "Ways to contribute",
    pathways: [
      "Learn and develop",
      "Share knowledge",
      "Mentor and guide",
      "Volunteer",
      "Develop solutions",
      "Build organisations",
      "Fund meaningful initiatives",
      "Research and innovate",
      "Partner with institutions",
      "CoCreate initiatives",
    ],
  },

  // DRAFT: requires approval. 8. Closing; closing line from brief decision D3.
  closing: {
    id: "swc-closing",
    lines: [hierarchy.approach, hierarchy.mission, closingLine],
  },

  // DRAFT: requires approval. SEO copy, proposed in the brief.
  seo: introductionMetadata,
};
