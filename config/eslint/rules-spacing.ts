import type { Linter } from "eslint";

/**
 * Rules for managing spacing within brackets.
 */
const config: Linter.Config = {
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  rules: {
    /**
     * Requires spacing inside curly braces.
     * Aligned with Prettier (bracketSpacing: true).
     * @see {@link https://eslint.org/docs/latest/rules/object-curly-spacing object-curly-spacing}
     */
    "object-curly-spacing": ["warn", "always"],

    /**
     * Requires spacing inside computed properties.
     * @see {@link https://eslint.org/docs/latest/rules/computed-property-spacing computed-property-spacing}
     */
    "computed-property-spacing": ["warn", "always"],

    /**
     * Requires a blank line between constants and blocks.
     * @see {@link https://eslint.org/docs/latest/rules/padding-line-between-statements padding-line-between-statements}
     */
    "padding-line-between-statements": [
      "warn",
      {
        blankLine: "always",
        prev: ["const", "let", "var"],
        next: ["if", "for", "while", "switch", "try", "do", "block", "block-like"]
      },
      {
        blankLine: "always",
        prev: ["if", "for", "while", "switch", "try", "do", "block", "block-like"],
        next: ["const", "let", "var"]
      }
    ]
  }
};

export default config;
