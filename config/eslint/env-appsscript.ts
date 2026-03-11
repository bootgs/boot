import type { Linter } from "eslint";

/**
 * Google Apps Script environment settings.
 */
const config: Linter.Config = {
  files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  rules: {
    "no-restricted-globals": [
      "error",
      {
        name: "setTimeout",
        message:
          "Use Utilities.sleep for synchronous pauses. Async timers are not supported in GAS."
      },
      { name: "setInterval", message: "Async timers are not supported in GAS." },
      { name: "clearTimeout", message: "Async timers are not supported in GAS." },
      { name: "clearInterval", message: "Async timers are not supported in GAS." },
      { name: "fetch", message: "Use UrlFetchApp.fetch instead." },
      { name: "atob", message: "Use Utilities.base64Decode instead." },
      { name: "btoa", message: "Use Utilities.base64Encode instead." },
      { name: "window", message: "Web APIs are not available in GAS." },
      { name: "navigator", message: "Web APIs are not available in GAS." },
      { name: "process", message: "Node.js APIs are not available in GAS." }
    ],
    "no-restricted-syntax": [
      "error",
      {
        selector: "CallExpression[callee.name='fetch']",
        message: "Use UrlFetchApp.fetch instead."
      },
      {
        selector: "NewExpression[callee.name='URL']",
        message: "URL API is not available in GAS."
      },
      {
        selector: "NewExpression[callee.name='FormData']",
        message: "FormData API is not available in GAS."
      }
    ]
  }
};

export default config;
