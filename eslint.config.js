import js from "@eslint/js";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "examples", ".pack", "coverage", "tests/react18"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}"],
    ...jsxA11y.flatConfigs.recommended,
  },
  {
    files: ["scripts/**/*.mjs", "*.config.{js,ts}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      // Components must stay server-compatible: no client-only React APIs in the package.
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "next", message: "The package must not depend on Next.js." },
            { name: "next/link", message: "Accept a linkComponent prop instead." },
            { name: "next/image", message: "The package must not depend on Next.js." },
          ],
          patterns: [
            { group: ["zod"], message: "Only src/config/schema.ts and src/config.ts may import zod." },
          ],
        },
      ],
    },
  },
  {
    files: ["src/config/schema.ts", "src/config.ts"],
    rules: { "no-restricted-imports": "off" },
  },
);
