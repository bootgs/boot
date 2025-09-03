import { existsSync, readdirSync } from "node:fs";
import { join } from "path";
import { AliasOptions } from "vite";

/**
 * Builds a Vite alias object based on the subdirectories of a given root directory.
 *
 * This function reads the contents of the provided `rootDir` and returns
 * an object where the keys are the names of all visible subdirectories,
 * and the values are their absolute paths.
 * Useful for setting up `resolve.alias` in Vite.
 *
 * @param rootDir - The absolute url to the directory to scan for subfolders.
 * @returns An alias configuration object for use in Vite.
 */
export function buildAliases(rootDir: string): AliasOptions {
  return existsSync(rootDir)
    ? Object.fromEntries(
        readdirSync(rootDir, { withFileTypes: true })
          .filter(
            dirent => dirent.isDirectory() && !dirent.name.startsWith(".")
          )
          .map(dirent => [dirent.name, join(rootDir, dirent.name)])
      )
    : {};
}
