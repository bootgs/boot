/**
 * Represents the directory paths used in the build process.
 * Provides the paths for the root directory, source files, distribution, and optionally configuration and public directories.
 */
export type BuildPaths = {
  /**
   * The root directory of the project.
   */
  root: string;

  /**
   * Optional url to the configuration directory.
   */
  config: string;

  /**
   * The output directory for the build.
   */
  dist: string;

  /**
   * Optional url to the public directory for static assets.
   */
  public?: string;

  /**
   * The source directory for the project files.
   */
  src: string;
};
