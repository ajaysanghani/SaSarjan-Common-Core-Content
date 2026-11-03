import type { ReactNode } from "react";
import type { Cta, IntroductionContent, LinkComponent, SiteConfig } from "../config/types";
import { introductionContent } from "../content/introduction";
import { cx } from "../lib/resolve";
import { EcosystemLinks } from "./EcosystemLinks";
import { SharedPageLayout } from "./SharedPageLayout";

export interface IntroductionPageProps {
  site: SiteConfig;
  /** Replaces `site.introduction.ctas`. */
  ctas?: Cta[];
  /** Replaces the shared copy, e.g. with a translation. */
  content?: IntroductionContent;
  /** Site-specific content, rendered after the ecosystem directory. */
  children?: ReactNode;
  linkComponent?: LinkComponent;
  as?: "article" | "div" | "main";
  className?: string;
}

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
