import type { ReactNode } from "react";
import type {
  ContentSection,
  CoCreatorSection,
  Cta,
  EcosystemSite,
  IntroductionContent,
  Labels,
  LinkComponent,
  SiteConfig,
  SiteId,
  SystemsSection,
  SystemsTier,
} from "../config/types";
import { introductionContent } from "../content/introduction";
import { cx, formatTemplate, resolveLabels, resolveSites } from "../lib/resolve";
import { EcosystemIcon } from "./EcosystemIcon";
import { EcosystemLinks } from "./EcosystemLinks";
import { SafeLink } from "./SafeLink";
import { CtaRow, SharedPageLayout, type PageSection } from "./SharedPageLayout";

export interface IntroductionPageProps {
  site: SiteConfig;
  /** Replaces `site.introduction.ctas`. */
  ctas?: Cta[];
  /**
   * Replaces the shared copy, e.g. with a translation. Content with a `hero` gets the eight-section
   * page; content in the 0.1 shape (no `hero`) gets the 0.1 layout.
   */
  content?: IntroductionContent;
  /**
   * Site-specific content. In the eight-section page it follows "Become a CoCreator", before the
   * closing lines, together with the site's CTAs; in the 0.1 layout it follows the directory.
   */
  children?: ReactNode;
  linkComponent?: LinkComponent;
  as?: "article" | "div" | "main";
  className?: string;
}

/** Focus-area lists longer than this show their first `FOCUS_VISIBLE` items and collapse the rest. */
const FOCUS_COLLAPSE_AFTER = 5;
const FOCUS_VISIBLE = 4;

/** The body of the shared `/ecosystem` page. Renders the page's `<h1>`. */
export function IntroductionPage({
  site,
  ctas = site.introduction?.ctas ?? [],
  content = introductionContent,
  children,
  linkComponent,
  as,
  className,
}: IntroductionPageProps) {
  if (!content.hero) {
    return (
      <ClassicPage
        site={site}
        ctas={ctas}
        content={content}
        linkComponent={linkComponent}
        as={as}
        className={className}
      >
        {children}
      </ClassicPage>
    );
  }

  const labels = resolveLabels(site);
  const { hero, vision, cocreation, initiatives, systems, participation, cocreator, closing } = content;
  const sites = resolveSites({ overrides: site.ecosystem?.overrides });
  const cocreatorCta: Cta | undefined = site.cocreator
    ? {
        href: site.cocreator.href,
        label: site.cocreator.label ?? labels.becomeCoCreator,
        variant: "secondary",
      }
    : undefined;
  const heroCtas: Cta[] = [
    { href: `#${initiatives.id}`, label: labels.exploreInitiatives, variant: "primary" },
    ...(cocreatorCta ? [cocreatorCta] : []),
  ];

  const sections: PageSection[] = [
    {
      id: vision.id,
      title: vision.title,
      className: "swc-intro__vision",
      body: (
        <>
          <Paragraphs paragraphs={vision.paragraphs} />
          <ItemGrid section={vision} variant="dimensions" />
        </>
      ),
    },
    {
      id: cocreation.id,
      title: cocreation.title,
      className: "swc-intro__cocreation",
      body: (
        <>
          <ItemGrid section={cocreation} variant="participants" />
          <Paragraphs paragraphs={cocreation.paragraphs} />
        </>
      ),
    },
    {
      id: initiatives.id,
      title: initiatives.title,
      className: "swc-intro__initiatives",
      body: (
        <>
          <Paragraphs paragraphs={initiatives.paragraphs} />
          <InitiativeCards site={site} sites={sites} labels={labels} />
        </>
      ),
    },
  ];
  if (systems) {
    sections.push({
      id: systems.id,
      title: systems.title,
      className: "swc-intro__systems",
      body: (
        <>
          <Paragraphs paragraphs={systems.paragraphs} />
          <SystemsDiagram systems={systems} sites={sites} />
        </>
      ),
    });
  }
  if (participation) {
    sections.push({
      id: participation.id,
      title: participation.title,
      className: "swc-intro__participation",
      body: (
        <>
          <Paragraphs paragraphs={participation.paragraphs} />
          <Pathways section={participation} />
        </>
      ),
    });
  }
  if (cocreator) {
    sections.push({
      id: cocreator.id,
      title: cocreator.title,
      className: "swc-intro__cocreator",
      body: <CoCreator section={cocreator} cta={cocreatorCta} linkComponent={linkComponent} />,
    });
  }

  return (
    <SharedPageLayout
      title={hero.headline}
      eyebrow={hero.eyebrow}
      subline={hero.subline}
      intro={content.lead}
      headerCtas={heroCtas}
      sections={sections}
      linkComponent={linkComponent}
      as={as}
      className={cx("swc-intro swc-intro--extended", className)}
    >
      {children || ctas.length > 0 ? (
        <div className="swc-intro__site">
          {children}
          {ctas.length > 0 ? <CtaRow ctas={ctas} linkComponent={linkComponent} /> : null}
        </div>
      ) : null}
      {closing ? (
        <div id={closing.id} className="swc-intro__closing">
          {closing.lines.map((line) => (
            <p key={line} className="swc-intro__closing-line">
              {line}
            </p>
          ))}
        </div>
      ) : null}
    </SharedPageLayout>
  );
}

