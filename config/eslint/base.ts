import js from "@eslint/js";
import { parser } from "typescript-eslint";

export default {
  files: ["**/*.{js,mjs,cjs,ts}"],
  plugins: { js },
  extends: ["js/recommended"],
  languageOptions: {
    parser
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-empty-object-type": "warn"
  }
};
