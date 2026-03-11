import type { Linter } from "eslint";
import { parser } from "typescript-eslint";
import globals from "globals";

/**
 * TypeScript language settings.
 *
 * @see https://typescript-eslint.io/rules/
 */
const config: Linter.Config = {
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  languageOptions: {
    parser,
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.es2020
    }
  },
  rules: {
    /**
     * Disallows unused variables.
     *
     * @see https://typescript-eslint.io/rules/no-unused-vars/
     */
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }
    ],

    /**
     * Disallows usage of the `any` type.
     *
     * @see https://typescript-eslint.io/rules/no-explicit-any/
     */
    "@typescript-eslint/no-explicit-any": "warn",

    /**
     * Disallows empty object types.
     *
     * @see https://typescript-eslint.io/rules/no-empty-object-type/
     */
    "@typescript-eslint/no-empty-object-type": "warn"
  }
};

export default config;
