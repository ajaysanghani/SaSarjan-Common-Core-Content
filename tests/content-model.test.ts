import { describe, expect, it } from "vitest";
import {
  SiteConfigError,
  defineSiteConfig,
  ecosystemIconKeys,
  ecosystemMessagingSchema,
  ecosystemSitesSchema,
  findDraftContent,
  footerContentSchema,
  introductionContentSchema,
  labelsSchema,
  siteIds,
} from "../src/config";
import {
  defaultLabels,
  ecosystemMessaging,
  ecosystemSites,
  footerContent,
  introductionContent,
} from "../src";
import type { EcosystemSite, FooterContent, IntroductionContent, Labels, SiteConfig } from "../src";
import { resolveLabels, resolveSites } from "../src/lib/resolve";

const siteSchema = ecosystemSitesSchema.element;
const sasarjan = ecosystemSites.find((s) => s.id === "sasarjan") as EcosystemSite;

/** Replaces one site in the shared directory and validates the result. */
function parseWith(id: string, patch: Record<string, unknown>) {
  return ecosystemSitesSchema.safeParse(ecosystemSites.map((s) => (s.id === id ? { ...s, ...patch } : s)));
}

describe("ecosystem sites: new fields", () => {
  it.each(siteIds)("%s parses and has every v0.2 field", (id) => {
    const site = ecosystemSites.find((s) => s.id === id) as EcosystemSite;
    expect(siteSchema.safeParse(site).success).toBe(true);
    expect(site.headline).toBeTruthy();
    expect(site.positioning).toBeTruthy();
    expect(site.focusAreas?.length).toBeGreaterThan(0);
    expect(site.category).toBeTruthy();
    expect(ecosystemIconKeys).toContain(site.icon);
    expect(site.role).toBeDefined();
    expect(site.status).toBe("approved");
  });

  it("all seven sites parse together, each with its own icon", () => {
    expect(ecosystemSitesSchema.safeParse(ecosystemSites).success).toBe(true);
    expect(new Set(ecosystemSites.map((s) => s.icon)).size).toBe(7);
  });

  it("lists the initiatives in the brief's order", () => {
    expect(ecosystemSites.map((s) => s.id)).toEqual([
      "sasarjan",
      "talentexcel",
      "10xgrowth",
      "sevapremi",
      "itvidya",
      "incubator",
      "nanhasitara",
    ]);
  });

  it.each(siteIds)("%s: description is the first sentence of positioning", (id) => {
    const site = ecosystemSites.find((s) => s.id === id) as EcosystemSite;
    const firstSentence = site.positioning?.match(/^.*?\.(?=\s|$)/)?.[0];
    expect(site.description).toBe(firstSentence);
  });

  it("marks SaSarjan, and only SaSarjan, as the framework, with its native name", () => {
    expect(ecosystemSites.filter((s) => s.role === "framework").map((s) => s.id)).toEqual(["sasarjan"]);
    expect(sasarjan.nativeName).toBe("स सर्जन");
    expect(sasarjan.nativeNameLang).toBe("hi");
  });

  it("keeps the canonical URLs (decision D2)", () => {
    expect(ecosystemSites.find((s) => s.id === "sevapremi")?.url).toBe("https://www.sevapremi.com");
    expect(ecosystemSites.find((s) => s.id === "talentexcel")?.url).toBe("https://talentexcel.com");
  });

  it("still accepts a site entry in the 0.1 shape", () => {
    const oldShape = {
      id: "itvidya",
      name: "IT Vidya",
      domain: "itvidya.com",
      url: "https://itvidya.com",
      description: "Lifelong learning.",
      status: "draft",
    } satisfies EcosystemSite;
    expect(siteSchema.safeParse(oldShape).success).toBe(true);
  });

  it.each([
    ["an unknown icon", { icon: "rocket" }],
    ["an unknown role", { role: "parent" }],
    ["empty focus areas", { focusAreas: [] }],
    ["a blank focus area", { focusAreas: ["  "] }],
    ["a headline over 80 characters", { headline: "x".repeat(81) }],
    ["a blank category", { category: "" }],
    ["a native name without a language", { nativeName: "स सर्जन", nativeNameLang: undefined }],
    ["an invalid language tag", { nativeNameLang: "Hindi" }],
    ["an unknown key", { tagline: "Nope" }],
  ])("rejects %s", (_, patch) => {
    expect(parseWith("sasarjan", patch).success).toBe(false);
  });

  it("rejects a second framework", () => {
    expect(parseWith("sevapremi", { role: "framework" }).success).toBe(false);
  });
});

