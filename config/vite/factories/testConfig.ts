import { type ViteUserConfig } from "vitest/config";
import { BuildOptions } from "../types";

/**
 * Generates Vitest configuration.
 *
 * @param   {BuildOptions} _options - Build configuration options.
 * @returns {} Vitest configuration object.
 * @see https://vitest.dev/config/
 */
export const testConfig = (_options: BuildOptions): ViteUserConfig["test"] => {
  return {
    globals: true
  };
};
