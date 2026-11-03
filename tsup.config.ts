import { defineConfig } from "tsup";

export default defineConfig({
  // `index` holds the components and content and must stay free of zod so it is safe to render
  // inside client components. `config` holds validation and is meant for build/server time.
  entry: { index: "src/index.ts", config: "src/config.ts" },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
  treeshake: true,
  target: "es2022",
  external: ["react", "react-dom", "react/jsx-runtime"],
});
