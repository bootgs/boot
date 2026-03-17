import { AliasOptions, ResolveOptions as ViteResolveOptions } from "vite";

/**
 * Vite resolve options with optional aliases.
 */
export type ResolveOptions = ViteResolveOptions & {

  /**
   * Module aliases.
   */
  alias?: AliasOptions;
};
