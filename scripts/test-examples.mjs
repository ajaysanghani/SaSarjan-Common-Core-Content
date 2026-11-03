// Packs the package exactly as npm would publish it, installs the tarball into each example app
// (not a workspace link), runs `next build`, and checks that no shared component code was
// shipped to the browser.
//
// Usage: pnpm test:examples            (build must already exist: pnpm build)
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const examples = ["next-app", "next15-react18"];
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: "inherit" });

rmSync(".pack", { recursive: true, force: true });
mkdirSync(".pack");
const packed = execSync("npm pack --pack-destination .pack --json", { encoding: "utf8" });
const [{ filename }] = JSON.parse(packed);
renameSync(
  join(".pack", filename.replace(/^@/, "").replace("/", "-")),
  join(".pack", "sasarjan-web-core.tgz"),
);

let failed = false;
for (const name of examples) {
  const dir = join("examples", name);
  console.log(`\n=== ${name}: install packed tarball and build`);
  // The lockfile would pin the previous tarball's integrity hash and reinstall stale code.
  rmSync(join(dir, "package-lock.json"), { force: true });
  rmSync(join(dir, "node_modules", "@sasarjan"), { recursive: true, force: true });
  rmSync(join(dir, ".next"), { recursive: true, force: true });
  run("npm install --no-audit --no-fund --loglevel=error", dir);
  run("npx next build", dir);

  // Shared components are server-rendered. Their class names should never appear in client JS,
  // except for the example that deliberately renders the footer inside a "use client" module.
  const chunks = listFiles(join(dir, ".next", "static", "chunks")).filter((f) => f.endsWith(".js"));
  const leaking = chunks.filter((file) => readFileSync(file, "utf8").includes("swc-eco__list"));
  const allowClient = name === "next15-react18";
  console.log(`${name}: ${leaking.length} client chunk(s) contain shared component code`);
  if (leaking.length > 0 && !allowClient) {
    console.error(`✖ ${name}: shared components were bundled for the browser:\n  ${leaking.join("\n  ")}`);
    failed = true;
  }
  if (allowClient && leaking.length === 0) {
    console.error(`✖ ${name}: expected the "use client" footer to be bundled for the browser`);
    failed = true;
  }
  const zodInClient = chunks.filter((file) => /ZodError|\$ZodType/.test(readFileSync(file, "utf8")));
  if (zodInClient.length > 0) {
    console.error(`✖ ${name}: zod was bundled for the browser:\n  ${zodInClient.join("\n  ")}`);
    failed = true;
  }
}

process.exit(failed ? 1 : 0);

function listFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}
