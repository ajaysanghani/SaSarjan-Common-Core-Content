import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteIds } from "../src/config";
import { EcosystemIcon, SharedFooter, ecosystemMessaging, ecosystemSites, footerContent } from "../src";
import type { FooterVariant, Labels, SiteConfig, SiteId } from "../src";

const hindiLabels: Partial<Labels> = {
  ecosystemHeading: "सर्जन पारिस्थितिकी तंत्र",
  directoryHeading: "सर्जन पारिस्थितिकी तंत्र को जानें",
  currentSite: "आप यहाँ हैं",
  becomeCoCreator: "सह-सर्जक बनें",
  aboutEcosystem: "पारिस्थितिकी तंत्र के बारे में",
};

const { approach, mission } = ecosystemMessaging.hierarchy;
const { body, summary } = ecosystemMessaging.introduction;

function config(siteId: SiteId, options: { cocreator?: boolean; hindi?: boolean } = {}): SiteConfig {
  return {
    siteId,
    ...(options.cocreator ? { cocreator: { href: "/cocreate" } } : {}),
    ...(options.hindi ? { labels: hindiLabels } : {}),
  };
}

/** Renders a footer and returns its root landmark, checking it is the only one of its kind. */
function renderFooter(variant: FooterVariant, site: SiteConfig, extra: { condensed?: boolean } = {}) {
  const { container } = render(<SharedFooter site={site} variant={variant} year={2026} {...extra} />);
  const ecosystemHeading = site.labels?.ecosystemHeading ?? "The SaSarjan ecosystem";
  if (variant === "full") {
    expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
    expect(screen.queryAllByRole("region")).toHaveLength(0);
    expect(container.querySelectorAll("footer")).toHaveLength(1);
    expect(container.querySelectorAll("section")).toHaveLength(0);
    return { root: screen.getByRole("contentinfo"), container };
  }
  expect(screen.queryAllByRole("contentinfo")).toHaveLength(0);
  expect(screen.getAllByRole("region")).toHaveLength(1);
  expect(container.querySelectorAll("footer")).toHaveLength(0);
  return { root: screen.getByRole("region", { name: ecosystemHeading }), container };
}

const matrix = siteIds.flatMap((siteId) =>
  (["full", "band"] as const).flatMap((variant) =>
    [false, true].flatMap((cocreator) =>
      [false, true].map((hindi) => ({ siteId, variant, cocreator, hindi })),
    ),
  ),
);

describe("SharedFooter: every site, variant, CoCreator setting and label language", () => {
  it.each(matrix)(
    "$siteId $variant (cocreator: $cocreator, hindi: $hindi)",
    ({ siteId, variant, cocreator, hindi }) => {
      const site = config(siteId, { cocreator, hindi });
      const { root } = renderFooter(variant, site);
      const directoryHeading = hindi ? hindiLabels.directoryHeading! : "Explore the SaSarjan Ecosystem";
      const currentLabel = hindi ? hindiLabels.currentSite! : "You are here";
      const ctaLabel = hindi ? hindiLabels.becomeCoCreator! : "Become a CoCreator";

      // Directory: all seven initiatives, labelled by its visible heading.
      const directory = within(root).getByRole("navigation", { name: directoryHeading });
      expect(
        within(directory).getByRole("heading", { level: 2, name: directoryHeading }),
      ).toBeInTheDocument();
      const items = within(directory).getAllByRole("listitem");
      expect(items).toHaveLength(7);
      const links = within(directory).getAllByRole("link");
      expect(links.map((link) => link.getAttribute("href"))).toEqual(ecosystemSites.map((s) => s.url));

      // Name and headline on every entry; SaSarjan leads.
      ecosystemSites.forEach((entry, i) => {
        expect(links[i]).toHaveTextContent(entry.name);
        expect(links[i]).toHaveTextContent(entry.headline!);
      });
      expect(links[0]).toHaveTextContent("SaSarjan");

      // Exactly one current site, marked for assistive technology and visibly.
      const current = links.filter((link) => link.getAttribute("aria-current") === "true");
      expect(current).toHaveLength(1);
      expect(current[0]).toHaveAttribute("href", ecosystemSites.find((s) => s.id === siteId)!.url);
      expect(current[0]).toHaveTextContent(currentLabel);
      expect(within(root).getAllByText(currentLabel)).toHaveLength(1);

      // One decorative icon per entry.
      const icons = directory.querySelectorAll("svg");
      expect(icons).toHaveLength(7);
      icons.forEach((icon) => expect(icon).toHaveAttribute("aria-hidden", "true"));

      // Brand line, with the Devanagari marked as Hindi.
      const native = within(root).getByText("स सर्जन");
      expect(native).toHaveAttribute("lang", "hi");
      expect(native.closest(".swc-footer__brand")).toHaveTextContent("SaSarjan | स सर्जन");

      // CoCreator call to action only when a destination is configured.
      const cta = within(root).queryByRole("link", { name: ctaLabel });
      if (cocreator) {
        expect(cta).toHaveAttribute("href", "/cocreate");
      } else {
        expect(cta).toBeNull();
        expect(within(root).queryByText(footerContent.cocreator!.heading)).toBeNull();
        expect(within(root).queryByText(footerContent.cocreator!.body)).toBeNull();
      }

      // The tagline appears once; the long introduction only in full.
      expect(within(root).getAllByText(approach)).toHaveLength(1);
      expect(within(root).getAllByText(mission)).toHaveLength(1);
      if (variant === "full") {
        expect(within(root).getByText(body)).toBeInTheDocument();
        if (cocreator) {
          expect(
            within(root).getByRole("heading", { name: footerContent.cocreator!.heading }),
          ).toBeInTheDocument();
          expect(within(root).getByText(footerContent.cocreator!.body)).toBeInTheDocument();
        }
      } else {
        expect(within(root).queryByText(body)).toBeNull();
      }

      // Closing: both lines in full (the summary only once), one line in band.
      expect(within(root).getAllByText(ecosystemMessaging.closingLine)).toHaveLength(1);
      expect(within(root).queryAllByText(summary)).toHaveLength(variant === "full" ? 1 : 0);
    },
  );
});

