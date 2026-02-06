import { rules } from "eslint-config-prettier";
import type { Linter } from "eslint";

/**
 * Prettier integration rules.
 * Disables ESLint rules that might conflict with Prettier.
 *
 * @see {@link https://github.com/prettier/eslint-config-prettier eslint-config-prettier configuration}
 */
const config: Linter.Config = { rules };

export default config;
