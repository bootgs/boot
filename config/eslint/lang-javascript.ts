import js from "@eslint/js";
import type { Linter } from "eslint";

/**
 * JavaScript language settings.
 *
 * @see {@link https://eslint.org/docs/latest/rules/ ESLint rules}
 */
const config: Linter.Config = {
  files: ["**/*.{js,mjs,cjs}"],
  ...js.configs.recommended
};

export default config;
