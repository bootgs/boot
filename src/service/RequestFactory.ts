import { isString, normalize } from "apps-script-utils";
import { HttpHeaders, HttpRequest, ParsedUrl } from "../domain/types";
import { RequestMethod } from "../domain/enums";
import { isRecord } from "../shared/utils";

/**
 * Factory for creating structured HttpRequest objects.
 */
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
          const parsed: unknown = JSON.parse(input.trim());

          return isRecord(parsed) ? (parsed as HttpHeaders) : null;
        } catch (err: unknown) {
          console.warn("Failed to parse JSON:", err);
        }

        return null;
      })(event?.parameter?.headers) || {};

    const methodParam: string | undefined = event?.parameter?.method?.toLowerCase();

    const method: RequestMethod =
      Object.values(RequestMethod).find((v: RequestMethod): boolean => v === methodParam) ||
      methodRequest;

    const rawPathname: string =
      event?.pathInfo || event?.parameter?.path || event?.parameter?.pathname || "/";

    const pathname: string = normalize(rawPathname);

    const search: string | undefined = ((params: string | undefined): string | undefined =>
      isString(params) && params.length > 0 ? `?${params}` : undefined)(event?.queryString);

    const url: ParsedUrl = {
      pathname,
      path: search ? `${pathname}${search}` : pathname,
      search,
      query: event?.parameters ?? {}
    };

    const rawBody: string | null = [
      RequestMethod.POST,
      RequestMethod.PUT,
      RequestMethod.PATCH,
      RequestMethod.DELETE
    ].includes(method)
      ? "postData" in event
        ? event?.postData?.contents
        : null
      : null;

    const body: unknown = ((): unknown => {
      if (!isString(rawBody)) {
        return rawBody;
      }

      const contentType: string =
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