describe("messaging hierarchy", () => {
  it("passes its schema and holds the brief's copy", () => {
    expect(ecosystemMessagingSchema.safeParse(ecosystemMessaging).success).toBe(true);
    expect(ecosystemMessaging.hierarchy.approach).toBe("CoCreating the Future, Together.");
    expect(ecosystemMessaging.closingLine).toBe("SaSarjan – CoCreating Collective Prosperity.");
  });

  it("rejects missing or blank lines", () => {
    const missing = { ...ecosystemMessaging, closingLine: undefined };
    expect(ecosystemMessagingSchema.safeParse(missing).success).toBe(false);
    const blank = { ...ecosystemMessaging, hierarchy: { ...ecosystemMessaging.hierarchy, mission: " " } };
    expect(ecosystemMessagingSchema.safeParse(blank).success).toBe(false);
  });

  it("is referenced, not repeated, by the footer and page content", () => {
    const { hierarchy, introduction, closingLine } = ecosystemMessaging;
    expect(footerContent.closing).toEqual([closingLine, introduction.summary]);
    expect(introductionContent.hero).toEqual({
      eyebrow: hierarchy.approach,
      subline: hierarchy.mission,
      headline: hierarchy.participation,
    });
    expect(introductionContent.lead).toEqual([introduction.body, introduction.summary]);
    expect(introductionContent.closing?.lines).toEqual([hierarchy.approach, hierarchy.mission, closingLine]);
    expect(footerContent.brand).toEqual({ name: "SaSarjan", nativeName: "स सर्जन", nativeNameLang: "hi" });
  });

  it("is approved, so the draft gate does not report it", () => {
    expect(ecosystemMessaging.status).toBe("approved");
    expect(findDraftContent().map((d) => d.path)).not.toContain("ecosystemMessaging");
  });
});

describe("introduction content", () => {
  it("has all eight sections, with unique swc- ids", () => {
    const c = introductionContent;
    expect(c.hero && c.systems && c.participation && c.cocreator && c.closing).toBeTruthy();
    const ids = [
      c.vision.id,
      c.cocreation.id,
      c.initiatives.id,
      c.systems?.id,
      c.participation?.id,
      c.cocreator?.id,
      c.closing?.id,
    ];
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^swc-/);
  });

  it("keeps title and lead meaningful for site metadata", () => {
    expect(introductionContent.title.length).toBeGreaterThan(10);
    expect(introductionContent.lead[0]?.length).toBeGreaterThan(50);
  });

  it("has the brief's lists", () => {
    expect(introductionContent.vision.items).toHaveLength(4);
    expect(introductionContent.cocreation.items).toHaveLength(8);
    expect(introductionContent.participation?.items?.map((i) => i.title)).toEqual([
      "Learn",
      "Earn",
      "Lead",
      "Inspire",
      "CoCreate",
    ]);
    expect(introductionContent.systems?.topDown.levels).toEqual(["National", "State", "District"]);
    expect(introductionContent.systems?.bottomUp.levels).toEqual(["Village", "Ward", "Taluka", "Block"]);
    expect(introductionContent.systems?.supporting.map((s) => s.siteId).sort()).toEqual(
      ["10xgrowth", "incubator", "itvidya", "nanhasitara", "talentexcel"].sort(),
    );
  });

  it("still accepts content in the 0.1 shape", () => {
    const oldShape = {
      status: "draft",
      eyebrow: "Eyebrow",
      title: "Title",
      lead: ["Lead."],
      vision: { id: "vision", title: "Vision", paragraphs: ["Text."] },
      cocreation: { id: "cocreation", title: "CoCreation", paragraphs: [] },
      initiatives: { id: "initiatives", title: "Initiatives", paragraphs: [] },
    } satisfies IntroductionContent;
    expect(introductionContentSchema.safeParse(oldShape).success).toBe(true);
  });

  it.each([
    ["an invalid section id", { participation: { ...introductionContent.participation, id: "Bad Id" } }],
    ["empty items", { vision: { ...introductionContent.vision, items: [] } }],
    ["empty audiences", { cocreator: { ...introductionContent.cocreator, audiences: [] } }],
    [
      "a one-level tier",
      {
        systems: {
          ...introductionContent.systems,
          topDown: { siteId: "sasarjan", title: "T", levels: ["National"], focus: ["x"] },
        },
      },
    ],
    [
      "an unknown site in the diagram",
      { systems: { ...introductionContent.systems, supporting: [{ siteId: "example", text: "x" }] } },
    ],
    ["empty closing lines", { closing: { id: "swc-closing", lines: [] } }],
    ["an unknown hero key", { hero: { ...introductionContent.hero, cta: "Go" } }],
  ])("rejects %s", (_, patch) => {
    expect(introductionContentSchema.safeParse({ ...introductionContent, ...patch }).success).toBe(false);
  });
});

