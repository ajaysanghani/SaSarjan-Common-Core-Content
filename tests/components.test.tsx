import type { ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EcosystemLinks, IntroductionPage, SafeLink, SharedFooter, SharedPageLayout } from "../src";
import type { SiteConfig } from "../src";

const talentexcel: SiteConfig = { siteId: "talentexcel" };

describe("EcosystemLinks", () => {
  it("lists all seven sites and marks the current one", () => {
    render(<EcosystemLinks site={talentexcel} />);
    const nav = screen.getByRole("navigation", { name: "SaSarjan ecosystem" });
    expect(within(nav).getAllByRole("listitem")).toHaveLength(7);

    const current = within(nav).getByRole("link", { name: /TalentExcel/ });
    expect(current).toHaveAttribute("aria-current", "true");
    expect(current).toHaveTextContent("You are here");
    expect(within(nav).getByRole("link", { name: /SevaPremi/ })).not.toHaveAttribute("aria-current");
  });

  it("can leave out the current site", () => {
    render(<EcosystemLinks site={{ siteId: "itvidya", ecosystem: { includeCurrentSite: false } }} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
    expect(screen.queryByRole("link", { name: /IT Vidya/ })).toBeNull();
  });

  it("opens sister sites in the same tab by default", () => {
    render(<EcosystemLinks site={talentexcel} />);
    for (const link of screen.getAllByRole("link")) {
      expect(link).not.toHaveAttribute("target");
      expect(link.getAttribute("href")).toMatch(/^https:\/\//);
    }
  });

  it("adds rel and screen-reader text when opening in a new tab, except for the current site", () => {
    render(<EcosystemLinks site={{ siteId: "sasarjan", ecosystem: { openInNewTab: true } }} />);
    const sister = screen.getByRole("link", { name: /Nanha Sitara/ });
    expect(sister).toHaveAttribute("target", "_blank");
    expect(sister).toHaveAttribute("rel", "noopener noreferrer");
    expect(sister).toHaveTextContent("(opens in a new tab)");
    expect(screen.getByRole("link", { name: /SaSarjan/ })).not.toHaveAttribute("target");
  });

  it("applies name overrides and custom labels", () => {
    render(
      <EcosystemLinks
        site={{
          siteId: "sevapremi",
          ecosystem: { overrides: { sevapremi: { name: "सेवाप्रेमी" } } },
          labels: { ecosystemNav: "इकोसिस्टम", currentSite: "आप यहाँ हैं" },
        }}
      />,
    );
    expect(screen.getByRole("navigation", { name: "इकोसिस्टम" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /सेवाप्रेमी/ })).toHaveTextContent("आप यहाँ हैं");
  });

  it("renders a heading at the requested level", () => {
    render(<EcosystemLinks site={talentexcel} heading="Our family" headingLevel={3} />);
    expect(screen.getByRole("heading", { level: 3, name: "Our family" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Our family" })).toBeInTheDocument();
  });
});

describe("SharedFooter", () => {
  it("renders a contentinfo landmark with the site name and copyright", () => {
    render(<SharedFooter site={talentexcel} year={2026} />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText("TalentExcel", { selector: ".swc-footer__site" })).toBeInTheDocument();
    expect(within(footer).getByText("© 2026 TalentExcel")).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "About the ecosystem" })).toHaveAttribute(
      "href",
      "/ecosystem",
    );
  });

  it("renders a copyright range from launchYear and honours copyrightHolder", () => {
    render(
      <SharedFooter
        site={{ siteId: "sasarjan", footer: { launchYear: 2024, copyrightHolder: "Example Trust" } }}
        year={2026}
      />,
    );
    expect(screen.getByText("© 2024–2026 Example Trust")).toBeInTheDocument();
  });

  it("renders the site's own link groups, policies and contact", () => {
    render(
      <SharedFooter
        year={2026}
        site={{
          siteId: "incubator",
          footer: {
            siteLinks: [
              { heading: "Directory", links: [{ label: "Organizations", href: "/organizations" }] },
            ],
            policyLinks: [{ label: "Privacy", href: "/privacy" }],
            contactEmail: "hello@example.com",
          },
        }}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Directory" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Organizations" })).toHaveAttribute("href", "/organizations");
    expect(screen.getByRole("navigation", { name: "Policies" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "hello@example.com" })).toHaveAttribute(
      "href",
      "mailto:hello@example.com",
    );
  });

  it("hides optional sections when turned off", () => {
    render(
      <SharedFooter
        year={2026}
        site={{
          siteId: "incubator",
          footer: {
            sections: { ecosystemLinks: false, ecosystemIntro: false, policies: false },
            policyLinks: [{ label: "Privacy", href: "/privacy" }],
          },
        }}
      />,
    );
    expect(screen.queryByRole("navigation", { name: /ecosystem/i })).toBeNull();
    expect(screen.queryByRole("link", { name: "About the ecosystem" })).toBeNull();
    expect(screen.queryByRole("navigation", { name: "Policies" })).toBeNull();
  });

  it("shows no contact block while no shared contact is approved", () => {
    render(<SharedFooter site={talentexcel} year={2026} />);
    expect(screen.queryByRole("heading", { name: "Contact" })).toBeNull();
  });

  it("band variant is a labelled region, not a second footer landmark", () => {
    render(<SharedFooter site={talentexcel} variant="band" />);
    expect(screen.queryByRole("contentinfo")).toBeNull();
    const band = screen.getByRole("region", { name: "The SaSarjan ecosystem" });
    expect(
      within(band).getAllByRole("link", {
        name: /talentexcel|sasarjan|10xgrowth|sevapremi|nanha|vidya|incubator/i,
      }),
    ).toHaveLength(7);
  });

  it("uses the linkComponent for site-relative links only", () => {
    const Link = vi.fn(
      ({ href, children, className }: { href: string; children?: ReactNode; className?: string }) => (
        <a href={href} className={className} data-router-link="">
          {children}
        </a>
      ),
    );
    render(
      <SharedFooter
        site={{ siteId: "itvidya", ecosystemPath: "/about/ecosystem" }}
        linkComponent={Link}
        year={2026}
      />,
    );
    expect(screen.getByRole("link", { name: "About the ecosystem" })).toHaveAttribute("data-router-link");
    expect(screen.getByRole("link", { name: /TalentExcel/ })).not.toHaveAttribute("data-router-link");
  });
});

