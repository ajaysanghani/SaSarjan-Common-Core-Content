import type { Metadata } from "next";
import Link from "next/link";
import "@sasarjan/web-core/styles.css";
import "./globals.css";

export const metadata: Metadata = { title: "web-core example (Next 16)" };

// The footer is rendered by the route layouts, (site)/layout.tsx and ecosystem/layout.tsx, so
// /ecosystem can ask for the condensed footer.
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
        {children}
      </body>
    </html>
  );
}
