import { ConfigEnv } from "vite";
import type { BuildPaths } from "./BuildPaths";

/**
 * Represents the configuration options for the build process in Vite.
 * Extends Vite's `ConfigEnv` to include project-specific paths, environment flags,
 * and target type (`Apps Script` or `WebApp`) for customization during the build.
 */
export interface BuildOptions extends ConfigEnv {
  /**
   * Paths used in the project, including source and distribution directories.
   */
  paths: BuildPaths;

  /**
   * Indicates if the build is in development mode.
   */
  isDev: boolean;
}
