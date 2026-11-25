import { z } from "zod";
import { classifyHref, hostOf } from "../lib/url";
import type {
  DevelopmentDimension,
  EcosystemIconKey,
  EcosystemMessaging,
  EcosystemSite,
  FooterContent,
  IntroductionContent,
  Labels,
  SiteConfig,
  SiteId,
} from "./types";

export const siteIds = [
  "sasarjan",
  "talentexcel",
  "10xgrowth",
  "sevapremi",
  "nanhasitara",
  "itvidya",
  "incubator",
] as const satisfies readonly SiteId[];

export const ecosystemIconKeys = [
  "framework",
  "talent",
  "growth",
  "community",
  "learning",
  "startup",
  "children",
] as const satisfies readonly EcosystemIconKey[];

export const developmentDimensions = [
  "human",
  "organisation",
  "community",
  "nature",
] as const satisfies readonly DevelopmentDimension[];

const text = z.string().trim().min(1);
const sectionId = z.string().regex(/^[a-z][a-z0-9-]*$/, "Use lowercase letters, digits and hyphens");
const langTag = z.string().regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/, "Use a BCP 47 language tag such as hi");

const safeHref = z.string().refine((href) => classifyHref(href) !== null, {
  error: (issue) =>
    `Unsafe or unsupported link ${JSON.stringify(issue.input)}. Use a /path, #anchor, https:// URL, mailto: or tel:.`,
});

const linkItem = z.strictObject({ label: text, href: safeHref });
const linkGroup = z.strictObject({ heading: text, links: z.array(linkItem) });
const cta = z.strictObject({
  label: text,
  href: safeHref,
  variant: z.enum(["primary", "secondary"]).optional(),
});
const status = z.enum(["approved", "draft"]);
const dimension = z.enum(developmentDimensions);
const section = z.strictObject({
  id: sectionId,
  title: text,
  paragraphs: z.array(text),
  items: z
    .array(
      z.strictObject({
        title: text,
        text: text.optional(),
        dimension: dimension.optional(),
        shortTitle: text.max(40).optional(),
      }),
    )
    .min(1)
    .optional(),
  itemsLabel: text.optional(),
  navLabel: text.max(30).optional(),
});
const systemsTier = z.strictObject({
  siteId: z.enum(siteIds),
  title: text,
  levels: z.array(text).min(2),
  focus: z.array(text).min(1),
});
const systemsSection = z.strictObject({
  id: sectionId,
  title: text,
  paragraphs: z.array(text),
  topDown: systemsTier,
  bottomUp: systemsTier,
  connection: text,
  supporting: z.array(z.strictObject({ siteId: z.enum(siteIds), text })),
  supportingTitle: text.optional(),
  navLabel: text.max(30).optional(),
});
/** Every `{placeholder}` in a journey step must name a site. */
const journeyStep = text.refine(
  (step) => [...step.matchAll(/\{(\w+)\}/g)].every(([, id]) => (siteIds as readonly string[]).includes(id!)),
  "Name initiatives in a journey step as {siteId}, e.g. {incubator}",
);
const journeySection = z.strictObject({
  id: sectionId,
  title: text,
  paragraphs: z.array(text),
  label: text,
  steps: z.array(journeyStep).min(2),
  navLabel: text.max(30).optional(),
});
const participationPathway = z.strictObject({
  audience: text,
  text,
  siteIds: z.array(z.enum(siteIds)).min(1),
  action: text,
  interest: sectionId.optional(),
});
const cocreatorSection = z.strictObject({
  id: sectionId,
  title: text,
  paragraphs: z.array(text),
  participationPathways: z.array(participationPathway).min(1).optional(),
  audiencesHeading: text.optional(),
  audiences: z.array(text).min(1).optional(),
  pathwaysHeading: text.optional(),
  pathways: z.array(text).min(1).optional(),
  navLabel: text.max(30).optional(),
});

const labelsShape = {
  ecosystemNav: text,
  ecosystemHeading: text,
  currentSite: text,
  opensInNewTab: text,
  aboutEcosystem: text,
  contactHeading: text,
  policiesNav: text,
  copyright: text,
  directoryHeading: text.optional(),
  exploreWebsite: text.optional(),
  exploreInitiatives: text.optional(),
  becomeCoCreator: text.optional(),
  focusAreas: text.optional(),
  frameworkBadge: text.optional(),
  moreFocusAreas: text.optional(),
  onThisPage: text.optional(),
  dimensionTags: text.optional(),
  contributingInitiatives: text.optional(),
  noDedicatedInitiative: text.optional(),
  pathwayInitiatives: text.optional(),
};

export const labelsSchema: z.ZodType<Labels> = z.strictObject(labelsShape);

const siteOverride = z.strictObject({
  name: text.optional(),
  description: text.optional(),
  headline: text.optional(),
  positioning: text.optional(),
  focusAreas: z.array(text).min(1).optional(),
  category: text.optional(),
});

