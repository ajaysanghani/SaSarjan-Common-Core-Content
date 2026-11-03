import type { ReactNode } from "react";
import type { Cta, LinkComponent } from "../config/types";
import { cx } from "../lib/resolve";
import { SafeLink } from "./SafeLink";

export interface PageSection {
  /** Used as the section's DOM id and for `aria-labelledby`. */
  id: string;
  title: string;
  /** Paragraph strings, or any React content. */
  body: string[] | ReactNode;
}

export interface SharedPageLayoutProps {
  title: string;
  eyebrow?: string;
  intro?: string[] | ReactNode;
  sections?: PageSection[];
  ctas?: Cta[];
  /** Rendered after the sections and before the call-to-action row. */
  children?: ReactNode;
  linkComponent?: LinkComponent;
  /** Root element. Use `div` when the site's own layout already provides `<main>`/`<article>`. */
  as?: "article" | "div" | "main";
  className?: string;
}

/**
 * An optional page scaffold: title, introduction, titled sections and a CTA row. It renders an
 * `<h1>`, so use it for the page's main content only. Sites are free to use their own layout instead.
 */
export function SharedPageLayout({
  title,
  eyebrow,
  intro,
  sections = [],
  ctas = [],
  children,
  linkComponent,
  as: Root = "article",
  className,
}: SharedPageLayoutProps) {
  return (
    <Root className={cx("swc-root swc-page", className)}>
      <header className="swc-page__header">
        {eyebrow ? <p className="swc-page__eyebrow">{eyebrow}</p> : null}
        <h1 className="swc-page__title">{title}</h1>
        {intro ? <div className="swc-page__intro">{renderBody(intro)}</div> : null}
      </header>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-title`}
          className="swc-page__section"
        >
          <h2 id={`${section.id}-title`} className="swc-page__section-title">
            {section.title}
          </h2>
          <div className="swc-page__body">{renderBody(section.body)}</div>
        </section>
      ))}

      {children}

      {ctas.length > 0 ? <CtaRow ctas={ctas} linkComponent={linkComponent} /> : null}
    </Root>
  );
}

export function CtaRow({ ctas, linkComponent }: { ctas: Cta[]; linkComponent?: LinkComponent }) {
  return (
    <div className="swc-cta-row">
      {ctas.map((cta) => (
        <SafeLink
          key={`${cta.href}|${cta.label}`}
          href={cta.href}
          linkComponent={linkComponent}
          className={cx("swc-btn", cta.variant === "secondary" ? "swc-btn--secondary" : "swc-btn--primary")}
        >
          {cta.label}
        </SafeLink>
      ))}
    </div>
  );
}

function renderBody(body: string[] | ReactNode): ReactNode {
  if (Array.isArray(body) && body.every((item) => typeof item === "string")) {
    return body.map((paragraph, i) => <p key={i}>{paragraph}</p>);
  }
  return body;
}
