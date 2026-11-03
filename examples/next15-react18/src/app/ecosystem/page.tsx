import Link from "next/link";
import { IntroductionPage } from "@sasarjan/web-core";
import { site } from "@/site.config";

export default function EcosystemPage() {
  return <IntroductionPage site={site} linkComponent={Link} as="div" />;
}