export const siteConfigSchema: z.ZodType<SiteConfig> = z.strictObject({
  siteId: z.enum(siteIds),
  siteName: text.optional(),
  ecosystemPath: safeHref
    .refine((href) => href.startsWith("/"), "ecosystemPath must be a site-relative path such as /ecosystem")
    .optional(),
  cocreator: z.strictObject({ href: safeHref, label: text.optional() }).optional(),
  footer: z
    .strictObject({
      sections: z
        .strictObject({
          ecosystemIntro: z.boolean().optional(),
          ecosystemLinks: z.boolean().optional(),
          siteLinks: z.boolean().optional(),
          contact: z.boolean().optional(),
          policies: z.boolean().optional(),
          brand: z.boolean().optional(),
          tagline: z.boolean().optional(),
          introduction: z.boolean().optional(),
          cocreator: z.boolean().optional(),
          closing: z.boolean().optional(),
        })
        .optional(),
      siteLinks: z.array(linkGroup).optional(),
      policyLinks: z.array(linkItem).optional(),
      contactEmail: z.email().nullable().optional(),
      copyrightHolder: text.optional(),
      launchYear: z.number().int().min(1990).max(2100).optional(),
    })
    .optional(),
  ecosystem: z
    .strictObject({
      includeCurrentSite: z.boolean().optional(),
      openInNewTab: z.boolean().optional(),
      overrides: z.partialRecord(z.enum(siteIds), siteOverride).optional(),
    })
    .optional(),
  introduction: z.strictObject({ ctas: z.array(cta).optional() }).optional(),
  labels: z.strictObject(labelsShape).partial().optional(),
});

const ecosystemSiteSchema: z.ZodType<EcosystemSite> = z
  .strictObject({
    id: z.enum(siteIds),
    name: text,
    nativeName: text.optional(),
    nativeNameLang: langTag.optional(),
    domain: z.string().regex(/^[a-z0-9.-]+\.[a-z]{2,}$/, "Use a bare lowercase domain such as example.com"),
    url: safeHref.refine((href) => classifyHref(href) === "external", "url must be an absolute https:// URL"),
    description: text.max(200),
    headline: text.max(80).optional(),
    positioning: text.max(400).optional(),
    focusAreas: z.array(text.max(80)).min(1).max(16).optional(),
    category: text.max(60).optional(),
    icon: z.enum(ecosystemIconKeys).optional(),
    dimensions: z
      .array(dimension)
      .min(1)
      .refine((list) => new Set(list).size === list.length, "List each dimension once")
      .optional(),
    role: z.enum(["framework", "initiative"]).optional(),
    status,
  })
  .refine((site) => hostOf(site.url) === site.domain, {
    error: "url must point at the site's domain (optionally with www.)",
    path: ["url"],
  })
  .refine((site) => !site.nativeName || site.nativeNameLang, {
    error: "nativeName needs a nativeNameLang so it can be marked up with lang",
    path: ["nativeNameLang"],
  });

export const ecosystemSitesSchema = z
  .array(ecosystemSiteSchema)
  .refine((sites) => new Set(sites.map((s) => s.id)).size === sites.length, "Site ids must be unique")
  .refine((sites) => siteIds.every((id) => sites.some((s) => s.id === id)), "Every site id needs an entry")
  .refine(
    (sites) => sites.filter((s) => s.role === "framework").length <= 1,
    "At most one site can have role framework",
  );

export const ecosystemMessagingSchema: z.ZodType<EcosystemMessaging> = z.strictObject({
  status,
  hierarchy: z.strictObject({ vision: text, mission: text, approach: text, participation: text }),
  introduction: z.strictObject({ body: text, summary: text }),
  closingLine: text,
});

export const introductionContentSchema: z.ZodType<IntroductionContent> = z.strictObject({
  status,
  eyebrow: text,
  title: text,
  lead: z.array(text).min(1),
  vision: section,
  cocreation: section,
  initiatives: section,
  hero: z
    .strictObject({
      eyebrow: text,
      subline: text.optional(),
      headline: text,
      supportingLine: text.optional(),
    })
    .optional(),
  initiativeAudiences: z.partialRecord(z.enum(siteIds), text.max(160)).optional(),
  systems: systemsSection.optional(),
  journey: journeySection.optional(),
  participation: section.optional(),
  cocreator: cocreatorSection.optional(),
  closing: z.strictObject({ id: sectionId, lines: z.array(text).min(1) }).optional(),
  seo: z.strictObject({ title: text.max(70), description: text.max(170) }).optional(),
});

export const footerContentSchema: z.ZodType<FooterContent> = z.strictObject({
  status,
  ecosystemBlurb: text,
  contactEmail: z.email().nullable(),
  copyrightHolder: text.nullable(),
  policyLinks: z.array(linkItem),
  brand: z
    .strictObject({ name: text, nativeName: text.optional(), nativeNameLang: langTag.optional() })
    .optional(),
  cocreator: z.strictObject({ heading: text, body: text }).optional(),
  closing: z.array(text).min(1).optional(),
});