describe("SharedFooter: condensed", () => {
  it.each(["full", "band"] as const)("%s leaves out the tagline and the introduction", (variant) => {
    const { root } = renderFooter(
      variant,
      { siteId: "talentexcel", cocreator: { href: "/cocreate" } },
      {
        condensed: true,
      },
    );
    expect(root).toHaveClass("swc-footer--condensed");
    expect(within(root).queryByText(approach)).toBeNull();
    expect(within(root).queryByText(mission)).toBeNull();
    expect(within(root).queryByText(body)).toBeNull();
    expect(within(root).queryByRole("link", { name: "About the ecosystem" })).toBeNull();
    // The rest stays.
    expect(within(root).getByText("स सर्जन")).toBeInTheDocument();
    expect(within(root).getAllByRole("listitem").length).toBeGreaterThanOrEqual(7);
    expect(within(root).getByRole("link", { name: "Become a CoCreator" })).toBeInTheDocument();
    expect(within(root).getByText(ecosystemMessaging.closingLine)).toBeInTheDocument();
  });

  it("wins over sections that turn the tagline on", () => {
    const { root } = renderFooter(
      "full",
      { siteId: "itvidya", footer: { sections: { tagline: true, introduction: true } } },
      { condensed: true },
    );
    expect(within(root).queryByText(approach)).toBeNull();
    expect(within(root).queryByText(body)).toBeNull();
    // Full keeps the site name and both closing lines.
    expect(within(root).getByText("IT Vidya", { selector: ".swc-footer__site" })).toBeInTheDocument();
    expect(within(root).getByText(summary)).toBeInTheDocument();
  });
});

describe("SharedFooter: sections", () => {
  it.each(["full", "band"] as const)("%s hides each new block when it is turned off", (variant) => {
    const { root } = renderFooter(variant, {
      siteId: "sevapremi",
      cocreator: { href: "/cocreate" },
      footer: {
        sections: { brand: false, tagline: false, introduction: false, cocreator: false, closing: false },
      },
    });
    expect(within(root).queryByText("स सर्जन")).toBeNull();
    expect(within(root).queryByText(approach)).toBeNull();
    expect(within(root).queryByText(body)).toBeNull();
    expect(within(root).queryByRole("link", { name: "Become a CoCreator" })).toBeNull();
    expect(within(root).queryByText(ecosystemMessaging.closingLine)).toBeNull();
    expect(
      within(root).getByRole("navigation", { name: "Explore the SaSarjan Ecosystem" }),
    ).toBeInTheDocument();
  });

  it("band shows the introduction when a site turns it on", () => {
    const { root } = renderFooter("band", {
      siteId: "nanhasitara",
      footer: { sections: { introduction: true } },
    });
    expect(within(root).getByText(body)).toBeInTheDocument();
    expect(within(root).getByText(ecosystemMessaging.hierarchy.participation)).toBeInTheDocument();
  });

  it("keeps the 0.1 meaning of ecosystemIntro: off also hides the tagline and introduction", () => {
    const { root } = renderFooter("full", {
      siteId: "incubator",
      footer: { sections: { ecosystemIntro: false } },
    });
    expect(within(root).queryByText(approach)).toBeNull();
    expect(within(root).queryByText(body)).toBeNull();
    expect(within(root).queryByRole("link", { name: "About the ecosystem" })).toBeNull();
    expect(root.querySelector(".swc-footer__site")).toBeNull();
    // The brand line has its own key.
    expect(within(root).getByText("स सर्जन")).toBeInTheDocument();
  });

  it("hides the directory with ecosystemLinks: false", () => {
    const { root } = renderFooter("band", {
      siteId: "sasarjan",
      footer: { sections: { ecosystemLinks: false } },
    });
    expect(within(root).queryByRole("navigation")).toBeNull();
    expect(within(root).getByText(approach)).toBeInTheDocument();
  });

  it("uses the configured CoCreator label and linkComponent", () => {
    const Link = ({
      href,
      children,
      className,
    }: {
      href: string;
      children?: React.ReactNode;
      className?: string;
    }) => (
      <a href={href} className={className} data-router-link="">
        {children}
      </a>
    );
    render(
      <SharedFooter
        variant="band"
        linkComponent={Link}
        site={{ siteId: "talentexcel", cocreator: { href: "/join", label: "Join as a CoCreator" } }}
      />,
    );
    expect(screen.getByRole("link", { name: "Join as a CoCreator" })).toHaveAttribute("data-router-link");
  });
});

describe("EcosystemIcon", () => {
  it.each(ecosystemSites.map((s) => s.icon!))("%s is a decorative 24px inline SVG", (icon) => {
    const { container } = render(<EcosystemIcon icon={icon} />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("stroke-width", "1.75");
    expect(svg.childElementCount).toBeGreaterThan(0);
  });
});
