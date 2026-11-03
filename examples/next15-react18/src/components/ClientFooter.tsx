"use client";

// 10xGrowth renders its footer from a "use client" module. The shared components must work there too.
import Link from "next/link";
import { SharedFooter } from "@sasarjan/web-core";
import type { SiteConfig } from "@sasarjan/web-core";

export function ClientFooter({ site }: { site: SiteConfig }) {
  return <SharedFooter site={site} linkComponent={Link} year={2026} />;
}
