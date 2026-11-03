import type { ReactNode } from "react";
import type { LinkComponent } from "../config/types";
import { classifyHref } from "../lib/url";

export interface SafeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Open external links in a new tab. Ignored for site-relative, mailto: and tel: links. */
  newTab?: boolean;
  /** Screen-reader text appended to links that open in a new tab. */
  newTabLabel?: string;
  /** Used for site-relative links, e.g. `next/link`. */
  linkComponent?: LinkComponent;
  ariaCurrent?: "page" | "true";
}

/**
 * Renders a link only when its href passes the URL allowlist; an unsafe href renders the label as
 * plain text, so a bad config value can never produce a `javascript:` link.
 */
export function SafeLink({
  href,
  children,
  className,
  newTab = false,
  newTabLabel = "(opens in a new tab)",
  linkComponent: Link,
  ariaCurrent,
}: SafeLinkProps) {
  const kind = classifyHref(href);

  if (kind === null) {
    if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {
      console.warn(`[@sasarjan/web-core] Ignored unsafe link href: ${JSON.stringify(href)}`);
    }
    return <span className={className}>{children}</span>;
  }

  if (kind === "internal" && Link) {
    return (
      <Link href={href} className={className} aria-current={ariaCurrent}>
        {children}
      </Link>
    );
  }

  if (kind === "external" && newTab) {
    return (
      <a
        href={href}
        className={className}
        aria-current={ariaCurrent}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className="swc-sr-only"> {newTabLabel}</span>
      </a>
    );
  }

  return (
    <a href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  );
}
