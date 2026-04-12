import markdown from "@eslint/markdown";
import type { Linter } from "eslint";

/**
 * Markdown language settings.
 *
 * @see {@link https://www.npmjs.com/package/@eslint/markdown @eslint/markdown}
 */
const config: Array<Linter.Config> = [
  ...markdown.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.md"]
  })),
  {
    files: ["**/*.md"],
    rules: {
      "markdown/no-missing-label-refs": "off"
    }
  }
];

export default config;
