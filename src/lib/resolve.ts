import type { EcosystemSite, Labels, SiteConfig, SiteId } from "../config/types";
import { ecosystemSites, getEcosystemSite } from "../content/sites";
import { defaultLabels } from "../content/footer";

export const DEFAULT_ECOSYSTEM_PATH = "/ecosystem";

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function resolveLabels(
  site?: Pick<SiteConfig, "labels">,
  overrides?: Partial<Labels>,
): Required<Labels> {
  return { ...defaultLabels, ...definedOnly(site?.labels), ...definedOnly(overrides) };
}

/** Drops keys explicitly set to `undefined`, so they don't erase a default when spread. */
function definedOnly<T extends object>(values: T | undefined): Partial<T> {
  return Object.fromEntries(
    Object.entries(values ?? {}).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

export function resolveSiteName(site: SiteConfig): string {
  return site.siteName ?? getEcosystemSite(site.siteId)?.name ?? site.siteId;
}

/** Applies text overrides (e.g. translations) and drops the current site when configured to. */
export function resolveSites(options: {
  sites?: readonly EcosystemSite[];
  currentSiteId?: SiteId;
  includeCurrentSite?: boolean;
  overrides?: NonNullable<SiteConfig["ecosystem"]>["overrides"];
}): EcosystemSite[] {
  const { sites = ecosystemSites, currentSiteId, includeCurrentSite = true, overrides } = options;
  return sites
    .filter((site) => includeCurrentSite || site.id !== currentSiteId)
    .map((site) => ({ ...site, ...overrides?.[site.id] }));
}

export function copyrightYears(currentYear: number, launchYear?: number): string {
  return launchYear && launchYear < currentYear ? `${launchYear}–${currentYear}` : String(currentYear);
}

export function formatTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
