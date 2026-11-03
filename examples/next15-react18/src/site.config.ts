import { defineSiteConfig } from "@sasarjan/web-core/config";

export const site = defineSiteConfig({
  siteId: "10xgrowth",
  footer: {
    siteLinks: [
      {
        heading: "Explore",
        links: [
          { label: "Home", href: "/" },
          { label: "Ecosystem", href: "/ecosystem" },
        ],
      },
    ],
    policyLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  ecosystem: { openInNewTab: true },
});
