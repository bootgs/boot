import { HeaderAcceptMimeType, HttpRequest, HttpResponse } from "../types";

/**
 * Wraps a {@link HttpResponse} object into a format suitable for return from Apps Script entry point functions (e.g., `doGet`, `doPost`).
 *
 * This method determines the appropriate output type (TextOutput, HtmlOutput, or raw string) based on the `Accept` header in the incoming {@link HttpRequest} and the content type.
 *
 * @param   request - The structured request object, including headers and URL.
 * @param   response - The structured response object to be wrapped.
 * @returns A value that Apps Script can return directly to the client (e.g., web browser, Google Sheets UI).
 */
export function wrapResponse(
  request: HttpRequest,
  response: HttpResponse
):
  | string
  | GoogleAppsScript.Content.TextOutput
  | GoogleAppsScript.HTML.HtmlOutput {
  const mimeType =
    (request.headers?.Accept as HeaderAcceptMimeType) ||
    HeaderAcceptMimeType.HTML;

  response.headers["Content-Type"] = mimeType;

  const isApi = request.url.pathname?.startsWith("/api/") || false;
  const result = JSON.stringify(isApi ? response : response.body);

  switch (mimeType) {
    case HeaderAcceptMimeType.GOOGLE_JSON:
      return result;

    case HeaderAcceptMimeType.GOOGLE_TEXT:
      return result;

    case HeaderAcceptMimeType.JSON:
      return ContentService.createTextOutput(result).setMimeType(
        ContentService.MimeType.JSON
      );

    case HeaderAcceptMimeType.TEXT:
      return ContentService.createTextOutput(result).setMimeType(
        ContentService.MimeType.TEXT
      );

    case HeaderAcceptMimeType.HTML:
      return HtmlService.createHtmlOutput(result);
  }
}
