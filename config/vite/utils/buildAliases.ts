import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { AliasOptions } from "vite";

/**
 * Builds Vite aliases based on subdirectories of the given root.
 *
 * @param   {string} rootDir - Absolute path to the directory to scan.
 * @returns {AliasOptions} Alias configuration object.
 * @see https://vite.dev/config/shared-options.html#resolve-alias
 */
export function buildAliases(rootDir: string): AliasOptions {
  return existsSync(rootDir)
    ? Object.fromEntries(
        readdirSync(rootDir, { withFileTypes: true })
          .filter((dirent) => !dirent.name.startsWith("."))
          .map((dirent) => {
            const name = dirent.name.replace(/\.ts$/, "");
            return [name, join(rootDir, dirent.name)];
          })
      )
    : {};
}
