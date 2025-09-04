import { BuildOptions, ResolveOptions } from "./types";

/**
 * Generates the Vite resolve configuration with aliases based on the target environment (`Apps Script` or `WebApp`).
 *
 * @param options - Build options including paths and target type.
 * @returns Resolve redux with generated aliases.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildResolversConfig(options: BuildOptions): ResolveOptions {
  return {
    alias: {}
  };
}
