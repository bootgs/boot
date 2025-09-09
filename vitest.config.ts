import { readFileSync } from "node:fs";
import { join, resolve } from "path";
import { defineConfig } from "vitest/config";
import { BuildOptions, BuildPaths, buildResolversConfig } from "./config/vite";

// https://vite.dev/config/
export default defineConfig(
  async ({ command, mode, isSsrBuild, isPreview }) => {
    const rootDir = process.cwd();
    const paths: BuildPaths = {
      root: rootDir,
      config: join(rootDir, "config"),
      dist: resolve(rootDir, "dist"),
      src: join(rootDir, "src")
    };

    const options: BuildOptions = {
      paths,
      command,
      mode,
      isSsrBuild,
      isPreview,
      isDev: mode === "development"
    };

    let appVersion = null;

    try {
      const packageJsonPath = resolve(rootDir, "package.json");
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
      appVersion = packageJson.version;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      /* empty */
    }

    return {
      define: {
        "import.meta.env.APP_VERSION": JSON.stringify(appVersion)
      },
      resolve: buildResolversConfig(options),
      test: {
        globals: true
      }
    };
  }
);
