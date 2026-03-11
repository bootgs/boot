import json from "@eslint/json";
import type { Linter } from "eslint";

/**
 * JSON language settings.
 *
 * @see {@link https://www.npmjs.com/package/@eslint/json @eslint/json}
 */
const config: Array<Linter.Config> = [
  {
    files: ["**/*.json"],
    ignores: ["**/tsconfig.json", "**/tsconfig.*.json"],
    language: "json/json",
    ...json.configs.recommended
  },
  {
    files: ["**/*.jsonc", "**/tsconfig.json", "**/tsconfig.*.json"],
    language: "json/jsonc",
    ...json.configs.recommended
  },
  {
    files: ["**/*.json5"],
    language: "json/json5",
    ...json.configs.recommended
  }
];

export default config;
