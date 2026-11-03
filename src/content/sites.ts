import type { EcosystemSite } from "../config/types";

/**
 * The approved ecosystem websites, in display order.
 *
 * Domains are approved. Each entry stays `draft` until its canonical URL (www or bare domain),
 * display name and description are confirmed; see docs/CONTENT-GOVERNANCE.md.
 * Descriptions are condensed from each site's own metadata description.
 */
export const ecosystemSites: readonly EcosystemSite[] = [
  {
    id: "sasarjan",
    name: "SaSarjan",
    domain: "sasarjan.com",
    // DRAFT: requires approval. URL from SaSarjan's siteConfig.siteUrl default.
    url: "https://sasarjan.com",
    description:
      "A civic co-creation initiative bringing people together to collaborate on public systems, civic participation and collective prosperity.",
    status: "draft",
  },
  {
    id: "talentexcel",
    name: "TalentExcel",
    domain: "talentexcel.com",
    // DRAFT: requires approval. Canonical host not found in the TalentExcel repo.
    url: "https://talentexcel.com",
    description:
      "Learn in-demand skills with peers, work on live projects, and earn through freelancing, alone or as a squad.",
    status: "draft",
  },
  {
    id: "10xgrowth",
    name: "10xGrowth",
    domain: "10xgrowth.com",
    // DRAFT: requires approval. URL from 10xGrowth's metadataBase.
    url: "https://10xgrowth.com",
    description: "Business growth through strategy consulting, innovation frameworks and hands-on execution.",
    status: "draft",
  },
  {
    id: "sevapremi",
    name: "SevaPremi",
    domain: "sevapremi.com",
    // DRAFT: requires approval. SevaPremi's canonical URL uses the www host.
    url: "https://www.sevapremi.com",
    description:
      "Meet locally and online, learn together, volunteer and solve real community challenges across India.",
    status: "draft",
  },
  {
    id: "nanhasitara",
    name: "Nanha Sitara",
    domain: "nanhasitara.com",
    // DRAFT: requires approval. Canonical host not found in the NanhaSitara repo.
    url: "https://nanhasitara.com",
    description:
      "A practical guide to child development, from pre-birth to 18, for parents, communities, schools and leaders.",
    status: "draft",
  },
  {
    id: "itvidya",
    name: "IT Vidya",
    domain: "itvidya.com",
    // DRAFT: requires approval. URL from IT Vidya's site.url default.
    url: "https://itvidya.com",
    description:
      "A lifelong learning space for inner transformation, integral thinking and the exploration of all aspects of life.",
    status: "draft",
  },
  {
    id: "incubator",
    name: "Incubator.in",
    domain: "incubator.in",
    // DRAFT: requires approval. Canonical host not found in the Incubator repo.
    url: "https://incubator.in",
    description:
      "A community-maintained, consent-based directory of incubators, accelerators, investors and ecosystem partners across India.",
    status: "draft",
  },
];

export function getEcosystemSite(id: string): EcosystemSite | undefined {
  return ecosystemSites.find((site) => site.id === id);
}
