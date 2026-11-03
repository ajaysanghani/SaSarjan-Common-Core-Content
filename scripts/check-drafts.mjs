// Release gate: fails while any shared content is still marked `draft`.
// Reads the built package, so run `pnpm build` first.
import { findDraftContent, validateSharedContent } from "../dist/config.js";

validateSharedContent();
const drafts = findDraftContent();

if (drafts.length > 0) {
  console.error(`✖ ${drafts.length} shared content item(s) are still marked draft:`);
  for (const draft of drafts) console.error(`  - ${draft.path} (${draft.label})`);
  console.error("Approve them (see docs/CONTENT-GOVERNANCE.md) before publishing a stable release.");
  process.exit(1);
}
console.log("✔ All shared content is approved.");
