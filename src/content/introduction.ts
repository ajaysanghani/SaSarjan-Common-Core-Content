import type { IntroductionContent, IntroductionMetadata, ParticipationInterest } from "../config/types";
import { ecosystemMessaging } from "./messaging";

const { hierarchy, closingLine } = ecosystemMessaging;

/**
 * Title and description for the `/ecosystem` page's metadata, as plain data with no `next` import:
 * `export const metadata = { ...introductionMetadata, alternates: { canonical: "/ecosystem" } }`.
 *
 * From the v0.2 content brief; approved by the content owner on 2026-11-24. Covered by
 * `introductionContent.status`, which carries it as `seo`.
 */
export const introductionMetadata: IntroductionMetadata = {
  title: "The SaSarjan Ecosystem: CoCreating the Future, Together",
  description:
    "Seven interconnected initiatives uniting youth, professionals, experts, entrepreneurs, institutions, communities, funders and AI to advance Collective Prosperity.",
};

/**
 * The participation interests of the "Join the Ecosystem" form, in the owner's order. A pathway's
 * `interest` names one of these ids. Labels owner-supplied on 2026-11-25; covered by
 * `introductionContent.status`, like `introductionMetadata`.
 */
export const participationInterests: readonly ParticipationInterest[] = [
  { id: "learner", label: "Learner" },
  { id: "volunteer", label: "Volunteer" },
  { id: "mentor", label: "Mentor or Trainer" },
  { id: "entrepreneur", label: "Entrepreneur" },
  { id: "professional", label: "Professional or Freelancer" },
  { id: "institution", label: "Institutional Partner" },
  { id: "corporate", label: "Corporate Partner" },
  { id: "donor", label: "Donor or Supporter" },
  { id: "cocreator", label: "CoCreator" },
];

/**
 * Copy for the shared /ecosystem page.
 *
 * DRAFT: requires approval. v0.3 reworks the page from the owner's suggestions of 2026-11-25.
 * Lines marked "Owner-supplied" are verbatim from those suggestions; lines marked "Written for the
 * package" are new and need the owner's sign-off. Everything else was approved on 2026-11-24. The
 * hierarchy is referenced from `messaging.ts`, not repeated.
 *
 * `title` and `lead` stay meaningful for the 0.1 layout and for sites that build page metadata from
 * them (`title` and `lead[0]`).
 */
