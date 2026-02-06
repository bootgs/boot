import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Retrieves the application version from `package.json`.
 *
 * @param   {string} rootDir - Root directory of the project.
 * @returns {string | null} Version string or `null`.
 */
export const getAppVersion = (rootDir: string = process.cwd()): string | null => {
  try {
    const packageJsonPath = resolve(rootDir, "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

    return packageJson.version || null;
  } catch {
    return null;
  }
};
