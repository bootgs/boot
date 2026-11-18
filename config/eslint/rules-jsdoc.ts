import type { Linter } from "eslint";
import stylistic from "@stylistic/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";

/**
 * JSDoc comment settings.
 *
 * @see {@link https://www.npmjs.com/package/eslint-plugin-jsdoc eslint-plugin-jsdoc}
 */
const config: Linter.Config = {
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  plugins: {
    jsdoc,
    "@stylistic": stylistic
  },
  rules: {
    /**
     * Enforces multiline JSDoc blocks.
     */
    "jsdoc/multiline-blocks": [
      "warn",
      {
        noSingleLineBlocks: true
      }
    ],

    /**
     * Enforces a blank line before JSDoc comments, except at the start of a block, object, array,
     * class, interface, enum, type literal or module (where Prettier removes the blank line).
     * @see {@link https://eslint.style/rules/lines-around-comment @stylistic/lines-around-comment}
     */
    "@stylistic/lines-around-comment": [
      "warn",
      {
        beforeBlockComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
        allowClassStart: true,
        allowInterfaceStart: true,
        allowEnumStart: true,
        allowTypeStart: true,
        allowModuleStart: true
      }
    ]
  }
};

export default config;
