import Link from "next/link";
import { SharedFooter } from "@sasarjan/web-core";
import { site } from "../../site.config";

// The /ecosystem page already shows the tagline and the introduction, so its footer is condensed.
export default function EcosystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <SharedFooter site={site} linkComponent={Link} condensed />
    </>
  );
}
