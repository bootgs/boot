import { AliasOptions, ResolveOptions as ViteResolveOptions } from "vite";

/**
 * Represents Vite's resolve configuration options, with the addition of optional alias configuration.
 * This type is used to define how Vite should resolve modules, including custom aliases.
 */
export type ResolveOptions = ViteResolveOptions & {
  /**
   * Optional alias configuration to create custom module aliases.
   */
  alias?: AliasOptions;
};
