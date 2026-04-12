/**
 * Enum of parameter sources for method handlers.
 */
export enum ParamSource {
  /**
   * Path parameters.
   */
  PARAM = "PARAM",

  /**
   * Query parameters.
   */
  QUERY = "QUERY",

  /**
   * Request body.
   */
  BODY = "BODY",

  /**
   * HTTP headers.
   */
  HEADERS = "HEADERS",

  /**
   * HTTP request.
   */
  REQUEST = "REQUEST",

  /**
   * HTTP response.
   */
  RESPONSE = "RESPONSE",

  /**
   * Google Apps Script event.
   */
  EVENT = "EVENT",

  /**
   * Dependency injection.
   */
  INJECT = "INJECT",

  /**
   * Configuration value injection.
   */
  VALUE = "VALUE"
}
