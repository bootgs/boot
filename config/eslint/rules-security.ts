import type { Linter } from "eslint";
import security from "eslint-plugin-security";

/**
 * Security rules: unsafe patterns such as eval, unsafe regular expressions (ReDoS) and
 * non-literal require or child_process calls. Tests are excluded.
 *
 * @see {@link https://github.com/eslint-community/eslint-plugin-security eslint-plugin-security}
 */
const config: Linter.Config[] = [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["test/**", "**/*.test.{js,mjs,cjs,ts,jsx,tsx}", "**/*.spec.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      security
    },
    rules: {
      ...security.configs.recommended.rules,

      /**
       * Off: the framework looks up controller methods and config values by keys that come from
       * decorator metadata and application code, never from request input; the rule cannot tell
       * them apart and flags every computed property access. CodeQL covers prototype pollution.
       */
      "security/detect-object-injection": "off"
    }
  },
  {
    /**
     * Build scripts and tool configuration read and write repository files only.
     */
    files: ["scripts/**", "config/**"],
    rules: {
      "security/detect-non-literal-fs-filename": "off",
      "security/detect-unsafe-regex": "off"
    }
  }
];

export default config;
