import { join, resolve } from "node:path";
import { type ConfigEnv } from "vite";
import { type BuildOptions, type BuildPaths } from "../types";

/**
 * Generates build options based on the configuration environment.
 *
 * @param   {ConfigEnv} env - Vite configuration environment.
 * @returns {BuildOptions} Project build options.
 */
export const getBuildOptions = (env: ConfigEnv): BuildOptions => {
  const { mode } = env;
  const rootDir = process.cwd();

  const paths: BuildPaths = {
    root: rootDir,
    config: join(rootDir, "config"),
    dist: resolve(rootDir, "dist"),
    src: join(rootDir, "src")
  };

  const isAppsScript = process.argv.includes("--target=appsscript");
  const isWebApp = process.argv.includes("--target=webapp");

  return {
    ...env,
    paths,
    isAppsScript,
    isWebApp,
    isDev: mode === "development"
  };
};