describe("footer content", () => {
  it("passes its schema with the new blocks", () => {
    expect(footerContentSchema.safeParse(footerContent).success).toBe(true);
    expect(footerContent.cocreator?.heading).toBe("Become a CoCreator");
    expect(footerContent.ecosystemBlurb).toBeTruthy();
  });

  it("still accepts content in the 0.1 shape", () => {
    const oldShape = {
      status: "draft",
      ecosystemBlurb: "Blurb.",
      contactEmail: null,
      copyrightHolder: null,
      policyLinks: [],
    } satisfies FooterContent;
    expect(footerContentSchema.safeParse(oldShape).success).toBe(true);
  });

  it.each([
    ["empty closing lines", { closing: [] }],
    ["a CoCreator block without a body", { cocreator: { heading: "Become a CoCreator" } }],
    ["a brand without a name", { brand: { nativeName: "स सर्जन" } }],
  ])("rejects %s", (_, patch) => {
    expect(footerContentSchema.safeParse({ ...footerContent, ...patch }).success).toBe(false);
  });
});

describe("SiteConfig.cocreator", () => {
  it("is optional: absent means the CTA is hidden", () => {
    const config: SiteConfig = defineSiteConfig({ siteId: "talentexcel" });
    expect(config.cocreator).toBeUndefined();
  });

  it.each(["/cocreate", "#join", "https://sasarjan.com/cocreate", "mailto:hello@example.com"])(
    "accepts %s",
    (href) => {
      expect(() => defineSiteConfig({ siteId: "sasarjan", cocreator: { href } })).not.toThrow();
    },
  );

  it("accepts a custom label", () => {
    const config = defineSiteConfig({
      siteId: "sevapremi",
      cocreator: { href: "/join", label: "सह-सृजक बनें" },
    });
    expect(config.cocreator?.label).toBe("सह-सृजक बनें");
  });

  it.each([
    "javascript:alert(1)",
    "http://sasarjan.com/cocreate",
    "//evil.example",
    "data:text/html,hi",
    " /cocreate",
  ])("rejects %s through the href allowlist", (href) => {
    let message = "";
    try {
      defineSiteConfig({ siteId: "sasarjan", cocreator: { href } });
    } catch (error) {
      expect(error).toBeInstanceOf(SiteConfigError);
      message = (error as Error).message;
    }
    expect(message).toContain("cocreator.href");
    expect(message).toContain("Unsafe or unsupported link");
  });

  it("rejects a blank label and unknown keys", () => {
    expect(() => defineSiteConfig({ siteId: "sasarjan", cocreator: { href: "/c", label: "" } })).toThrow();
    expect(() =>
      defineSiteConfig({ siteId: "sasarjan", cocreator: { href: "/c", url: "/c" } } as unknown as SiteConfig),
    ).toThrow(SiteConfigError);
  });
});

