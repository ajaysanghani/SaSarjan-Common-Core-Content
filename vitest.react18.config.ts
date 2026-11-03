import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Runs the server-rendering tests against React 18.3, the version 10xGrowth uses.
// tests/react18 is a separate npm install (see scripts/ensure-react18.mjs).
const react18 = (pkg: string) =>
  fileURLToPath(new URL(`./tests/react18/node_modules/${pkg}`, import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: /^react-dom(\/.*)?$/, replacement: `${react18("react-dom")}$1` },
      { find: /^react(\/.*)?$/, replacement: `${react18("react")}$1` },
    ],
  },
  test: {
    environment: "node",
    globals: true,
    include: ["tests/ssr.test.tsx"],
    env: { EXPECTED_REACT_MAJOR: "18" },
  },
});
