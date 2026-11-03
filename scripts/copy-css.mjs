// Copies the shared stylesheet into dist/ as the `@sasarjan/web-core/styles.css` export.
import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("dist", { recursive: true });
copyFileSync("src/styles/shared.css", "dist/styles.css");
console.log("Copied src/styles/shared.css -> dist/styles.css");
