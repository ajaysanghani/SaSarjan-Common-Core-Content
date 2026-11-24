import type { Metadata } from "next";
import Link from "next/link";
import { IntroductionPage, introductionMetadata } from "@sasarjan/web-core";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: introductionMetadata.title,
  description: introductionMetadata.description,
  alternates: { canonical: "/ecosystem" },
};

// Like TalentExcel: the site's <main> already pads the page, so the package's own gutter is zeroed.
export default function EcosystemPage() {
  return (
    <div style={{ "--swc-gutter": "0px" } as React.CSSProperties}>
      <IntroductionPage site={site} linkComponent={Link} as="div" />
    </div>
  );
}
