// @vitest-environment node
//
// Server-rendering checks. Runs under React 19 (`pnpm test`) and React 18.3
// (`pnpm test:react18`, which aliases react/react-dom to the 18.3 packages).
import { version } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EcosystemLinks, IntroductionPage, SharedFooter, SharedPageLayout } from "../src";

const expectedMajor = process.env.EXPECTED_REACT_MAJOR ?? "19";

describe(`server rendering on React ${version}`, () => {
  it("runs on the expected React major", () => {
    expect(version.split(".")[0]).toBe(expectedMajor);
  });

  it.each([
    ["SharedFooter full", <SharedFooter key="a" site={{ siteId: "sasarjan" }} year={2026} />],
    ["SharedFooter band", <SharedFooter key="b" site={{ siteId: "sasarjan" }} variant="band" />],
    ["EcosystemLinks", <EcosystemLinks key="c" site={{ siteId: "itvidya" }} />],
    ["IntroductionPage", <IntroductionPage key="d" site={{ siteId: "incubator" }} />],
    [
      "SharedPageLayout",
      <SharedPageLayout key="e" title="Title" sections={[{ id: "s", title: "S", body: ["x"] }]} />,
    ],
  ])("%s renders to a string without a DOM", (_name, element) => {
    expect(typeof window).toBe("undefined");
    const html = renderToString(element);
    expect(html).toContain("swc-root");
    // No inline event handlers or scripts: nothing for the browser to hydrate.
    expect(html).not.toMatch(/<script|\son[a-z]+=/i);
  });

  it("produces deterministic markup for the same input (no hydration drift)", () => {
    const render = () => renderToStaticMarkup(<SharedFooter site={{ siteId: "talentexcel" }} year={2026} />);
    expect(render()).toBe(render());
  });

  it("never renders an unsafe href", () => {
    const html = renderToStaticMarkup(
      <SharedFooter
        year={2026}
        site={{
          siteId: "sasarjan",
          footer: { siteLinks: [{ heading: "x", links: [{ label: "Bad", href: "javascript:alert(1)" }] }] },
        }}
      />,
    );
    expect(html).not.toContain("javascript:");
  });
});
