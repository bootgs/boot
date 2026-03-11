import { HttpHeaders, HttpRequest, HttpResponse, ParsedUrlQuery } from "../../domain/types";

/**
 * Execution context for a route handler.
 */
export interface RouteExecutionContext {
  event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost;
  params: Record<string, string>;
  query: ParsedUrlQuery;
  request: HttpRequest;
  headers: HttpHeaders;
  body: unknown;
  response: HttpResponse;
}
