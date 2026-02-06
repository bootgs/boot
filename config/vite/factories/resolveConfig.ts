import { BuildOptions, ResolveOptions } from "../types";
import { buildAliases } from "../utils";

/**
 * Generates Vite resolve configuration.
 *
 * @param   {BuildOptions} options - Build configuration options.
 * @returns {ResolveOptions} Vite resolve configuration object.
 * @see https://vite.dev/config/shared-options.html#resolve
 */
export function resolveConfig({ paths }: BuildOptions): ResolveOptions {
  return {
    /**
     * @see https://vite.dev/config/shared-options.html#resolve-alias
     */
    alias: {
      src: paths.src,
      ...buildAliases(paths.src)
    }
  };
}
