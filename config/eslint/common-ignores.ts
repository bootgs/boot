import type { Linter } from "eslint";

/**
 * Common ESLint ignore paths.
 *
 * @see https://eslint.org/docs/latest/use/configure/ignore
 */
const config: Linter.Config = {
  ignores: [
    "dist/*",
    "package-lock.json",
    "tsconfig*.json",
    "src/**/*.js",
    // Triggers catastrophic backtracking in @eslint/markdown's GFM table
    // tokenizer (many adjacent short `code` spans in a table cell).
    "docs/comparison.md"
  ]
};

export default config;
