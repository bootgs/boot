import { ConfigEnv } from "vite";
import { BuildPaths } from "./BuildPaths";

/**
 * Build configuration options.
 * Extends Vite's `ConfigEnv` with project-specific paths and flags.
 */
export interface BuildOptions extends ConfigEnv {

  /**
   * Project paths.
   */
  paths: BuildPaths;

  /**
   * Google Apps Script target flag.
   */
  isAppsScript?: boolean;

  /**
   * Web App target flag.
   */
  isWebApp?: boolean;

  /**
   * Development mode flag.
   */
  isDev: boolean;
}
