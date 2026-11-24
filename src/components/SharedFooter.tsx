import type { FooterSections, FooterVariant, Labels, LinkComponent, SiteConfig } from "../config/types";
import { footerContent } from "../content/footer";
import { ecosystemMessaging } from "../content/messaging";
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
   * `band` renders a compact ecosystem `<section>` to place inside or next to a site's existing footer.
   */
  variant?: FooterVariant;
  /**
   * Leaves out the tagline, the common introduction and the "About the ecosystem" link, for pages
   * that already show them, such as `/ecosystem`. The brand line, directory, CoCreator block, the
   * site's own links and the closing lines stay. Overrides `footer.sections` for those blocks.
   */
  condensed?: boolean;
  /** Used for site-relative links, e.g. `next/link`. */
  linkComponent?: LinkComponent;
  /** Year for the copyright line. Defaults to the current year at render time. */
  year?: number;
  className?: string;
}

export function SharedFooter({
  site,
  variant = "full",
  condensed = false,
  linkComponent,
  year,
  className,
}: SharedFooterProps) {
  return variant === "band" ? (
    <EcosystemBand site={site} condensed={condensed} linkComponent={linkComponent} className={className} />
  ) : (
    <FullFooter
      site={site}
      condensed={condensed}
      linkComponent={linkComponent}
      year={year}
      className={className}
    />
  );
}

type BlockProps = Omit<SharedFooterProps, "variant">;

interface ResolvedBlocks {
  /** The site's name (`full`). */
  siteName: boolean;
  /** The "About the ecosystem" link. */
  about: boolean;
  brand: boolean;
  tagline: boolean;
  introduction: boolean;
  directory: boolean;
  cocreator: boolean;
  siteLinks: boolean;
  contact: boolean;
  policies: boolean;
  closing: boolean;
}

/** Applies the defaults documented on `FooterSections`, then `condensed`. */
function resolveBlocks(
  sections: FooterSections = {},
  variant: FooterVariant,
  condensed: boolean,
): ResolvedBlocks {
  const about = sections.ecosystemIntro !== false;
  return {
    siteName: about,
    about: about && !condensed,
    brand: sections.brand ?? true,
    tagline: (sections.tagline ?? about) && !condensed,
    introduction: (sections.introduction ?? (variant === "full" && about)) && !condensed,
    directory: sections.ecosystemLinks !== false,
    cocreator: sections.cocreator ?? true,
    siteLinks: sections.siteLinks !== false,
    contact: sections.contact !== false,
    policies: sections.policies !== false,
    closing: sections.closing ?? true,
  };
}

function BrandLine() {
  const brand = footerContent.brand;
  if (!brand) return null;
  return (
    <p className="swc-footer__brand">
      <span className="swc-footer__brand-name">{brand.name}</span>
      {brand.nativeName ? (
        <>
          <span className="swc-footer__brand-sep" aria-hidden="true">
            {" | "}
          </span>
          <span className="swc-footer__brand-native" lang={brand.nativeNameLang}>
            {brand.nativeName}
          </span>
        </>
      ) : null}
    </p>
  );
}

function Tagline() {
  const { approach, mission } = ecosystemMessaging.hierarchy;
  return (
    <p className="swc-footer__tagline">
      <span className="swc-footer__tagline-main">{approach}</span>{" "}
      <span className="swc-footer__tagline-sub">{mission}</span>
    </p>
  );
}

/** The common introduction after the tagline. */
function Introduction() {
  return (
    <div className="swc-footer__intro">
      <p className="swc-footer__blurb">{ecosystemMessaging.introduction.body}</p>
      <p className="swc-footer__participation">{ecosystemMessaging.hierarchy.participation}</p>
      <p className="swc-footer__blurb">{ecosystemMessaging.introduction.summary}</p>
    </div>
  );
}

function CoCreatorLink({
  site,
  labels,
  linkComponent,
}: {
  site: SiteConfig;
  labels: Required<Labels>;
  linkComponent?: LinkComponent;
}) {
  if (!site.cocreator) return null;
  return (
    <SafeLink href={site.cocreator.href} linkComponent={linkComponent} className="swc-btn swc-footer__cta">
      {site.cocreator.label ?? labels.becomeCoCreator}
    </SafeLink>
  );
}

function Directory({
  site,
  labels,
  compact,
}: {
  site: SiteConfig;
  labels: Required<Labels>;
  compact: boolean;
}) {
  return (
    <EcosystemLinks
      site={site}
      layout="directory"
      heading={labels.directoryHeading}
      headingLevel={2}
      className={cx("swc-footer__directory", compact && "swc-footer__directory--compact")}
    />
  );
}