/** The 0.1 page, for content without the 0.2 sections. Unchanged from 0.1. */
function ClassicPage({
  site,
  ctas,
  content,
  children,
  linkComponent,
  as,
  className,
}: Required<Pick<IntroductionPageProps, "site" | "ctas" | "content">> &
  Omit<IntroductionPageProps, "site" | "ctas" | "content">) {
  const { vision, cocreation, initiatives } = content;

  return (
    <SharedPageLayout
      title={content.title}
      eyebrow={content.eyebrow}
      intro={content.lead}
      sections={[
        { id: vision.id, title: vision.title, body: vision.paragraphs },
        { id: cocreation.id, title: cocreation.title, body: cocreation.paragraphs },
        {
          id: initiatives.id,
          title: initiatives.title,
          body: (
            <>
              {initiatives.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <EcosystemLinks site={site} layout="grid" />
            </>
          ),
        },
      ]}
      ctas={ctas}
      linkComponent={linkComponent}
      as={as}
      className={cx("swc-intro", className)}
    >
      {children ? <div className="swc-intro__site">{children}</div> : null}
    </SharedPageLayout>
  );
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="swc-intro__text">
          {paragraph}
        </p>
      ))}
    </>
  );
}

/** A section's `items` as small tiles, each titled by an `<h3>`. */
function ItemGrid({ section, variant }: { section: ContentSection; variant: "dimensions" | "participants" }) {
  const items = section.items ?? [];
  if (items.length === 0) return null;
  const labelId = `${section.id}-items`;
  return (
    <div className={cx("swc-intro__items", `swc-intro__items--${variant}`)}>
      {section.itemsLabel ? (
        <p id={labelId} className="swc-intro__label">
          {section.itemsLabel}
        </p>
      ) : null}
      <ul className="swc-intro__tiles" aria-labelledby={section.itemsLabel ? labelId : undefined}>
        {items.map((item) => (
          <li key={item.title} className="swc-intro__tile">
            <h3 className="swc-intro__tile-title">{item.title}</h3>
            {item.text ? <p className="swc-intro__tile-text">{item.text}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The seven initiative cards. SaSarjan, the framework, gets a wide card of its own. */
function InitiativeCards({
  site,
  sites,
  labels,
}: {
  site: SiteConfig;
  sites: EcosystemSite[];
  labels: Required<Labels>;
}) {
  const openInNewTab = site.ecosystem?.openInNewTab ?? false;
  return (
    <ul className="swc-intro__cards">
      {sites.map((item) => {
        const isCurrent = item.id === site.siteId;
        const isFramework = item.role === "framework";
        const focus = item.focusAreas ?? [];
        const collapse = focus.length > FOCUS_COLLAPSE_AFTER;
        const shown = collapse ? focus.slice(0, FOCUS_VISIBLE) : focus;
        const hidden = collapse ? focus.slice(FOCUS_VISIBLE) : [];
        return (
          <li
            key={item.id}
            className={cx(
              "swc-intro__card",
              isFramework && "swc-intro__card--framework",
              isCurrent && "swc-intro__card--current",
            )}
          >
            <div className="swc-intro__card-top">
              {item.icon ? (
                <span className="swc-intro__card-icon">
                  <EcosystemIcon icon={item.icon} />
                </span>
              ) : null}
              <div className="swc-intro__card-meta">
                {item.category ? <p className="swc-intro__card-category">{item.category}</p> : null}
                {isFramework || isCurrent ? (
                  <p className="swc-intro__badges">
                    {isFramework ? (
                      <span className="swc-intro__badge swc-intro__badge--framework">
                        {labels.frameworkBadge}
                      </span>
                    ) : null}
                    {isCurrent ? (
                      <span className="swc-intro__badge swc-intro__badge--current">{labels.currentSite}</span>
                    ) : null}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="swc-intro__card-main">
              <h3 className="swc-intro__card-name">
                {item.name}
                {item.nativeName ? (
                  <>
                    <span className="swc-intro__card-sep" aria-hidden="true">
                      {" · "}
                    </span>
                    <span className="swc-intro__card-native" lang={item.nativeNameLang}>
                      {item.nativeName}
                    </span>
                  </>
                ) : null}
              </h3>
              {item.headline ? <p className="swc-intro__card-headline">{item.headline}</p> : null}
              <p className="swc-intro__card-text">{item.positioning ?? item.description}</p>
            </div>
            {focus.length > 0 ? (
              <div className="swc-intro__card-focus">
                <p className="swc-intro__label" id={`swc-focus-${item.id}`}>
                  {labels.focusAreas}
                </p>
                <ul className="swc-intro__chips" aria-labelledby={`swc-focus-${item.id}`}>
                  {shown.map((area) => (
                    <li key={area} className="swc-intro__chip">
                      {area}
                    </li>
                  ))}
                </ul>
                {hidden.length > 0 ? (
                  <details className="swc-intro__more">
                    <summary className="swc-intro__more-summary">
                      {formatTemplate(labels.moreFocusAreas, { count: String(hidden.length) })}
                    </summary>
                    <ul className="swc-intro__chips">
                      {hidden.map((area) => (
                        <li key={area} className="swc-intro__chip">
                          {area}
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </div>
            ) : null}
            <p className="swc-intro__card-action">
              <SafeLink
                href={item.url}
                className="swc-intro__card-link"
                newTab={openInNewTab && !isCurrent}
                newTabLabel={labels.opensInNewTab}
                ariaCurrent={isCurrent ? "true" : undefined}
              >
                <span className="swc-intro__card-link-label">{labels.exploreWebsite}</span>{" "}
                <span className="swc-intro__card-domain">{item.domain}</span>
              </SafeLink>
            </p>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Top-down and bottom-up tiers meeting in the middle, with the supporting initiatives around them.
 * Built from headings and lists, so it reads in order without the visual layout.
 */
function SystemsDiagram({ systems, sites }: { systems: SystemsSection; sites: EcosystemSite[] }) {
  const byId = (id: SiteId) => sites.find((s) => s.id === id);
  const supportingId = `${systems.id}-supporting`;
  return (
    <div className="swc-sys">
      <div className="swc-sys__core">
        <Tier id={`${systems.id}-top-down`} tier={systems.topDown} site={byId(systems.topDown.siteId)} />
        <div className="swc-sys__meet">
          <span className="swc-sys__meet-mark" aria-hidden="true" />
          <p className="swc-sys__meet-text">{systems.connection}</p>
        </div>
        <Tier
          id={`${systems.id}-bottom-up`}
          tier={systems.bottomUp}
          site={byId(systems.bottomUp.siteId)}
          rising
        />
      </div>
      {systems.supporting.length > 0 ? (
        <div className="swc-sys__supporting">
          {systems.supportingTitle ? (
            <h3 id={supportingId} className="swc-sys__supporting-title">
              {systems.supportingTitle}
            </h3>
          ) : null}
          <ul
            className="swc-sys__support-list"
            aria-labelledby={systems.supportingTitle ? supportingId : `${systems.id}-title`}
          >
            {systems.supporting.map((entry) => {
              const support = byId(entry.siteId);
              return (
                <li key={entry.siteId} className="swc-sys__support">
                  {support?.icon ? (
                    <span className="swc-sys__support-icon">
                      <EcosystemIcon icon={support.icon} />
                    </span>
                  ) : null}
                  <span className="swc-sys__support-text">
                    <span className="swc-sys__support-name">{support?.name ?? entry.siteId}</span>{" "}
                    <span className="swc-sys__support-role">{entry.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Tier({
  id,
  tier,
  site,
  rising = false,
}: {
  id: string;
  tier: SystemsTier;
  site?: EcosystemSite;
  /** Levels build upwards towards the middle (bottom-up). */
  rising?: boolean;
}) {
  return (
    <div className={cx("swc-sys__tier", rising ? "swc-sys__tier--up" : "swc-sys__tier--down")}>
      <h3 id={`${id}-title`} className="swc-sys__tier-title">
        {site?.icon ? (
          <span className="swc-sys__tier-icon">
            <EcosystemIcon icon={site.icon} />
          </span>
        ) : null}
        <span className="swc-sys__tier-heading">
          <span className="swc-sys__tier-name">{site?.name ?? tier.siteId}</span>
          <span className="swc-sr-only">:</span> <span className="swc-sys__tier-kind">{tier.title}</span>
        </span>
      </h3>
      <ol className="swc-sys__levels" aria-labelledby={`${id}-title`}>
        {tier.levels.map((level) => (
          <li key={level} className="swc-sys__level">
            <span className="swc-sys__level-name">{level}</span>
          </li>
        ))}
      </ol>
      <ul className="swc-sys__focus">
        {tier.focus.map((item) => (
          <li key={item} className="swc-intro__chip">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Interconnected pathways around their shared line: a ring, not a sequence. */
function Pathways({ section }: { section: ContentSection }) {
  const items = section.items ?? [];
  if (items.length === 0) return null;
  const labelId = `${section.id}-items`;
  return (
    <div className={cx("swc-paths", section.itemsLabel && items.length === 5 && "swc-paths--ring")}>
      {section.itemsLabel ? (
        <p id={labelId} className="swc-paths__hub">
          {section.itemsLabel}
        </p>
      ) : null}
      <ul className="swc-paths__list" aria-labelledby={section.itemsLabel ? labelId : undefined}>
        {items.map((item) => (
          <li key={item.title} className="swc-paths__item">
            <h3 className="swc-paths__title">{item.title}</h3>
            {item.text ? <p className="swc-paths__text">{item.text}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoCreator({
  section,
  cta,
  linkComponent,
}: {
  section: CoCreatorSection;
  cta?: Cta;
  linkComponent?: LinkComponent;
}) {
  return (
    <div className="swc-intro__join">
      <Paragraphs paragraphs={section.paragraphs} />
      <div className="swc-intro__join-grid">
        <div className="swc-intro__join-group">
          <h3 className="swc-intro__join-heading">{section.audiencesHeading}</h3>
          <ul className="swc-intro__chips">
            {section.audiences.map((audience) => (
              <li key={audience} className="swc-intro__chip">
                {audience}
              </li>
            ))}
          </ul>
        </div>
        <div className="swc-intro__join-group">
          <h3 className="swc-intro__join-heading">{section.pathwaysHeading}</h3>
          <ul className="swc-intro__checklist">
            {section.pathways.map((pathway) => (
              <li key={pathway} className="swc-intro__check">
                {pathway}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {cta ? (
        <SafeLink href={cta.href} linkComponent={linkComponent} className="swc-btn swc-btn--primary">
          {cta.label}
        </SafeLink>
      ) : null}
    </div>
  );
}
