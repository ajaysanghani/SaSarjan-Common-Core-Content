import Link from "next/link";
import { EcosystemLinks, SharedFooter } from "@sasarjan/web-core";
import { site } from "../../site.config";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="text-4xl font-bold">Example site</h1>
      <p className="mt-4 text-lg text-slate-600">
        Tailwind v4 styles this page; the shared components below bring their own prefixed CSS.
      </p>
      <div className="mt-10">
        <EcosystemLinks site={site} heading="Explore the ecosystem" />
      </div>

      <h2 className="mt-16 text-2xl font-bold">The band inside a dark site footer</h2>
      <p className="mt-2 text-slate-600">
        As IT Vidya will use it: the site&apos;s own dark footer, with IT Vidya&apos;s token set on
        <code> .swc-footer</code> (see <code>globals.css</code>).
      </p>
      <div className="itv-footer mt-6 rounded-2xl bg-[#133530] text-white/80">
        <SharedFooter site={site} variant="band" linkComponent={Link} />
      </div>
    </div>
  );
}
