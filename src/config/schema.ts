import { z } from "zod";
import { classifyHref, hostOf } from "../lib/url";
import type { EcosystemSite, FooterContent, IntroductionContent, Labels, SiteConfig, SiteId } from "./types";

export const siteIds = [
  "sasarjan",
  "talentexcel",
  "10xgrowth",
  "sevapremi",
  "nanhasitara",
  "itvidya",
  "incubator",
] as const satisfies readonly SiteId[];

const text = z.string().trim().min(1);

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
const section = z.strictObject({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/, "Use lowercase letters, digits and hyphens"),
  title: text,
  paragraphs: z.array(text),
});

export const labelsSchema: z.ZodType<Labels> = z.strictObject({
  ecosystemNav: text,
  ecosystemHeading: text,
  currentSite: text,
  opensInNewTab: text,
  aboutEcosystem: text,
  contactHeading: text,
  policiesNav: text,
  copyright: text,
});

export const siteConfigSchema: z.ZodType<SiteConfig> = z.strictObject({
  siteId: z.enum(siteIds),
  siteName: text.optional(),
  ecosystemPath: safeHref
    .refine((href) => href.startsWith("/"), "ecosystemPath must be a site-relative path such as /ecosystem")
    .optional(),
  footer: z
    .strictObject({
      sections: z
        .strictObject({
          ecosystemIntro: z.boolean().optional(),
          ecosystemLinks: z.boolean().optional(),
          siteLinks: z.boolean().optional(),
          contact: z.boolean().optional(),
          policies: z.boolean().optional(),
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
      overrides: z
        .partialRecord(
          z.enum(siteIds),
          z.strictObject({ name: text.optional(), description: text.optional() }),
        )
        .optional(),
    })
    .optional(),
  introduction: z.strictObject({ ctas: z.array(cta).optional() }).optional(),
  labels: z
    .strictObject({
      ecosystemNav: text.optional(),
      ecosystemHeading: text.optional(),
      currentSite: text.optional(),
      opensInNewTab: text.optional(),
      aboutEcosystem: text.optional(),
      contactHeading: text.optional(),
      policiesNav: text.optional(),
      copyright: text.optional(),
    })
    .optional(),
});

const ecosystemSiteSchema: z.ZodType<EcosystemSite> = z
  .strictObject({
    id: z.enum(siteIds),
    name: text,
    domain: z.string().regex(/^[a-z0-9.-]+\.[a-z]{2,}$/, "Use a bare lowercase domain such as example.com"),
    url: safeHref.refine((href) => classifyHref(href) === "external", "url must be an absolute https:// URL"),
    description: text.max(200),
    status,
  })
  .refine((site) => hostOf(site.url) === site.domain, {
    error: "url must point at the site's domain (optionally with www.)",
    path: ["url"],
  });

export const ecosystemSitesSchema = z
  .array(ecosystemSiteSchema)
  .refine((sites) => new Set(sites.map((s) => s.id)).size === sites.length, "Site ids must be unique")
  .refine((sites) => siteIds.every((id) => sites.some((s) => s.id === id)), "Every site id needs an entry");

export const introductionContentSchema: z.ZodType<IntroductionContent> = z.strictObject({
  status,
  eyebrow: text,
  title: text,
  lead: z.array(text).min(1),
  vision: section,
  cocreation: section,
  initiatives: section,
});

export const footerContentSchema: z.ZodType<FooterContent> = z.strictObject({
  status,
  ecosystemBlurb: text,
  contactEmail: z.email().nullable(),
  copyrightHolder: text.nullable(),
  policyLinks: z.array(linkItem),
});
