import type { Linter } from "eslint";

/**
 * Common ESLint ignore paths.
 *
 * @see https://eslint.org/docs/latest/use/configure/ignore
 */
const config: Linter.Config = {
  ignores: ["dist/*", "package-lock.json", "tsconfig*.json", "src/**/*.js"]
};

export default config;
