import tsEslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import {
  commonIgnores,
  envAppsscript,
  langJavascript,
  langJson,
  langMarkdown,
  langTypescript,
  overridesTests,
  rulesJsdoc,
  rulesPrettier,
  rulesSecurity,
  rulesSpacing
} from "./config/eslint/index.ts";

export default defineConfig([
  langJavascript,
  tsEslint.configs.recommended,
  langTypescript,
  envAppsscript,
  rulesPrettier,
  ...langJson,
  ...langMarkdown,
  rulesPrettier,
  rulesJsdoc,
  ...rulesSecurity,
  rulesSpacing,
  overridesTests,
  commonIgnores
]);
