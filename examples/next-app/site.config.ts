import { defineSiteConfig } from "@sasarjan/web-core/config";

// Validated at build time: an invalid value fails `next build` with a readable message.
export const site = defineSiteConfig({
  siteId: "itvidya",
  // Example destination only, to show the CoCreator block. Real sites leave this unset until a
  // destination is decided (content brief, D6), which hides the call to action.
  cocreator: { href: "/ecosystem" },
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
