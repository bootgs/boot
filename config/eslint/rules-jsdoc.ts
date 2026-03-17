import type { Linter } from "eslint";
import jsdoc from "eslint-plugin-jsdoc";

/**
 * JSDoc comment settings.
 *
 * @see {@link https://www.npmjs.com/package/eslint-plugin-jsdoc eslint-plugin-jsdoc}
 */
const config: Linter.Config = {
  files: [ "**/*.{js,mjs,cjs,ts,jsx,tsx}" ],
  plugins: {
    jsdoc
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
     * Enforces a blank line before JSDoc comments.
     * @see {@link https://eslint.org/docs/latest/rules/lines-around-comment lines-around-comment}
     */
    "lines-around-comment": [
      "warn",
      {
        beforeBlockComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
        allowClassStart: true
      }
    ]
  }
};

export default config;
