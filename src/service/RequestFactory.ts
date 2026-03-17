import { isString, normalize } from "apps-script-utils";
import { HttpHeaders, HttpRequest, ParsedUrl } from "../domain/types";
import { RequestMethod } from "../domain/enums";

export class RequestFactory {
  /**
   * Creates a structured HttpRequest object from a raw Apps Script DoGet or DoPost event.
   *
   * @param   {RequestMethod} methodRequest - The expected request method.
   * @param   {GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost} event - The raw Apps Script event object.
   * @returns {HttpRequest} A structured object representing the HTTP request.
   */
  public create(
    methodRequest: RequestMethod,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost
  ): HttpRequest {
    const headers: HttpHeaders =
      ((input: unknown): HttpHeaders | null => {
        if (!isString(input)) {
          return null;
        }

        try {
          return JSON.parse(input.trim()) as HttpHeaders;
        } catch (err: unknown) {
          console.warn("Failed to parse JSON:", err);
        }

        return null;
      })(event?.parameter?.headers) || {};

    const methodParam = event?.parameter?.method?.toLowerCase();

    const method = Object.values(RequestMethod).includes(methodParam as RequestMethod)
      ? (methodParam as RequestMethod)
      : methodRequest;

    const rawPathname =
      event?.pathInfo || event?.parameter?.path || event?.parameter?.pathname || "/";

    const pathname = normalize(rawPathname);

    const search = ((params) => (isString(params) && params.length > 0 ? `?${params}` : undefined))(
      event?.queryString
    );

    const url: ParsedUrl = {
      pathname,
      path: search ? `${pathname}${search}` : pathname,
      search,
      query: event?.parameters ?? {}
    };

    const rawBody = [
      RequestMethod.POST,
      RequestMethod.PUT,
      RequestMethod.PATCH,
      RequestMethod.DELETE
    ].includes(method)
      ? "postData" in event
        ? event?.postData?.contents
        : null
      : null;

    const body = ((): unknown => {
      if (!isString(rawBody)) {
        return rawBody;
      }

      const contentType =
        headers[ "Content-Type" ] || ("postData" in event ? event?.postData?.type : undefined) || "";

      if (contentType.includes("application/json")) {
        try {
          return JSON.parse(rawBody);
        } catch (err: unknown) {
          console.warn("Failed to parse JSON body:", err);
        }
      }

      return rawBody;
    })();

    return {
      headers,
      method,
      url,
      body
    };
  }
}
