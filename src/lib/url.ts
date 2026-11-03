export type HrefKind = "internal" | "external" | "mailto" | "tel";

// Browsers strip tabs and newlines from URLs, so `java\tscript:` must be rejected, not normalised.
// eslint-disable-next-line no-control-regex
const CONTROL_OR_SPACE = /[\s\u0000-\u001f\u007f]/;
const EMAIL = /^[^\s@/?#]+@[^\s@/?#]+\.[^\s@/?#]+$/;
const PHONE = /^\+?[0-9][0-9()-]{3,}$/;

/**
 * Classifies an href, or returns null when it is unsafe or unsupported.
 *
 * Allowed: site-relative paths (`/x`), fragments (`#x`), absolute `https:` URLs without
 * credentials, `mailto:` with one address, and `tel:` numbers. Everything else is rejected,
 * including `javascript:`, `data:`, plain `http:`, protocol-relative `//host` and bare words.
 */
export function classifyHref(href: string): HrefKind | null {
  if (typeof href !== "string" || href.length === 0 || href.length > 2048) return null;
  if (CONTROL_OR_SPACE.test(href)) return null;

  if (href.startsWith("#")) return "internal";
  if (href.startsWith("/")) {
    // `//host` and `/\host` are treated by browsers as links to another host.
    return href.startsWith("//") || href.startsWith("/\\") ? null : "internal";
  }

  const lower = href.toLowerCase();
  if (lower.startsWith("mailto:")) {
    const address = decodeSafe(href.slice(7).split("?")[0] ?? "");
    return address && EMAIL.test(address) ? "mailto" : null;
  }
  if (lower.startsWith("tel:")) {
    return PHONE.test(decodeSafe(href.slice(4)) ?? "") ? "tel" : null;
  }

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || !url.hostname || url.username || url.password) return null;
  return "external";
}

export function isSafeHref(href: string): boolean {
  return classifyHref(href) !== null;
}

/** `https://www.Example.com/x` → `example.com`. Returns null for anything that is not https. */
export function hostOf(href: string): string | null {
  if (classifyHref(href) !== "external") return null;
  return new URL(href).hostname.toLowerCase().replace(/^www\./, "");
}

function decodeSafe(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}
