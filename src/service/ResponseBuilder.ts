import { isHtmlOutput, isString, isTextOutput } from "apps-script-utils";
import { ContentMimeType, HttpStatus, RequestMethod } from "../domain/enums";
import { HttpHeaders, HttpRequest, HttpResponse } from "../domain/types";

/**
 * Service for building and wrapping HTTP responses.
 */
export class ResponseBuilder {
  /**
   * Creates a new instance of ResponseBuilder.
   *
   * @param {string} [_apiPrefix] - The prefix for API routes (legacy, not used).
   */
  constructor(_apiPrefix?: string | null) {}

  /**
   * Creates a structured HttpResponse object.
   *
   * @param   {HttpRequest} request - The original request object.
   * @param   {HttpStatus} [status] - The desired HTTP status code.
   * @param   {HttpHeaders} [headers] - Optional custom headers.
   * @param   {unknown} [data] - The data to be sent in the response body.
   * @param   {ContentMimeType} [produce] - The produced MIME type.
   * @param   {boolean} [isResponseBody] - Indicates whether the response should be serialized directly into the response body.
   * @returns {HttpResponse} A structured object representing the HTTP response.
   */
  public create(
    request: HttpRequest,
    status: HttpStatus | undefined,
    headers: HttpHeaders | undefined = {},
    data: unknown = null,
    produce?: ContentMimeType,
    isResponseBody: boolean = false
  ): HttpResponse {
    const resolvedStatus: HttpStatus =
      status ??
      ([RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS].includes(request.method)
        ? HttpStatus.OK
        : HttpStatus.CREATED);

    const statusText: string = ((): string => {
      const entry: [string, HttpStatus] | undefined = Object.entries(HttpStatus).find(
        ([, value]: [string, unknown]): boolean => value === resolvedStatus
      ) as [string, HttpStatus] | undefined;

      return entry ? entry[0] : "UNKNOWN_STATUS";
    })();

    const ok: boolean = resolvedStatus >= 200 && resolvedStatus < 300;

    return {
      headers,
      ok,
      status: resolvedStatus,
      statusText,
      body: ok || isHtmlOutput(data) || isTextOutput(data) ? data : { error: data },
      produce,
      isResponseBody
    };
  }

  /**
   * Wraps a HttpResponse object into a format suitable for return from Apps Script entry points.
   *
   * @param   {HttpRequest} request - The structured request object.
   * @param   {HttpResponse} response - The structured response object to be wrapped.
   * @returns {GoogleAppsScript.Content.TextOutput | GoogleAppsScript.HTML.HtmlOutput | string} A value that Apps Script can return directly to the client.
   */
  public wrap(
    request: HttpRequest,
    response: HttpResponse
  ): GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string {
    const contentMimeType: ContentMimeType = response.produce || ContentMimeType.HTML;

    response.headers["Content-Type"] = contentMimeType;

    const source: string | undefined = request.headers?.["X-Request-Source"];

    const isInternal: boolean = source === "internal";

    if (!isInternal && (isHtmlOutput(response.body) || isTextOutput(response.body))) {
      return response.body;
    }

    const target = this.prepareTarget(response, isInternal);

    const content: string = this.serialize(
      target,
      contentMimeType,
      !!response.isResponseBody,
      isInternal
    );

    if (isInternal) {
      return content;
    }

    return this.createOutput(content, contentMimeType);
  }

  /**
   * Prepares the target object for serialization.
   * Handles extraction of content from GAS output objects if necessary.
   *
   * @param   {HttpResponse} response - The original response.
   * @param   {boolean} isInternal
   * @returns {unknown} The prepared target object.
   * @private
   */
  private prepareTarget(response: HttpResponse, isInternal: boolean): unknown {
    if (isInternal || response.isResponseBody) {
      if (isHtmlOutput(response.body) || isTextOutput(response.body)) {
        return {
          ...response,
          body: response.body.getContent()
        };
      }

      return response;
    }

    return response.body;
  }

  /**
   * Serializes the target to a string.
   *
   * @param   {unknown} target - The object to serialize.
   * @param   {ContentMimeType} mimeType - The content MIME type.
   * @param   {boolean} isResponseBody - Whether @ResponseBody is used.
   * @param   {boolean} isInternal
   * @returns {string} The serialized string.
   * @private
   */
  private serialize(
    target: unknown,
    mimeType: ContentMimeType,
    isResponseBody: boolean,
    isInternal: boolean
  ): string {
    if (mimeType === ContentMimeType.HTML && isString(target) && !isResponseBody && !isInternal) {
      return target;
    }

    return JSON.stringify(target);
  }

  /**
   * Creates the final GAS output object.
   *
   * @param   {string} content - The serialized content.
   * @param   {ContentMimeType} mimeType - The content MIME type.
   * @returns {GoogleAppsScript.Content.TextOutput | GoogleAppsScript.HTML.HtmlOutput} The GAS output object.
   * @private
   */
  private createOutput(
    content: string,
    mimeType: ContentMimeType
  ): GoogleAppsScript.Content.TextOutput | GoogleAppsScript.HTML.HtmlOutput {
    if (mimeType === ContentMimeType.HTML) {
      return HtmlService.createHtmlOutput(content);
    }

    const gasMimeType: GoogleAppsScript.Content.MimeType = this.mapToGasMimeType(mimeType);

    return ContentService.createTextOutput(content).setMimeType(gasMimeType);
  }

  /**
   * Maps an internal MIME type to GAS MimeType enum.
   *
   * @param   {ContentMimeType} mimeType - Our internal MIME type.
   * @returns {GoogleAppsScript.Content.MimeType} Google's MIME type.
   * @private
   */
  private mapToGasMimeType(mimeType: ContentMimeType): GoogleAppsScript.Content.MimeType {
    const map: Partial<Record<ContentMimeType, GoogleAppsScript.Content.MimeType>> = {
      [ContentMimeType.ATOM]: ContentService.MimeType.ATOM,
      [ContentMimeType.CSV]: ContentService.MimeType.CSV,
      [ContentMimeType.ICAL]: ContentService.MimeType.ICAL,
      [ContentMimeType.JAVASCRIPT]: ContentService.MimeType.JAVASCRIPT,
      [ContentMimeType.JSON]: ContentService.MimeType.JSON,
      [ContentMimeType.RSS]: ContentService.MimeType.RSS,
      [ContentMimeType.TEXT]: ContentService.MimeType.TEXT,
      [ContentMimeType.VCARD]: ContentService.MimeType.VCARD,
      [ContentMimeType.XML]: ContentService.MimeType.XML
    };

    return map[mimeType] || ContentService.MimeType.TEXT;
  }
}
