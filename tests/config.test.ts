import { describe, expect, it } from "vitest";
import {
  SiteConfigError,
  defineSiteConfig,
  ecosystemSitesSchema,
  findDraftContent,
  validateSharedContent,
} from "../src/config";
import { ecosystemSites } from "../src/content/sites";
import type { SiteConfig } from "../src/config/types";

describe("defineSiteConfig", () => {
  it("returns a valid config unchanged", () => {
    const config = {
      siteId: "talentexcel",
      footer: {
        siteLinks: [{ heading: "TalentExcel", links: [{ label: "Login", href: "/login" }] }],
        policyLinks: [{ label: "Privacy", href: "/privacy" }],
        contactEmail: "hello@example.com",
        launchYear: 2024,
      },
      ecosystem: { openInNewTab: true, overrides: { sevapremi: { name: "सेवाप्रेमी" } } },
      introduction: { ctas: [{ label: "Join", href: "https://talentexcel.com/login", variant: "primary" }] },
      labels: { currentSite: "Current site" },
    } satisfies SiteConfig;

    expect(defineSiteConfig(config)).toBe(config);
  });

  it("rejects an unknown site id", () => {
    expect(() => defineSiteConfig({ siteId: "example" } as unknown as SiteConfig)).toThrow(SiteConfigError);
  });

  it("rejects unsafe links with a readable path", () => {
    let message = "";
    try {
      defineSiteConfig({
        siteId: "sasarjan",
        footer: {
          siteLinks: [{ heading: "Explore", links: [{ label: "Bad", href: "javascript:alert(1)" }] }],
        },
      });
    } catch (error) {
      message = (error as Error).message;
    }
    expect(message).toContain("Invalid @sasarjan/web-core site config");
    expect(message).toContain("footer.siteLinks[0].links[0].href");
    expect(message).toContain("Unsafe or unsupported link");
  });

  it("rejects an absolute ecosystemPath", () => {
    expect(() =>
      defineSiteConfig({ siteId: "itvidya", ecosystemPath: "https://itvidya.com/ecosystem" }),
    ).toThrow(/site-relative path/);
  });

  it("rejects unknown keys so typos are caught", () => {
    expect(() => defineSiteConfig({ siteId: "itvidya", footr: {} } as unknown as SiteConfig)).toThrow(
      SiteConfigError,
    );
  });

  it("rejects an invalid contact email but allows null", () => {
    expect(() => defineSiteConfig({ siteId: "incubator", footer: { contactEmail: "nope" } })).toThrow();
    expect(() => defineSiteConfig({ siteId: "incubator", footer: { contactEmail: null } })).not.toThrow();
  });
});

describe("shared content", () => {
  it("passes its own schemas", () => {
    expect(() => validateSharedContent()).not.toThrow();
  });

  it("has exactly the seven approved domains", () => {
    expect(ecosystemSites.map((s) => s.domain).sort()).toEqual([
      "10xgrowth.com",
      "incubator.in",
      "itvidya.com",
      "nanhasitara.com",
      "sasarjan.com",
      "sevapremi.com",
      "talentexcel.com",
    ]);
  });

  it("rejects a site whose url points at another domain", () => {
    const broken = ecosystemSites.map((s) => (s.id === "itvidya" ? { ...s, url: "https://example.com" } : s));
    expect(ecosystemSitesSchema.safeParse(broken).success).toBe(false);
  });

  it("rejects duplicate site ids", () => {
    const broken = [...ecosystemSites, ecosystemSites[0]];
    expect(ecosystemSitesSchema.safeParse(broken).success).toBe(false);
  });

  it("reports draft content for the release gate", () => {
    const drafts = findDraftContent();
    // Everything is draft until approved; see docs/CONTENT-GOVERNANCE.md.
    expect(drafts.map((d) => d.path)).toContain("introductionContent");
    expect(drafts.map((d) => d.path)).toContain("ecosystemSites.talentexcel");
  });
});
