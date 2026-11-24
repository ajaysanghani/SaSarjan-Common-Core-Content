import type { ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  IntroductionPage,
  SharedFooter,
  ecosystemMessaging,
  ecosystemSites,
  introductionContent,
  introductionMetadata,
} from "../src";
import type { IntroductionContent, SiteConfig, SiteId } from "../src";
import { siteIds } from "../src/config";

const content = introductionContent;
const { vision, cocreation, initiatives } = content;
// The eight-section content is complete in the package; these narrow the optional fields.
const hero = content.hero!;
const systems = content.systems!;
const participation = content.participation!;
const cocreator = content.cocreator!;
const closing = content.closing!;

const nanhasitara: SiteConfig = { siteId: "nanhasitara" };
const withCoCreator: SiteConfig = { siteId: "talentexcel", cocreator: { href: "/cocreate" } };

function cards() {
  const region = screen.getByRole("region", { name: initiatives.title });
  return within(region)
    .getAllByRole("listitem")
    .filter((li) => li.classList.contains("swc-intro__card"));
}

describe("IntroductionPage, eight sections", () => {
  it("renders exactly one h1: the hero headline", () => {
    render(<IntroductionPage site={nanhasitara} />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(hero.headline);
  });

  it("renders the hero with its eyebrow, sub-line and the common introduction", () => {
    const { container } = render(<IntroductionPage site={nanhasitara} />);
    const header = container.querySelector(".swc-page__header")!;
    expect(within(header as HTMLElement).getByText(hero.eyebrow)).toBeInTheDocument();
    expect(within(header as HTMLElement).getByText(hero.subline)).toBeInTheDocument();
    for (const paragraph of content.lead) {
      expect(within(header as HTMLElement).getByText(paragraph)).toBeInTheDocument();
    }
    expect(
      within(header as HTMLElement).getByRole("link", { name: "Explore Our Initiatives" }),
    ).toHaveAttribute("href", `#${initiatives.id}`);
  });

  it("renders all eight sections in the brief's order", () => {
    const { container } = render(<IntroductionPage site={nanhasitara} />);
    const order = [
      container.querySelector(".swc-page__header"),
      ...[vision, cocreation, initiatives, systems, participation, cocreator].map((section) =>
        screen.getByRole("region", { name: section.title }),
      ),
      container.querySelector(`#${closing.id}`),
    ];
    expect(order.every(Boolean)).toBe(true);
    for (let i = 1; i < order.length; i++) {
      expect(
        order[i - 1]!.compareDocumentPosition(order[i]!) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("labels every section by its own h2", () => {
    const { container } = render(<IntroductionPage site={nanhasitara} />);
    const sections = container.querySelectorAll("section");
    expect(sections).toHaveLength(6);
    for (const section of sections) {
      const title = container.querySelector(`#${section.getAttribute("aria-labelledby")}`);
      expect(title?.tagName).toBe("H2");
      expect(section).toContainElement(title as HTMLElement);
    }
  });

  it("never skips a heading level", () => {
    const { container } = render(<IntroductionPage site={nanhasitara} />);
    const levels = [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i++) expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1);
  });

  it("shows the vision's four dimensions and the eight CoCreation participants", () => {
    render(<IntroductionPage site={nanhasitara} />);
    const visionRegion = screen.getByRole("region", { name: vision.title });
    const dimensions = within(visionRegion).getByRole("list", { name: vision.itemsLabel });
    expect(
      within(dimensions)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(vision.items!.map((item) => item.title));

    const cocreationRegion = screen.getByRole("region", { name: cocreation.title });
    const participants = within(cocreationRegion).getByRole("list", { name: cocreation.itemsLabel });
    expect(within(participants).getAllByRole("listitem")).toHaveLength(8);
    for (const item of cocreation.items!) {
      expect(within(participants).getByText(item.text!)).toBeInTheDocument();
    }
  });

  it("renders seven initiative cards with category, headline, positioning, focus areas and a link", () => {
    render(<IntroductionPage site={nanhasitara} />);
    const list = cards();
    expect(list).toHaveLength(7);
    list.forEach((card, i) => {
      const site = ecosystemSites[i]!;
      const scoped = within(card);
      expect(scoped.getByRole("heading", { level: 3 })).toHaveTextContent(site.name);
      expect(card.querySelector(".swc-intro__card-category")).toHaveTextContent(site.category!);
      expect(scoped.getByText(site.headline!)).toBeInTheDocument();
      expect(scoped.getByText(site.positioning!)).toBeInTheDocument();
      const chips = [...card.querySelectorAll(".swc-intro__chip")].map((chip) => chip.textContent);
      expect(chips).toEqual(site.focusAreas);
      const link = scoped.getByRole("link", { name: new RegExp(`^Explore website ${site.domain}`) });
      expect(link).toHaveAttribute("href", site.url);
      expect(card.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("marks SaSarjan as the framework and gives its native name a lang", () => {
    render(<IntroductionPage site={nanhasitara} />);
    const framework = cards().filter((card) => card.classList.contains("swc-intro__card--framework"));
    expect(framework).toHaveLength(1);
    expect(within(framework[0]!).getByText("Overarching framework")).toBeInTheDocument();
    expect(within(framework[0]!).getByText("स सर्जन")).toHaveAttribute("lang", "hi");
  });

  it("collapses long focus-area lists into a native disclosure", () => {
    render(<IntroductionPage site={nanhasitara} />);
    const seva = cards().find((card) => within(card).queryByRole("heading", { name: "SevaPremi" }))!;
    const details = seva.querySelector("details")!;
    expect(details).not.toHaveAttribute("open");
    expect(details.querySelector("summary")).toHaveTextContent("7 more");
    expect(details.querySelectorAll("li")).toHaveLength(7);
  });

  it("draws the systems diagram as ordered lists under labelled tiers", () => {
    render(<IntroductionPage site={nanhasitara} />);
    const region = screen.getByRole("region", { name: systems.title });
    const down = within(region).getByRole("list", { name: /SaSarjan: Top-down systems redesign/ });
    const up = within(region).getByRole("list", { name: /SevaPremi: Bottom-up community development/ });
    expect(down.tagName).toBe("OL");
    expect(up.tagName).toBe("OL");
    expect(
      within(down)
        .getAllByRole("listitem")
        .map((li) => li.textContent),
    ).toEqual(systems.topDown.levels);
    expect(
      within(up)
        .getAllByRole("listitem")
        .map((li) => li.textContent),
    ).toEqual(systems.bottomUp.levels);
    expect(within(region).getByText(systems.connection)).toBeInTheDocument();
    const supporting = within(region).getByRole("list", { name: systems.supportingTitle });
    expect(within(supporting).getAllByRole("listitem")).toHaveLength(5);
    for (const entry of systems.supporting)
      expect(within(supporting).getByText(entry.text)).toBeInTheDocument();
    // No images, canvas or text inside SVG.
    expect(region.querySelector("img, canvas, svg text")).toBeNull();
  });

  it("presents the five participation pathways as an unordered set", () => {
    render(<IntroductionPage site={nanhasitara} />);
    const region = screen.getByRole("region", { name: participation.title });
    const list = within(region).getByRole("list", { name: participation.itemsLabel });
    expect(list.tagName).toBe("UL");
    expect(
      within(list)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(["Learn", "Earn", "Lead", "Inspire", "CoCreate"]);
  });

  it("lists who can take part and the ways to contribute", () => {
    render(<IntroductionPage site={nanhasitara} />);
    const region = screen.getByRole("region", { name: cocreator.title });
    expect(
      within(region).getByRole("heading", { level: 3, name: cocreator.audiencesHeading }),
    ).toBeInTheDocument();
    for (const audience of cocreator.audiences)
      expect(within(region).getByText(audience)).toBeInTheDocument();
    for (const pathway of cocreator.pathways) expect(within(region).getByText(pathway)).toBeInTheDocument();
  });

  it("ends with the closing lines", () => {
    const { container } = render(<IntroductionPage site={nanhasitara} />);
    const lines = [...container.querySelectorAll(`#${closing.id} p`)].map((p) => p.textContent);
    expect(lines).toEqual(closing.lines);
    expect(lines.at(-1)).toBe(ecosystemMessaging.closingLine);
  });
});

describe("IntroductionPage CoCreator call to action", () => {
  it("is hidden everywhere when the site sets no destination", () => {
    render(<IntroductionPage site={nanhasitara} />);
    expect(screen.queryByRole("link", { name: /Become a CoCreator/ })).toBeNull();
    // The section's content still renders.
    expect(screen.getByRole("region", { name: cocreator.title })).toBeInTheDocument();
  });

  it("appears in the hero and in section 7 when configured", () => {
    render(<IntroductionPage site={withCoCreator} />);
    const links = screen.getAllByRole("link", { name: "Become a CoCreator" });
    expect(links).toHaveLength(2);
    for (const link of links) expect(link).toHaveAttribute("href", "/cocreate");
    const region = screen.getByRole("region", { name: cocreator.title });
    expect(region).toContainElement(links[1]!);
  });

  it("uses the configured label", () => {
    render(<IntroductionPage site={{ siteId: "itvidya", cocreator: { href: "/join", label: "Join us" } }} />);
    expect(screen.getAllByRole("link", { name: "Join us" })).toHaveLength(2);
  });
});

describe("IntroductionPage anchors", () => {
  it("has unique swc- ids, and every in-page link points at one", () => {
    const { container } = render(<IntroductionPage site={withCoCreator} />);
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^swc-/);

    const anchors = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
    expect(anchors.length).toBeGreaterThan(0);
    for (const anchor of anchors) {
      const target = anchor.getAttribute("href")!.slice(1);
      expect(container.querySelector(`[id="${target}"]`)).not.toBeNull();
    }
    for (const el of container.querySelectorAll("[aria-labelledby]")) {
      for (const ref of el.getAttribute("aria-labelledby")!.split(" ")) {
        expect(container.querySelector(`[id="${ref}"]`)).not.toBeNull();
      }
    }
  });
});

describe.each(siteIds)("IntroductionPage on %s", (siteId: SiteId) => {
  it("lists all seven initiatives and marks only this site as current", () => {
    render(<IntroductionPage site={{ siteId }} />);
    const list = cards();
    expect(list).toHaveLength(7);
    const current = list.filter((card) => card.classList.contains("swc-intro__card--current"));
    expect(current).toHaveLength(1);
    const site = ecosystemSites.find((s) => s.id === siteId)!;
    expect(within(current[0]!).getByRole("heading", { level: 3 })).toHaveTextContent(site.name);
    expect(within(current[0]!).getByText("You are here")).toBeInTheDocument();
    expect(within(current[0]!).getByRole("link")).toHaveAttribute("aria-current", "true");
    expect(screen.getAllByText("You are here")).toHaveLength(1);
  });
});

describe("IntroductionPage with site options", () => {
  it("keeps site CTAs and children, after section 7 and before the closing", () => {
    const { container } = render(
      <IntroductionPage
        site={{
          siteId: "talentexcel",
          introduction: {
            ctas: [
              { label: "See how TalentExcel works", href: "/welcome", variant: "primary" },
              { label: "View plans", href: "/plans", variant: "secondary" },
            ],
          },
        }}
      >
        <p>TalentExcel in the ecosystem.</p>
      </IntroductionPage>,
    );
    const block = container.querySelector(".swc-intro__site")!;
    expect(within(block as HTMLElement).getByText("TalentExcel in the ecosystem.")).toBeInTheDocument();
    expect(within(block as HTMLElement).getByRole("link", { name: "See how TalentExcel works" })).toHaveClass(
      "swc-btn--primary",
    );
    expect(within(block as HTMLElement).getByRole("link", { name: "View plans" })).toHaveClass(
      "swc-btn--secondary",
    );
    const section7 = screen.getByRole("region", { name: cocreator.title });
    const closingEl = container.querySelector(`#${closing.id}`)!;
    expect(section7.compareDocumentPosition(block) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(block.compareDocumentPosition(closingEl) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("the ctas prop replaces the site's CTAs", () => {
    render(
      <IntroductionPage
        site={{ siteId: "talentexcel", introduction: { ctas: [{ label: "Old", href: "/old" }] } }}
        ctas={[{ label: "New", href: "/new" }]}
      />,
    );
    expect(screen.queryByRole("link", { name: "Old" })).toBeNull();
    expect(screen.getByRole("link", { name: "New" })).toHaveAttribute("href", "/new");
  });

  it("uses the linkComponent for site-relative links only", () => {
    const Link = vi.fn(
      ({ href, children, className }: { href: string; children?: ReactNode; className?: string }) => (
        <a href={href} className={className} data-router-link="">
          {children}
        </a>
      ),
    );
    render(<IntroductionPage site={withCoCreator} linkComponent={Link} />);
    for (const link of screen.getAllByRole("link", { name: "Become a CoCreator" })) {
      expect(link).toHaveAttribute("data-router-link");
    }
    expect(screen.getByRole("link", { name: /Explore website sasarjan\.com/ })).not.toHaveAttribute(
      "data-router-link",
    );
  });

  it("opens sister sites in a new tab when configured, except the current site", () => {
    render(<IntroductionPage site={{ siteId: "10xgrowth", ecosystem: { openInNewTab: true } }} />);
    const sister = screen.getByRole("link", { name: /Explore website incubator\.in/ });
    expect(sister).toHaveAttribute("target", "_blank");
    expect(sister).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: /Explore website 10xgrowth\.com/ })).not.toHaveAttribute(
      "target",
    );
  });

  it("applies site overrides and labels", () => {
    render(
      <IntroductionPage
        site={{
          siteId: "sevapremi",
          ecosystem: { overrides: { sevapremi: { name: "सेवाप्रेमी", headline: "बदलाव" } } },
          labels: {
            exploreWebsite: "वेबसाइट देखें",
            exploreInitiatives: "पहल देखें",
            moreFocusAreas: "{count} और",
          },
        }}
      />,
    );
    expect(screen.getByRole("heading", { level: 3, name: "सेवाप्रेमी" })).toBeInTheDocument();
    expect(screen.getByText("बदलाव")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "पहल देखें" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /^वेबसाइट देखें/ })).toHaveLength(7);
    expect(screen.getAllByText("7 और")).toHaveLength(1);
  });
});

describe("tagline repetition on /ecosystem", () => {
  const count = (text: string, needle: string) => text.split(needle).length - 1;

  it("shows the tagline pair at most twice, counting the condensed footer", () => {
    const { container } = render(
      <>
        <IntroductionPage site={withCoCreator} />
        <SharedFooter site={withCoCreator} condensed year={2026} />
      </>,
    );
    const text = container.textContent ?? "";
    const { approach, mission } = ecosystemMessaging.hierarchy;
    expect(count(text, approach)).toBeLessThanOrEqual(2);
    expect(count(text, mission)).toBeLessThanOrEqual(2);
  });
});

describe("IntroductionPage with 0.1-shape content", () => {
  const oldShape = {
    status: "draft",
    eyebrow: "पारिस्थितिकी तंत्र",
    title: "साथ मिलकर",
    lead: ["पहला अनुच्छेद।"],
    vision: { id: "vision", title: "दृष्टि", paragraphs: ["सामूहिक समृद्धि।"] },
    cocreation: { id: "cocreation", title: "सह-सृजन", paragraphs: [] },
    initiatives: { id: "initiatives", title: "पहल", paragraphs: [] },
  } satisfies IntroductionContent;

  it("renders the 0.1 layout: title as h1, three sections and the directory grid", () => {
    const { container } = render(
      <IntroductionPage
        site={{ siteId: "sevapremi", cocreator: { href: "/cocreate" } }}
        content={oldShape}
      />,
    );
    expect(container.firstElementChild).not.toHaveClass("swc-intro--extended");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "साथ मिलकर" })).toBeInTheDocument();
    expect(container.querySelectorAll("section")).toHaveLength(3);
    expect(screen.getByRole("navigation", { name: "SaSarjan ecosystem" })).toHaveClass("swc-eco--grid");
    // None of the 0.2 additions.
    expect(screen.queryByRole("link", { name: "Explore Our Initiatives" })).toBeNull();
    expect(screen.queryByRole("link", { name: /Become a CoCreator/ })).toBeNull();
    expect(container.querySelector(".swc-sys, .swc-paths, .swc-intro__closing, details")).toBeNull();
  });

  it("renders the site's CTAs after the sections, as in 0.1", () => {
    const { container } = render(
      <IntroductionPage
        site={{ siteId: "sevapremi", introduction: { ctas: [{ label: "Join", href: "/join" }] } }}
        content={oldShape}
      />,
    );
    const row = container.querySelector(".swc-cta-row")!;
    expect(row.parentElement).toBe(container.firstElementChild);
    expect(within(row as HTMLElement).getByRole("link", { name: "Join" })).toBeInTheDocument();
  });
});

describe("introductionMetadata", () => {
  it("exports the brief's SEO title and description as plain data", () => {
    expect(introductionMetadata).toEqual({
      title: "The SaSarjan Ecosystem: CoCreating the Future, Together",
      description:
        "Seven interconnected initiatives uniting youth, professionals, experts, entrepreneurs, institutions, communities, funders and AI to advance Collective Prosperity.",
    });
    expect(introductionContent.seo).toBe(introductionMetadata);
  });
});
