import { HeaderAcceptMimeType, HttpStatus, RequestMethod } from "../domain/enums";
import { HttpHeaders, HttpRequest, HttpResponse } from "../domain/types";

/**
 * Service for building and wrapping HTTP responses.
 */
export class ResponseBuilder {
  /**
   * The prefix for API routes.
   *
   * @private
   * @readonly
   */
  private readonly _apiPrefix: string;

  /**
   * Creates a new instance of ResponseBuilder.
   *
   * @param {string} apiPrefix - The prefix for API routes.
   */
  constructor(apiPrefix: string = "/api/") {
    this._apiPrefix = apiPrefix;
  }

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
    const resolvedStatus: HttpStatus =
      status ??
      ([ RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS ].includes(request.method)
        ? HttpStatus.OK
        : HttpStatus.CREATED);

    const statusText: string = ((): string => {
      const entry: [string, HttpStatus] | undefined = Object.entries(HttpStatus).find(
        ([ , value ]: [string, unknown]): boolean => value === resolvedStatus
      ) as [string, HttpStatus] | undefined;

      return entry ? entry[ 0 ] : "UNKNOWN_STATUS";
    })();

    const ok: boolean = resolvedStatus >= 200 && resolvedStatus < 300;

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
  ): GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string {
    const acceptHeader: string | undefined = request.headers?.Accept;

    const mimeType: HeaderAcceptMimeType =
      Object.values(HeaderAcceptMimeType).find(
        (v: HeaderAcceptMimeType): boolean => v === acceptHeader
      ) || HeaderAcceptMimeType.HTML;

    response.headers[ "Content-Type" ] = mimeType;

    const isApi: boolean = request.url.pathname?.startsWith(this._apiPrefix) || false;

    const result: string = JSON.stringify(isApi ? response : response.body);

    switch (mimeType) {
      case HeaderAcceptMimeType.GOOGLE_JSON: {
        return result;
      }

      case HeaderAcceptMimeType.GOOGLE_TEXT: {
        return result;
      }

      case HeaderAcceptMimeType.JSON: {
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
      }

      case HeaderAcceptMimeType.TEXT: {
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.TEXT);
      }

      case HeaderAcceptMimeType.HTML: {
        return HtmlService.createHtmlOutput(result);
      }

      default: {
        return HtmlService.createHtmlOutput(result);
      }
    }
  }
}
