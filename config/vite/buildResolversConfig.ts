import { buildAliases } from "./buildAliases";
import { BuildOptions, ResolveOptions } from "./types";

/**
 * Generates the Vite resolve configuration with aliases based on the target environment (`Apps Script` or `WebApp`).
 *
 * @param options - Build options including paths and target type.
 * @returns Resolve redux with generated aliases.
 */
export function buildResolversConfig({ paths }: BuildOptions): ResolveOptions {
  return {
    alias: {
      ...buildAliases(paths.src),
      "@": paths.src
    }
  };
}
