import { SharedFooter } from "@sasarjan/web-core";
import { site } from "@/site.config";

export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Next 15 + React 18 example</h1>
      <p className="mt-3">The band variant, as a site would add it to an existing footer:</p>
      <div className="mt-6">
        <SharedFooter site={site} variant="band" />
      </div>
    </>
  );
}
