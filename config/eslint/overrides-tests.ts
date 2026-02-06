import type { Linter } from "eslint";

/**
 * Overrides for test files.
 */
const config: Linter.Config = {
  files: [ "test/**/*.ts" ],
  rules: {
    /**
     * Disallows usage of the `any` type.
     * @see {@link https://typescript-eslint.io/rules/no-explicit-any/ no-explicit-any}
     */
    "@typescript-eslint/no-explicit-any": "error",

    /**
     * Disallows unused variables.
     * @see {@link https://typescript-eslint.io/rules/no-unused-vars/ no-unused-vars}
     */
    "@typescript-eslint/no-unused-vars": "error"
  }
};

export default config;
