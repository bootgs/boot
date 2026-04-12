/**
 * Enum of MIME types used in the Accept header to determine the response format.
 *
 * @see https://developers.google.com/apps-script/reference/content/mime-type
 */
export enum HeaderAcceptMimeType {
  /**
   * Special type for returning a JSON string directly (without TextOutput).
   * Used for internal Google Apps Script purposes.
   */
  GOOGLE_TEXT = "google/plain",

  /**
   * Special type for returning a JSON string directly (without TextOutput).
   * Used for internal Google Apps Script purposes.
   */
  GOOGLE_JSON = "google/json",

  /**
   * HTML content.
   *
   * @see https://developers.google.com/apps-script/reference/html/html-service
   */
  HTML = "text/html",

  /**
   * Plain text.
   *
   * @see https://developers.google.com/apps-script/reference/content/mime-type
   */
  TEXT = "text/plain",

  /**
   * JSON formatted data.
   *
   * @see https://developers.google.com/apps-script/reference/content/mime-type
   */
  JSON = "application/json"
}
