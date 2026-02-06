/**
 * Directory paths used in the build process.
 */
export type BuildPaths = {

  /**
   * Project root directory.
   */
  root: string;

  /**
   * Configuration directory.
   */
  config: string;

  /**
   * Build output directory.
   */
  dist: string;

  /**
   * Public directory for static assets.
   */
  public?: string;

  /**
   * Source directory.
   */
  src: string;
};
