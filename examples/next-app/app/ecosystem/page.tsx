import type { Metadata } from "next";
import Link from "next/link";
import { IntroductionPage, introductionMetadata } from "@sasarjan/web-core";
import { site } from "../../site.config";

// introductionMetadata is plain data (no next import): the page's SEO title and description.
export const metadata: Metadata = {
  ...introductionMetadata,
  alternates: { canonical: "/ecosystem" },
};

export default function EcosystemPage() {
  return (
    <IntroductionPage site={site} linkComponent={Link} as="div">
      <h2 className="text-2xl font-bold">IT Vidya in the ecosystem</h2>
      <p className="mt-3 max-w-3xl">Site-specific content goes here, as children of IntroductionPage.</p>
    </IntroductionPage>
  );
}
