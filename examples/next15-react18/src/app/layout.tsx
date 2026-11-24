import type { Metadata } from "next";
import "@sasarjan/web-core/styles.css";
import "./globals.css";

export const metadata: Metadata = { title: "web-core example (Next 15 + React 18)" };

// The footer is rendered by the route layouts, (site)/layout.tsx and ecosystem/layout.tsx, so
// /ecosystem can ask for the condensed footer.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
