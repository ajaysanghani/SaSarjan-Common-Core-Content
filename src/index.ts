// Components and content. This entry must not import zod: it may be bundled into client
// components (e.g. a footer rendered inside a "use client" tree). Validation lives in ./config.
export { SharedFooter, type SharedFooterProps } from "./components/SharedFooter";
export { EcosystemLinks, type EcosystemLinksProps } from "./components/EcosystemLinks";
export {
  EcosystemIcon,
  DimensionIcon,
  type EcosystemIconProps,
  type DimensionIconProps,
} from "./components/EcosystemIcon";
export { IntroductionPage, type IntroductionPageProps } from "./components/IntroductionPage";
export {
  SharedPageLayout,
  CtaRow,
  type SharedPageLayoutProps,
  type PageSection,
} from "./components/SharedPageLayout";
export { SafeLink, type SafeLinkProps } from "./components/SafeLink";

export { ecosystemSites, getEcosystemSite } from "./content/sites";
export { introductionContent, introductionMetadata, participationInterests } from "./content/introduction";
export { footerContent, defaultLabels } from "./content/footer";
export { ecosystemMessaging } from "./content/messaging";
export { classifyHref, isSafeHref, type HrefKind } from "./lib/url";

export type {
  CoCreatorLink,
  CoCreatorSection,
  ContentItem,
  ContentStatus,
  DevelopmentDimension,
  ContentSection,
  Cta,
  EcosystemIconKey,
  EcosystemMessaging,
  EcosystemRole,
  EcosystemSite,
  EcosystemSiteOverride,
  FooterContent,
  FooterSections,
  FooterVariant,
  IntroductionContent,
  IntroductionMetadata,
  JourneySection,
  Labels,
  LinkComponent,
  LinkComponentProps,
  LinkGroup,
  LinkItem,
  ParticipationInterest,
  ParticipationPathway,
  SiteConfig,
  SiteId,
  SystemsSection,
  SystemsTier,
} from "./config/types";
