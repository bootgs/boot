import { HttpHeaders, HttpRequest, HttpResponse, ParsedUrlQuery } from "../../domain/types";

/**
 * Execution context for a route handler.
 */
export interface RouteExecutionContext {
  /**
   * The Google Apps Script event.
   */
  event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost;

  /**
   * Path parameters extracted from the URL.
   */
  params: Record<string, string>;

  /**
   * Parsed query parameters.
   */
  query: ParsedUrlQuery;

  /**
   * The HTTP request.
   */
  request: HttpRequest;

  /**
   * The HTTP headers.
   */
  headers: HttpHeaders;

  /**
   * The request body.
   */
  body: unknown;

  /**
   * The HTTP response.
   */
  response: HttpResponse;
}
