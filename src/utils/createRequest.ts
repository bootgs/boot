import { HttpHeaders, HttpRequest, ParsedUrl, RequestMethod } from "types";
import { isString, normalize } from "appsscript-utils";

/**
 * Creates a structured {@link HttpRequest} object from a raw Apps Script `DoGet` or `DoPost` event.
 * This involves parsing headers (if provided in event parameters), determining the request method, normalizing the path, extracting query parameters, and retrieving the request body for POST/PUT/PATCH/DELETE methods.
 *
 * @param   methodRequest - The expected request method, used as a fallback if the method isn't explicitly in `event.parameter.method`.
 * @param   event - The raw Apps Script `doGet` or `doPost` event object.
 * @returns A structured object representing the HTTP request.
 */
export function createRequest(
  methodRequest: RequestMethod,
  event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost
): HttpRequest {
  const headers: HttpHeaders =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((input: unknown): any => {
      if (!isString(input)) {
        return null;
      }

      try {
        return JSON.parse(input.trim());
      } catch (err: unknown) {
        console.warn("Failed to parse JSON:", err);
      }

      return null;
    })(event?.parameter?.headers) || {};

  const methodParam = event?.parameter?.method?.toLowerCase();
  const method = Object.values(RequestMethod).includes(
    methodParam as RequestMethod
  )
    ? (methodParam as RequestMethod)
    : methodRequest;

  const rawPathname =
    event?.pathInfo ||
    event?.parameter?.path ||
    event?.parameter?.pathname ||
    "";
  const pathname = normalize(rawPathname);

  const search = (params =>
    isString(params) && params.length > 0 ? `?${params}` : undefined)(
    event?.queryString
  );

  const url: ParsedUrl = {
    pathname,
    path: search ? `${pathname}${search}` : pathname,
    search,
    query: event?.parameters ?? {}
  };

  const body = [
    RequestMethod.POST,
    RequestMethod.PUT,
    RequestMethod.PATCH,
    RequestMethod.DELETE
  ].includes(method)
    ? "postData" in event
      ? event?.postData?.contents
      : null
    : null;

  return {
    headers,
    method,
    url,
    body
  };
}
