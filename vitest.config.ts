import { defineConfig } from "vitest/config";
import {
  type BuildOptions,
  getAppVersion,
  getBuildOptions,
  resolveConfig,
  testConfig
} from "./config/vite";
import { ConfigEnv } from "vite";

/**
 * Vitest configuration.
 * @see https://vitest.dev/config/
 */
export default defineConfig((env: ConfigEnv) => {
  const options: BuildOptions = getBuildOptions(env);

  const appVersion: string | null = getAppVersion(options.paths.root);

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
