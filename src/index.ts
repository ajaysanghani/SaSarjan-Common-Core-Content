// Components and content. This entry must not import zod: it may be bundled into client
// components (e.g. a footer rendered inside a "use client" tree). Validation lives in ./config.
export { SharedFooter, type SharedFooterProps } from "./components/SharedFooter";
export { EcosystemLinks, type EcosystemLinksProps } from "./components/EcosystemLinks";
export { IntroductionPage, type IntroductionPageProps } from "./components/IntroductionPage";
export {
  SharedPageLayout,
  CtaRow,
  type SharedPageLayoutProps,
  type PageSection,
} from "./components/SharedPageLayout";
export { SafeLink, type SafeLinkProps } from "./components/SafeLink";

export { ecosystemSites, getEcosystemSite } from "./content/sites";
export { introductionContent } from "./content/introduction";
export { footerContent, defaultLabels } from "./content/footer";
export { classifyHref, isSafeHref, type HrefKind } from "./lib/url";

export type {
  ContentStatus,
  ContentSection,
  Cta,
  EcosystemSite,
  FooterContent,
  FooterSections,
  FooterVariant,
  IntroductionContent,
  Labels,
  LinkComponent,
  LinkComponentProps,
  LinkGroup,
  LinkItem,
  SiteConfig,
  SiteId,
} from "./config/types";
