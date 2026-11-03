// Installs the React 18.3 fixture used by `pnpm test:react18`, once.
// It is a separate npm install so react-dom 18 resolves react 18, not the root React 19.
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const dir = "tests/react18";
if (!existsSync(`${dir}/node_modules/react-dom/package.json`)) {
  execSync(existsSync(`${dir}/package-lock.json`) ? "npm ci" : "npm install", { cwd: dir, stdio: "inherit" });
}
