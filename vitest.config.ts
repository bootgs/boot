import { defineConfig } from "vitest/config";
import { getAppVersion, getBuildOptions, resolveConfig, testConfig } from "./config/vite";

/**
 * Vitest configuration.
 * @see https://vitest.dev/config/
 */
export default defineConfig(async (env) => {
  const options = getBuildOptions(env);
  const appVersion = getAppVersion(options.paths.root);

  return {
    /**
     * @see https://vite.dev/config/shared-options.html#define
     */
    define: {
      "import.meta.env.APP_VERSION": JSON.stringify(appVersion)
    },

    /**
     * @see https://vite.dev/config/shared-options.html#resolve
     */
    resolve: resolveConfig(options),

    /**
     * @see https://vitest.dev/config/
     */
    test: testConfig(options)
  };
});
