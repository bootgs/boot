import { HeaderAcceptMimeType, HttpStatus, RequestMethod } from "../domain/enums";
import { HttpHeaders, HttpRequest, HttpResponse } from "../domain/types";

export class ResponseBuilder {
  /**
   * Creates a structured HttpResponse object.
   *
   * @param   {HttpRequest} request - The original request object.
   * @param   {HttpStatus} [status] - The desired HTTP status code.
   * @param   {HttpHeaders} [headers] - Optional custom headers.
   * @param   {unknown} [data] - The data to be sent in the response body.
   * @returns {HttpResponse} A structured object representing the HTTP response.
   */
  public create(
    request: HttpRequest,
    status: HttpStatus | undefined,
    headers: HttpHeaders | undefined = {},
    data: unknown = null
  ): HttpResponse {
    const resolvedStatus =
      status ??
      ([RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS].includes(request.method)
        ? HttpStatus.OK
        : HttpStatus.CREATED);

    const statusText = ((): string => {
      const entry = Object.entries(HttpStatus).find(([, value]) => value === resolvedStatus);

      return entry ? entry[0] : "UNKNOWN_STATUS";
    })();

    const ok = resolvedStatus >= 200 && resolvedStatus < 300;

    return {
      headers,
      ok,
      status: resolvedStatus,
      statusText,
      body: ok ? data : { error: data }
    };
  }

  /**
   * Wraps a HttpResponse object into a format suitable for return from Apps Script entry points.
   *
   * @param   {HttpRequest} request - The structured request object.
   * @param   {HttpResponse} response - The structured response object to be wrapped.
   * @returns {string | GoogleAppsScript.Content.TextOutput | GoogleAppsScript.HTML.HtmlOutput} A value that Apps Script can return directly to the client.
   */
  public wrap(
    request: HttpRequest,
    response: HttpResponse
  ): string | GoogleAppsScript.Content.TextOutput | GoogleAppsScript.HTML.HtmlOutput {
    const mimeType = (request.headers?.Accept as HeaderAcceptMimeType) || HeaderAcceptMimeType.HTML;

    response.headers["Content-Type"] = mimeType;

    const isApi = request.url.pathname?.startsWith("/api/") || false;

    const result = JSON.stringify(isApi ? response : response.body);

    switch (mimeType) {
      case HeaderAcceptMimeType.GOOGLE_JSON:
        return result;

      case HeaderAcceptMimeType.GOOGLE_TEXT:
        return result;

      case HeaderAcceptMimeType.JSON:
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);

      case HeaderAcceptMimeType.TEXT:
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.TEXT);

      case HeaderAcceptMimeType.HTML:
        return HtmlService.createHtmlOutput(result);

      default:
        return HtmlService.createHtmlOutput(result);
    }
  }
}
