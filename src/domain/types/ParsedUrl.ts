import { ParsedUrlQuery } from "./ParsedUrlQuery";

/**
 * Interface representing a parsed URL.
 */
export interface ParsedUrl {
  /**
   * The pathname part of the URL.
   */
  pathname: string;

  /**
   * The full path of the URL.
   */
  path: string;

  /**
   * The search (query string) part of the URL.
   */
  search?: string;

  /**
   * Parsed query parameters.
   */
  query: ParsedUrlQuery;
}
