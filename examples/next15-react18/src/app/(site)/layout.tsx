import { ClientFooter } from "@/components/ClientFooter";
import { site } from "@/site.config";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
      <ClientFooter site={site} />
    </>
  );
}
