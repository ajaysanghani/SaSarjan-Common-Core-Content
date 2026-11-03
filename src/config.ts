import { z } from "zod";
import type { SiteConfig } from "./config/types";
import {
  ecosystemSitesSchema,
  footerContentSchema,
  introductionContentSchema,
  siteConfigSchema,
} from "./config/schema";
import { ecosystemSites } from "./content/sites";
import { introductionContent } from "./content/introduction";
import { footerContent } from "./content/footer";

export {
  siteConfigSchema,
  ecosystemSitesSchema,
  introductionContentSchema,
  footerContentSchema,
  siteIds,
} from "./config/schema";

export class SiteConfigError extends Error {
  override name = "SiteConfigError";
}

/**
 * Validates a website's configuration and returns it unchanged.
 *
 * Call it at module scope in `site.config.ts`, so an invalid config fails `next build` with a
 * readable message instead of rendering a broken footer in production.
 */
export function defineSiteConfig<const T extends SiteConfig>(config: T): T {
  const result = siteConfigSchema.safeParse(config);
  if (!result.success) {
    throw new SiteConfigError(`Invalid @sasarjan/web-core site config:\n${z.prettifyError(result.error)}`);
  }
  return config;
}

export interface DraftItem {
  path: string;
  label: string;
}

/** Lists the shared content still marked `draft`. Used by `pnpm check:drafts` before a release. */
export function findDraftContent(): DraftItem[] {
  const drafts: DraftItem[] = [];
  for (const site of ecosystemSites) {
    if (site.status === "draft") drafts.push({ path: `ecosystemSites.${site.id}`, label: site.name });
  }
  if (introductionContent.status === "draft") {
    drafts.push({ path: "introductionContent", label: introductionContent.title });
  }
  if (footerContent.status === "draft")
    drafts.push({ path: "footerContent", label: "Shared footer content" });
  return drafts;
}

/** Validates the content shipped in the package. Throws on the first invalid module. */
export function validateSharedContent(): void {
  ecosystemSitesSchema.parse(ecosystemSites);
  introductionContentSchema.parse(introductionContent);
  footerContentSchema.parse(footerContent);
}