function EcosystemBand({ site, condensed = false, linkComponent, className }: BlockProps) {
  const labels = resolveLabels(site);
  const blocks = resolveBlocks(site.footer?.sections, "band", condensed);
  const ecosystemPath = site.ecosystemPath ?? DEFAULT_ECOSYSTEM_PATH;
  const showCta = blocks.cocreator && Boolean(site.cocreator);
  const showLead = blocks.brand || blocks.tagline || blocks.introduction || blocks.about || showCta;
  const closingLine = footerContent.closing?.[0];

  return (
    <section
      aria-label={labels.ecosystemHeading}
      className={cx("swc-root swc-footer swc-footer--band", condensed && "swc-footer--condensed", className)}
    >
      <div
        className={cx("swc-footer__inner", !(showLead && blocks.directory) && "swc-footer__inner--single")}
      >
        {showLead ? (
          <div className="swc-footer__about">
            {blocks.brand ? <BrandLine /> : null}
            {blocks.tagline ? <Tagline /> : null}
            {blocks.introduction ? <Introduction /> : null}
            {blocks.about || showCta ? (
              <div className="swc-footer__actions">
                {showCta ? <CoCreatorLink site={site} labels={labels} linkComponent={linkComponent} /> : null}
                {blocks.about ? (
                  <SafeLink href={ecosystemPath} linkComponent={linkComponent} className="swc-footer__more">
                    {labels.aboutEcosystem}
                  </SafeLink>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
        {blocks.directory ? <Directory site={site} labels={labels} compact /> : null}
      </div>
      {blocks.closing && closingLine ? (
        <div className="swc-footer__closing">
          <p className="swc-footer__closing-line">{closingLine}</p>
        </div>
      ) : null}
    </section>
  );
}

function FullFooter({ site, condensed = false, linkComponent, year, className }: BlockProps) {
  const labels = resolveLabels(site);
  const footer = site.footer ?? {};
  const blocks = resolveBlocks(footer.sections, "full", condensed);
  const siteName = resolveSiteName(site);
  const ecosystemPath = site.ecosystemPath ?? DEFAULT_ECOSYSTEM_PATH;
  const contactEmail = footer.contactEmail === undefined ? footerContent.contactEmail : footer.contactEmail;
  const policyLinks = footer.policyLinks ?? footerContent.policyLinks;
  const siteLinks = blocks.siteLinks ? (footer.siteLinks ?? []) : [];
  const holder = footer.copyrightHolder ?? footerContent.copyrightHolder ?? siteName;
  const years = copyrightYears(year ?? new Date().getFullYear(), footer.launchYear);
  const cocreator = blocks.cocreator && site.cocreator ? footerContent.cocreator : undefined;
  const showContact = blocks.contact && Boolean(contactEmail);
  const showLead = blocks.brand || blocks.tagline || blocks.introduction || blocks.about;
  const showSiteRow = blocks.siteName || siteLinks.length > 0 || showContact;
  // The summary closes the introduction too; don't say it twice in one footer.
  const closing = (footerContent.closing ?? []).filter(
    (line) => !(blocks.introduction && line === ecosystemMessaging.introduction.summary),
  );
  const split = blocks.directory && (blocks.tagline || blocks.introduction);

  return (
    <footer
      className={cx("swc-root swc-footer swc-footer--full", condensed && "swc-footer--condensed", className)}
    >
      {showLead || blocks.directory ? (
        <div className={cx("swc-footer__ecosystem", split && "swc-footer__ecosystem--split")}>
          {showLead ? (
            <div className="swc-footer__lead">
              {blocks.brand ? <BrandLine /> : null}
              {blocks.tagline ? <Tagline /> : null}
              {blocks.introduction ? <Introduction /> : null}
              {blocks.about ? (
                <SafeLink href={ecosystemPath} linkComponent={linkComponent} className="swc-footer__more">
                  {labels.aboutEcosystem}
                </SafeLink>
              ) : null}
            </div>
          ) : null}
          {blocks.directory ? <Directory site={site} labels={labels} compact={false} /> : null}
        </div>
      ) : null}

      {cocreator ? (
        <div className="swc-footer__cocreator-wrap">
          <div className="swc-footer__cocreator">
            <div className="swc-footer__cocreator-text">
              <h2 className="swc-footer__cocreator-heading">{cocreator.heading}</h2>
              <p className="swc-footer__cocreator-body">{cocreator.body}</p>
            </div>
            <CoCreatorLink site={site} labels={labels} linkComponent={linkComponent} />
          </div>
        </div>
      ) : null}

      {showSiteRow ? (
        <div className="swc-footer__inner swc-footer__site-row">
          {blocks.siteName ? (
            <div className="swc-footer__about">
              <p className="swc-footer__site">{siteName}</p>
            </div>
          ) : null}

          {siteLinks.map((group) => (
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
          ))}

          {showContact ? (
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
      ) : null}

      {blocks.closing && closing.length > 0 ? (
        <div className="swc-footer__closing">
          {closing.map((line) => (
            <p key={line} className="swc-footer__closing-line">
              {line}
            </p>
          ))}
        </div>
      ) : null}

      <div className="swc-footer__bottom">
        <p className="swc-footer__copyright">{formatTemplate(labels.copyright, { years, holder })}</p>
        {blocks.policies && policyLinks.length > 0 ? (
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
