import type { FooterVariant, LinkComponent, SiteConfig } from "../config/types";
import { footerContent } from "../content/footer";
import {
  DEFAULT_ECOSYSTEM_PATH,
  copyrightYears,
  cx,
  formatTemplate,
  resolveLabels,
  resolveSiteName,
} from "../lib/resolve";
import { EcosystemLinks } from "./EcosystemLinks";
import { SafeLink } from "./SafeLink";

export interface SharedFooterProps {
  site: SiteConfig;
  /**
   * `full` renders a complete `<footer>` landmark for sites without their own footer.
   * `band` renders an ecosystem `<section>` to place inside or next to a site's existing footer.
   */
  variant?: FooterVariant;
  /** Used for site-relative links, e.g. `next/link`. */
  linkComponent?: LinkComponent;
  /** Year for the copyright line. Defaults to the current year at render time. */
  year?: number;
  className?: string;
}

export function SharedFooter({ site, variant = "full", linkComponent, year, className }: SharedFooterProps) {
  return variant === "band" ? (
    <EcosystemBand site={site} linkComponent={linkComponent} className={className} />
  ) : (
    <FullFooter site={site} linkComponent={linkComponent} year={year} className={className} />
  );
}

function EcosystemBand({ site, linkComponent, className }: Omit<SharedFooterProps, "variant" | "year">) {
  const labels = resolveLabels(site);
  const sections = site.footer?.sections ?? {};
  const ecosystemPath = site.ecosystemPath ?? DEFAULT_ECOSYSTEM_PATH;

  return (
    <section
      aria-label={labels.ecosystemHeading}
      className={cx("swc-root swc-footer swc-footer--band", className)}
    >
      <div className="swc-footer__inner">
        {sections.ecosystemIntro !== false ? (
          <div className="swc-footer__about">
            <h2 className="swc-footer__heading">{labels.ecosystemHeading}</h2>
            <p className="swc-footer__blurb">{footerContent.ecosystemBlurb}</p>
            <SafeLink href={ecosystemPath} linkComponent={linkComponent} className="swc-footer__more">
              {labels.aboutEcosystem}
            </SafeLink>
          </div>
        ) : null}
        {sections.ecosystemLinks !== false ? <EcosystemLinks site={site} layout="inline" /> : null}
      </div>
    </section>
  );
}

function FullFooter({ site, linkComponent, year, className }: Omit<SharedFooterProps, "variant">) {
  const labels = resolveLabels(site);
  const footer = site.footer ?? {};
  const sections = footer.sections ?? {};
  const siteName = resolveSiteName(site);
  const ecosystemPath = site.ecosystemPath ?? DEFAULT_ECOSYSTEM_PATH;
  const contactEmail = footer.contactEmail === undefined ? footerContent.contactEmail : footer.contactEmail;
  const policyLinks = footer.policyLinks ?? footerContent.policyLinks;
  const siteLinks = footer.siteLinks ?? [];
  const holder = footer.copyrightHolder ?? footerContent.copyrightHolder ?? siteName;
  const years = copyrightYears(year ?? new Date().getFullYear(), footer.launchYear);

  return (
    <footer className={cx("swc-root swc-footer swc-footer--full", className)}>
      <div className="swc-footer__inner">
        {sections.ecosystemIntro !== false ? (
          <div className="swc-footer__about">
            <p className="swc-footer__site">{siteName}</p>
            <p className="swc-footer__blurb">{footerContent.ecosystemBlurb}</p>
            <SafeLink href={ecosystemPath} linkComponent={linkComponent} className="swc-footer__more">
              {labels.aboutEcosystem}
            </SafeLink>
          </div>
        ) : null}

        {sections.siteLinks !== false
          ? siteLinks.map((group) => (
              <nav key={group.heading} aria-label={group.heading} className="swc-footer__group">
                <h2 className="swc-footer__heading">{group.heading}</h2>
                <ul className="swc-footer__list">
                  {group.links.map((link) => (
                    <li key={`${link.href}|${link.label}`}>
                      <SafeLink
                        href={link.href}
                        linkComponent={linkComponent}
                        className="swc-footer__link"
                        newTabLabel={labels.opensInNewTab}
                      >
                        {link.label}
                      </SafeLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))
          : null}

        {sections.ecosystemLinks !== false ? (
          <div className="swc-footer__group">
            <EcosystemLinks
              site={site}
              layout="list"
              showDescriptions={false}
              heading={labels.ecosystemHeading}
              headingLevel={2}
            />
          </div>
        ) : null}

        {sections.contact !== false && contactEmail ? (
          <div className="swc-footer__group">
            <h2 className="swc-footer__heading">{labels.contactHeading}</h2>
            <ul className="swc-footer__list">
              <li>
                <SafeLink href={`mailto:${contactEmail}`} className="swc-footer__link">
                  {contactEmail}
                </SafeLink>
              </li>
            </ul>
          </div>
        ) : null}
      </div>

      <div className="swc-footer__bottom">
        <p className="swc-footer__copyright">{formatTemplate(labels.copyright, { years, holder })}</p>
        {sections.policies !== false && policyLinks.length > 0 ? (
          <nav aria-label={labels.policiesNav}>
            <ul className="swc-footer__policies">
              {policyLinks.map((link) => (
                <li key={`${link.href}|${link.label}`}>
                  <SafeLink href={link.href} linkComponent={linkComponent} className="swc-footer__link">
                    {link.label}
                  </SafeLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </footer>
  );
}