export const introductionContent: IntroductionContent = {
  status: "draft",
  eyebrow: "The SaSarjan ecosystem",
  title: hierarchy.approach,
  // Owner-supplied.
  lead: [
    "SaSarjan is a collaborative ecosystem bringing together people, organisations and communities to develop human potential, strengthen organisations, solve community challenges and regenerate nature.",
  ],

  // 1. Hero; its body is `lead`. Owner-supplied.
  hero: {
    eyebrow: "SaSarjan ({nativeName}) means CoCreation",
    headline: "CoCreating a World of Collective Prosperity",
    supportingLine: hierarchy.participation,
  },

  // 2. Vision and the four development dimensions. Titles approved 2026-11-24.
  vision: {
    id: "swc-vision",
    title: "Our Vision: A World Where Everyone Can Flourish.",
    // Written for the package.
    navLabel: "Four dimensions",
    paragraphs: [
      "Prosperity includes human development, harmonious relationships, responsible organisations, thriving communities and coexistence with nature.",
    ],
    itemsLabel: "Collective Prosperity in four dimensions",
    // Each text and short title written for the package from the owner's suggestions.
    items: [
      {
        title: "Human Potential Development",
        shortTitle: "Human potential",
        dimension: "human",
        text: "Learning, capabilities, livelihoods, entrepreneurship and lifelong development.",
      },
      {
        title: "Organisation Potential Development",
        shortTitle: "Organisation potential",
        dimension: "organisation",
        text: "Capable, responsible, innovative and growing organisations.",
      },
      {
        title: "Community Potential Development",
        shortTitle: "Community potential",
        dimension: "community",
        text: "Collective problem-solving, local leadership, volunteering and community development.",
      },
      {
        title: "Nature Regeneration",
        shortTitle: "Nature regeneration",
        dimension: "nature",
        text: "Ecological restoration, responsible living and coexistence with nature.",
      },
    ],
  },

  // 3. Initiatives; the cards come from the ecosystem directory.
  initiatives: {
    id: "swc-initiatives",
    title: "One Ecosystem. Seven Pathways to Collective Prosperity.",
    // Written for the package.
    navLabel: "Initiatives",
    paragraphs: [
      "SaSarjan provides the overarching CoCreation framework. Each of the other six initiatives plays a specialised role, and each strengthens the work of the others.",
    ],
  },

  // Who each initiative serves: one line per card. Written for the package.
  initiativeAudiences: {
    sasarjan: "For citizens, experts, institutions and policymakers redesigning systems together.",
    talentexcel: "For youth and professionals building skills and finding opportunities.",
    "10xgrowth": "For organisations that want to grow and scale.",
    sevapremi: "For change leaders and volunteers, especially youth, improving their communities.",
    itvidya: "For individuals and families who want to keep learning.",
    incubator: "For founders, startups and the people who support them.",
    nanhasitara: "For parents, teachers and communities helping children grow.",
  },

  // 4. CoCreation approach.
  cocreation: {
    id: "swc-cocreation",
    title: "Our CoCreation Approach: Different Strengths. Shared Possibilities.",
    // Written for the package.
    navLabel: "CoCreation",
    paragraphs: [
      "Complex challenges rarely yield to one kind of strength. When complementary capabilities come together, each fills the gaps the others leave, and together they create solutions none could create alone.",
    ],
    itemsLabel: "What each participant brings",
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

  // 5. Systems diagram.
  systems: {
    id: "swc-systems",
    title: "Connecting Systems Transformation with Community Action.",
    // Written for the package.
    navLabel: "Systems change",
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
    connection: "The two meet where district-level systems work and block-level community action overlap.",
    supporting: [
      { siteId: "talentexcel", text: "Develops people and leadership capabilities" },
      { siteId: "10xgrowth", text: "Strengthens organisations" },
      { siteId: "incubator", text: "Supports startups and entrepreneurship" },
      { siteId: "itvidya", text: "Enables lifelong learning" },
      { siteId: "nanhasitara", text: "Supports the development of children" },
    ],
    supportingTitle: "Five initiatives that strengthen both",
  },

  // 6. Illustrative journey. Title and the substance of the six steps owner-supplied; the steps'
  // wording, the label, the paragraph and the nav label written for the package.
  journey: {
    id: "swc-journey",
    title: "One Ecosystem. Many Pathways. Shared Prosperity.",
    navLabel: "A journey",
    label: "Illustrative example",
    paragraphs: [
      "Each initiative is independent and has its own website. This example shows how one person's path could draw on several of them over time.",
    ],
    steps: [
      "A young person discovers learning through {itvidya} and {talentexcel}.",
      "They develop their capabilities and explore careers.",
      "They help solve a community challenge through {sevapremi}.",
      "They develop an entrepreneurial idea and explore {incubator}.",
      "They collaborate with organisations supported by {10xgrowth}.",
      "Together with many others, they contribute to Collective Prosperity.",
    ],
  },

  // 7. Participation pathways; each action links to `SiteConfig.cocreator`, hidden when unset.
  cocreator: {
    id: "swc-cocreator",
    title: "The Future Is Something We Create Together.",
    // Written for the package.
    navLabel: "Take part",
    paragraphs: [],
    // Audiences owner-supplied; each line and action written for the package.
    participationPathways: [
      {
        audience: "Students and young professionals",
        text: "Build skills, find internships and fellowships, and discover meaningful opportunities.",
        siteIds: ["talentexcel", "itvidya"],
        action: "Join as a learner",
        interest: "learner",
      },
      {
        audience: "Parents and families",
        text: "Support your children's holistic development and keep learning together as a family.",
        siteIds: ["nanhasitara", "itvidya"],
        action: "Join as a family",
        interest: "learner",
      },
      {
        audience: "Entrepreneurs and business owners",
        text: "Turn ideas into enterprises, and grow and scale the organisations you lead.",
        siteIds: ["incubator", "10xgrowth"],
        action: "Join as an entrepreneur",
        interest: "entrepreneur",
      },
      {
        audience: "Mentors, trainers and experts",
        text: "Share your knowledge and experience with learners, change leaders and founders.",
        siteIds: ["talentexcel", "incubator"],
        action: "Join as a mentor",
        interest: "mentor",
      },
      {
        audience: "Corporates and institutions",
        text: "Partner on capability building, organisational growth and systems redesign.",
        siteIds: ["10xgrowth", "sasarjan"],
        action: "Partner with us",
        interest: "institution",
      },
      {
        audience: "Volunteers and community leaders",
        text: "Identify local challenges, co-create solutions and mobilise volunteers where you live.",
        siteIds: ["sevapremi"],
        action: "Join as a volunteer",
        interest: "volunteer",
      },
      {
        audience: "Donors and social impact partners",
        text: "Help promising ideas and community solutions grow with resources and partnership.",
        siteIds: ["sasarjan", "sevapremi"],
        action: "Join as a supporter",
        interest: "donor",
      },
      {
        audience: "Researchers and policymakers",
        text: "Bring research and evidence to systems redesign at national, state and district levels.",
        siteIds: ["sasarjan"],
        action: "Join as a CoCreator",
        interest: "cocreator",
      },
    ],
  },

  // 8. Closing.
  closing: {
    id: "swc-closing",
    lines: [hierarchy.approach, hierarchy.mission, closingLine],
  },

  seo: introductionMetadata,
};
