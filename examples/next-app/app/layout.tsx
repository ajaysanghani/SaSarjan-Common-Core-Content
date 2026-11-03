import type { Metadata } from "next";
import Link from "next/link";
import { SharedFooter } from "@sasarjan/web-core";
import "@sasarjan/web-core/styles.css";
import "./globals.css";
import { site } from "../site.config";

export const metadata: Metadata = { title: "web-core example (Next 16)" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="border-b border-slate-200">
          <nav className="mx-auto flex max-w-5xl gap-6 px-5 py-4 font-semibold" aria-label="Main">
            <Link href="/">Home</Link>
            <Link href="/ecosystem">Ecosystem</Link>
          </nav>
        </header>
        <main>{children}</main>
        <SharedFooter site={site} linkComponent={Link} />
      </body>
    </html>
  );
}
