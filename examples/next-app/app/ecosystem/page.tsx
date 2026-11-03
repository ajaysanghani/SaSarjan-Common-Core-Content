import type { Metadata } from "next";
import Link from "next/link";
import { IntroductionPage, introductionContent } from "@sasarjan/web-core";
import { site } from "../../site.config";

export const metadata: Metadata = {
  title: introductionContent.title,
  description: introductionContent.lead[0],
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
