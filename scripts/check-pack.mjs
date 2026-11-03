// Verifies the files `npm publish` would upload: everything required is present and nothing
// that should stay private (sources, tests, examples, env files, keys) slips in.
import { execSync } from "node:child_process";

const [report] = JSON.parse(execSync("npm pack --dry-run --json", { encoding: "utf8" }));
const files = report.files.map((f) => f.path.replace(/\\/g, "/"));

const required = [
  "package.json",
  "README.md",
  "LICENSE",
  "dist/index.js",
  "dist/index.d.ts",
  "dist/config.js",
  "dist/config.d.ts",
  "dist/styles.css",
];
const forbidden = [
  /^src\//,
  /^tests\//,
  /^examples\//,
  /^scripts\//,
  /^docs\//,
  /\.env/,
  /\.pem$/,
  /\.npmrc$/,
  /\.tgz$/,
];

const missing = required.filter((path) => !files.includes(path));
const leaked = files.filter((path) => forbidden.some((pattern) => pattern.test(path)));

console.log(
  `${report.name}@${report.version}: ${files.length} files, ${(report.size / 1024).toFixed(1)} kB packed`,
);
for (const path of files) console.log(`  ${path}`);

if (missing.length || leaked.length) {
  if (missing.length) console.error(`✖ Missing: ${missing.join(", ")}`);
  if (leaked.length) console.error(`✖ Must not be published: ${leaked.join(", ")}`);
  process.exit(1);
}
console.log("✔ Package contents look right.");
