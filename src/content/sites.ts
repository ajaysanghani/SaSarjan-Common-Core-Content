import type { EcosystemSite } from "../config/types";

/**
 * The approved ecosystem websites, in display order.
 *
 * Domains, canonical URLs, display names and copy were approved by the content owner on 2026-11-24.
 * A later wording change puts the entry back to `draft`; see docs/CONTENT-GOVERNANCE.md.
 *
 * Headline, positioning, focus areas and category come from the v0.2 content brief. `description`
 * is the first sentence of `positioning`, so sites on the 0.1 layout show the new wording.
 * Categories are the ones proposed in brief decision D5, now approved.
 */
export const ecosystemSites: readonly EcosystemSite[] = [
  {
    id: "sasarjan",
    name: "SaSarjan",
    // Copy from the v0.2 content brief.
    nativeName: "स सर्जन",
    nativeNameLang: "hi",
    domain: "sasarjan.com",
    // URL from SaSarjan's siteConfig.siteUrl default.
    url: "https://sasarjan.com",
    description: "An overarching CoCreation framework and systems redesign initiative.",
    headline: "Reimagining Systems for Collective Prosperity.",
    positioning:
      "An overarching CoCreation framework and systems redesign initiative. Enabling top-down systems redesign at national, state and district levels by bringing together citizens, experts, institutions, policymakers, professionals and technology.",
    focusAreas: [
      "National systems redesign",
      "State-level systems redesign",
      "District-level systems redesign",
      "Governance transformation",
      "Institutional alignment",
      "Collective intelligence and AI-enabled systems",
    ],
    category: "CoCreation framework · Systems redesign",
    icon: "framework",
    role: "framework",
    status: "approved",
  },
  {
    id: "talentexcel",
    name: "TalentExcel",
    domain: "talentexcel.com",
    // Canonical host not found in the TalentExcel repo; the bare domain was approved with the copy.
    url: "https://talentexcel.com",
    // Copy from the v0.2 content brief.
    description:
      "A learning, skills and opportunities platform enabling youth and professionals to develop capabilities and discover meaningful opportunities.",
    headline: "Learn and Earn.",
    positioning:
      "A learning, skills and opportunities platform enabling youth and professionals to develop capabilities and discover meaningful opportunities.",
    focusAreas: [
      "Learning and skill development",
      "Internships",
      "Fellowships",
      "Freelancing",
      "Gap-year leadership development",
      "Mentorship and training",
      "Co-founder and entrepreneurial opportunities",
    ],
    category: "Learning and opportunities",
    icon: "talent",
    role: "initiative",
    status: "approved",
  },
  {
    id: "10xgrowth",
    name: "10xGrowth",
    domain: "10xgrowth.com",
    // URL from 10xGrowth's metadataBase.
    url: "https://10xgrowth.com",
    // Copy from the v0.2 content brief.
    description:
      "Helping organisations grow and scale through specialised studios providing strategic, research, innovation, revenue and technology capabilities.",
    headline: "Organisational Growth and Scale.",
    positioning:
      "Helping organisations grow and scale through specialised studios providing strategic, research, innovation, revenue and technology capabilities.",
    focusAreas: [
      "Vision and Implementation Studio",
      "Research and Innovation Studio",
      "Revenue Studio",
      "Zoho Studio",
      "AI Studio",
      "Visual Communication Studio",
      "Organisational growth and execution",
    ],
    category: "Organisational growth",
    icon: "growth",
    role: "initiative",
    status: "approved",
  },
  {
    id: "sevapremi",
    name: "SevaPremi",
    domain: "sevapremi.com",
    // SevaPremi's canonical URL uses the www host (brief decision D2).
    url: "https://www.sevapremi.com",
    // Copy from the v0.2 content brief.
    description:
      "Enabling change leaders and volunteers, especially youth, to identify local challenges, co-create solutions and contribute to community development.",
    headline: "Youth-Powered Community Change Leadership.",
    positioning:
      "Enabling change leaders and volunteers, especially youth, to identify local challenges, co-create solutions and contribute to community development. A bottom-up development approach rooted in local participation.",
    focusAreas: [
      "Village development",
      "Ward development",
      "Taluka development",
      "Block-level development",
      "Youth-powered change leadership",
      "Volunteer mobilisation",
      "Local problem identification",
      "Solution blueprints",
      "Action circles",
      "Citizen participation",
      "Community resource sharing",
    ],
    category: "Community development",
    icon: "community",
    role: "initiative",
    status: "approved",
  },
  {
    id: "itvidya",
    name: "IT Vidya",
    domain: "itvidya.com",
    // URL from IT Vidya's site.url default.
    url: "https://itvidya.com",
    // Copy from the v0.2 content brief.
    description:
      "Enabling individuals and families to continuously learn, develop understanding, improve their capabilities and contribute positively to society.",
    headline: "Lifelong Learning for Self, Family and Society.",
    positioning:
      "Enabling individuals and families to continuously learn, develop understanding, improve their capabilities and contribute positively to society.",
    focusAreas: [
      "Personal development",
      "Family learning",
      "Social understanding",
      "Lifelong education",
      "Values and wisdom",
      "Knowledge sharing",
    ],
    category: "Lifelong learning",
    icon: "learning",
    role: "initiative",
    status: "approved",
  },
  {
    id: "incubator",
    name: "Incubator.in",
    domain: "incubator.in",
    // Canonical host not found in the Incubator repo; the bare domain was approved with the copy.
    url: "https://incubator.in",
    // Copy from the v0.2 content brief.
    description:
      "Connecting startups and ecosystem participants to create an environment where entrepreneurial ideas can develop into sustainable enterprises.",
    headline: "Nurturing Startups. Strengthening the Startup Ecosystem.",
    positioning:
      "Connecting startups and ecosystem participants to create an environment where entrepreneurial ideas can develop into sustainable enterprises.",
    focusAreas: [
      "Startup founders",
      "Mentors",
      "Investors",
      "Incubators",
      "Accelerators",
      "Academic institutions",
      "Startup service providers",
      "Entrepreneurship support",
    ],
    category: "Startup ecosystem",
    icon: "startup",
    role: "initiative",
    status: "approved",
  },
  {
    id: "nanhasitara",
    name: "Nanha Sitara",
    domain: "nanhasitara.com",
    // Canonical host not found in the NanhaSitara repo; the bare domain was approved with the copy.
    url: "https://nanhasitara.com",
    // Copy from the v0.2 content brief.
    description:
      "Supporting the holistic development of children through the collective involvement of parents, teachers and communities.",
    headline: "Growing Children Together.",
    positioning:
      "Supporting the holistic development of children through the collective involvement of parents, teachers and communities.",
    focusAreas: [
      "Child development",
      "Parent participation",
      "Teacher development",
      "Community involvement",
      "Child-friendly villages",
      "Learning environments",
      "Future-ready children",
    ],
    category: "Child development",
    icon: "children",
    role: "initiative",
    status: "approved",
  },
];

export function getEcosystemSite(id: string): EcosystemSite | undefined {
  return ecosystemSites.find((site) => site.id === id);
}
