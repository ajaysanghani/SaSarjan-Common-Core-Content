// Imports the built package and server-renders each component with plain Node, no bundler.
// CI runs it on the oldest Node the sites use (20), which the test tooling itself no longer supports.
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EcosystemLinks, IntroductionPage, SharedFooter } from "../dist/index.js";
import { defineSiteConfig, validateSharedContent } from "../dist/config.js";

validateSharedContent();
const site = defineSiteConfig({ siteId: "sevapremi", footer: { launchYear: 2024 } });

for (const [name, element] of [
  ["SharedFooter", h(SharedFooter, { site, year: 2026 })],
  ["SharedFooter band", h(SharedFooter, { site, variant: "band" })],
  ["EcosystemLinks", h(EcosystemLinks, { site })],
  ["IntroductionPage", h(IntroductionPage, { site })],
]) {
  const html = renderToStaticMarkup(element);
  if (!html.includes("swc-root")) throw new Error(`${name} rendered unexpected markup`);
  console.log(`✔ ${name}: ${html.length} chars`);
}
console.log(`✔ Smoke test passed on Node ${process.version}`);
