import Link from "next/link";
import { SharedFooter } from "@sasarjan/web-core";
import { site } from "../../site.config";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <SharedFooter site={site} linkComponent={Link} />
    </>
  );
}
