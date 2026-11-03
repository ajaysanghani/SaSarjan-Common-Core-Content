import { defineSiteConfig } from "@sasarjan/web-core/config";

// Validated at build time: an invalid value fails `next build` with a readable message.
export const site = defineSiteConfig({
  siteId: "itvidya",
  footer: {
    siteLinks: [
      {
        heading: "IT Vidya",
        links: [
          { label: "Home", href: "/" },
          { label: "Ecosystem", href: "/ecosystem" },
        ],
      },
    ],
    policyLinks: [{ label: "Principles", href: "/principles" }],
    launchYear: 2025,
  },
  introduction: {
    ctas: [
      { label: "Start exploring", href: "/" },
      { label: "Visit SaSarjan", href: "https://sasarjan.com", variant: "secondary" },
    ],
  },
});
