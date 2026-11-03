import { EcosystemLinks } from "@sasarjan/web-core";
import { site } from "../site.config";

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
    </div>
  );
}