describe("ecosystem.overrides: new fields", () => {
  const hindi = {
    headline: "सीखें और कमाएँ।",
    positioning: "युवाओं और पेशेवरों के लिए सीखने का मंच।",
    focusAreas: ["कौशल विकास", "इंटर्नशिप"],
    category: "सीखना और अवसर",
  };

  it("accepts and applies translated headline, positioning, focus areas and category", () => {
    const config = defineSiteConfig({
      siteId: "sevapremi",
      ecosystem: { overrides: { talentexcel: hindi } },
    });
    const talentexcel = resolveSites({ overrides: config.ecosystem?.overrides }).find(
      (s) => s.id === "talentexcel",
    );
    expect(talentexcel).toMatchObject(hindi);
    expect(talentexcel?.url).toBe("https://talentexcel.com");
  });

  it("rejects empty focus areas and non-translatable keys", () => {
    expect(() =>
      defineSiteConfig({
        siteId: "sevapremi",
        ecosystem: { overrides: { talentexcel: { focusAreas: [] } } },
      }),
    ).toThrow(SiteConfigError);
    expect(() =>
      defineSiteConfig({
        siteId: "sevapremi",
        ecosystem: { overrides: { talentexcel: { url: "https://example.com" } } },
      } as unknown as SiteConfig),
    ).toThrow(SiteConfigError);
  });
});

describe("labels", () => {
  const newKeys = [
    "directoryHeading",
    "exploreWebsite",
    "exploreInitiatives",
    "becomeCoCreator",
    "focusAreas",
    "frameworkBadge",
  ] as const satisfies readonly (keyof Labels)[];

  it("has a default for every label, including the new ones", () => {
    expect(labelsSchema.safeParse(defaultLabels).success).toBe(true);
    for (const key of newKeys) expect(defaultLabels[key]).toBeTruthy();
    expect(defaultLabels.exploreWebsite).toBe("Explore website");
    expect(defaultLabels.becomeCoCreator).toBe("Become a CoCreator");
  });

  it("lets a site override every new label, e.g. in Hindi", () => {
    const labels = Object.fromEntries(newKeys.map((key) => [key, `हिंदी ${key}`])) as Partial<Labels>;
    const config = defineSiteConfig({ siteId: "sevapremi", labels });
    const resolved = resolveLabels(config);
    for (const key of newKeys) expect(resolved[key]).toBe(`हिंदी ${key}`);
    expect(resolved.currentSite).toBe(defaultLabels.currentSite);
  });

  it("keeps the default when an override is explicitly undefined", () => {
    expect(resolveLabels({ labels: { exploreWebsite: undefined } }).exploreWebsite).toBe("Explore website");
  });

  it("rejects a blank label", () => {
    expect(() => defineSiteConfig({ siteId: "sevapremi", labels: { exploreWebsite: " " } })).toThrow(
      SiteConfigError,
    );
  });

  it("still accepts a complete label set in the 0.1 shape", () => {
    const oldShape = {
      ecosystemNav: "a",
      ecosystemHeading: "b",
      currentSite: "c",
      opensInNewTab: "d",
      aboutEcosystem: "e",
      contactHeading: "f",
      policiesNav: "g",
      copyright: "h",
    } satisfies Labels;
    expect(labelsSchema.safeParse(oldShape).success).toBe(true);
  });
});

describe("published content hygiene", () => {
  it("contains no URLs or email addresses besides the sites' own canonical URLs", () => {
    const siteUrls = new Set(ecosystemSites.flatMap((s) => [s.url, s.domain, s.name]));
    const strings: string[] = [];
    const walk = (value: unknown) => {
      if (typeof value === "string") strings.push(value);
      else if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === "object") Object.values(value).forEach(walk);
    };
    walk([ecosystemSites, ecosystemMessaging, introductionContent, footerContent, defaultLabels]);
    const offending = strings.filter((s) => !siteUrls.has(s) && /https?:|www\.|@|\.(com|in|org)\b/.test(s));
    expect(offending).toEqual([]);
  });
});
