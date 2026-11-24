import { ClientFooter } from "@/components/ClientFooter";
import { site } from "@/site.config";

// The /ecosystem page already shows the tagline and the introduction, so its footer is condensed.
export default function EcosystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
      <ClientFooter site={site} condensed />
    </>
  );
}
