import type { EcosystemSite, Labels, SiteConfig, SiteId } from "../config/types";
import { cx, resolveLabels, resolveSites } from "../lib/resolve";
import { SafeLink } from "./SafeLink";

export interface EcosystemLinksProps {
  /** The website rendering the list. Marked as current, or left out with `includeCurrentSite={false}`. */
  currentSiteId?: SiteId;
  /** Shortcut for `currentSiteId`, `includeCurrentSite`, `openInNewTab`, overrides and labels. */
  site?: SiteConfig;
  /** Defaults to the shared directory. */
  sites?: readonly EcosystemSite[];
  includeCurrentSite?: boolean;
  layout?: "grid" | "list" | "inline";
  /** Defaults to true, except for the inline layout. */
  showDescriptions?: boolean;
  /** Visible heading above the list. Omit for none; the nav is still labelled for screen readers. */
  heading?: string;
  headingLevel?: 2 | 3 | 4;
  openInNewTab?: boolean;
  labels?: Partial<Labels>;
  className?: string;
}

export function EcosystemLinks({
  site,
  currentSiteId = site?.siteId,
  sites,
  includeCurrentSite = site?.ecosystem?.includeCurrentSite ?? true,
  layout = "grid",
  showDescriptions = layout !== "inline",
  heading,
  headingLevel = 2,
  openInNewTab = site?.ecosystem?.openInNewTab ?? false,
  labels: labelOverrides,
  className,
}: EcosystemLinksProps) {
  const labels = resolveLabels(site, labelOverrides);
  const items = resolveSites({
    sites,
    currentSiteId,
    includeCurrentSite,
    overrides: site?.ecosystem?.overrides,
  });
  const Heading = `h${headingLevel}` as const;

  return (
    <nav
      aria-label={heading ?? labels.ecosystemNav}
      className={cx("swc-root swc-eco", `swc-eco--${layout}`, className)}
    >
      {heading ? <Heading className="swc-eco__heading">{heading}</Heading> : null}
      <ul className="swc-eco__list">
        {items.map((item) => {
          const isCurrent = item.id === currentSiteId;
          return (
            <li key={item.id} className={cx("swc-eco__item", isCurrent && "swc-eco__item--current")}>
              <SafeLink
                href={item.url}
                className="swc-eco__link"
                newTab={openInNewTab && !isCurrent}
                newTabLabel={labels.opensInNewTab}
                ariaCurrent={isCurrent ? "true" : undefined}
              >
                <span className="swc-eco__name">{item.name}</span>
                {layout !== "inline" ? <span className="swc-eco__domain">{item.domain}</span> : null}
                {isCurrent ? <span className="swc-eco__badge">{labels.currentSite}</span> : null}
              </SafeLink>
              {showDescriptions ? <p className="swc-eco__desc">{item.description}</p> : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
