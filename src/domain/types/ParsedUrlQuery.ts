/**
 * Interface representing parsed URL query parameters.
 */
export interface ParsedUrlQuery {
  /**
   * Query parameter key and value(s).
   */
  [key: string]: string | string[] | undefined;
}
