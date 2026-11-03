import type { Metadata } from "next";
import "@sasarjan/web-core/styles.css";
import "./globals.css";
import { ClientFooter } from "@/components/ClientFooter";
import { site } from "@/site.config";

export const metadata: Metadata = { title: "web-core example (Next 15 + React 18)" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
        <ClientFooter site={site} />
      </body>
    </html>
  );
}