describe("SafeLink", () => {
  it("renders unsafe hrefs as plain text", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<SafeLink href="javascript:alert(1)">Click</SafeLink>);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Click")).toBeInTheDocument();
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });
});

describe("IntroductionPage", () => {
  it("renders one h1, the vision, CoCreation and initiatives sections, and the directory", () => {
    render(<IntroductionPage site={{ siteId: "nanhasitara" }} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("region", { name: "Vision: Collective Prosperity" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "CoCreation" })).toBeInTheDocument();
    const initiatives = screen.getByRole("region", { name: "Ecosystem initiatives" });
    expect(within(initiatives).getAllByRole("listitem")).toHaveLength(7);
  });

  it("renders configured CTAs and site-specific children", () => {
    render(
      <IntroductionPage
        site={{
          siteId: "nanhasitara",
          introduction: {
            ctas: [
              { label: "Get involved", href: "/get-involved" },
              { label: "Visit SaSarjan", href: "https://sasarjan.com", variant: "secondary" },
            ],
          },
        }}
      >
        <p>Nanha Sitara's place in the ecosystem.</p>
      </IntroductionPage>,
    );
    expect(screen.getByRole("link", { name: "Get involved" })).toHaveClass("swc-btn--primary");
    expect(screen.getByRole("link", { name: "Visit SaSarjan" })).toHaveClass("swc-btn--secondary");
    expect(screen.getByText("Nanha Sitara's place in the ecosystem.")).toBeInTheDocument();
  });
});

describe("SharedPageLayout", () => {
  it("accepts string paragraphs or React content in sections", () => {
    render(
      <SharedPageLayout
        as="div"
        title="About"
        intro={["Intro paragraph."]}
        sections={[
          { id: "one", title: "One", body: ["First."] },
          {
            id: "two",
            title: "Two",
            body: (
              <ul>
                <li>Custom</li>
              </ul>
            ),
          },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Two" })).toContainElement(screen.getByText("Custom"));
  });
});
