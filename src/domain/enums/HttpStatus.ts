/**
 * Enum of HTTP status codes.
 */
export enum HttpStatus {
  /**
   * Continue (100).
   */
  CONTINUE = 100,

  /**
   * Switching Protocols (101).
   */
  SWITCHING_PROTOCOLS = 101,

  /**
   * Processing (102).
   */
  PROCESSING = 102,

  /**
   * Early Hints (103).
   */
  EARLYHINTS = 103,

  /**
   * OK (200).
   */
  OK = 200,

  /**
   * Created (201).
   */
  CREATED = 201,

  /**
   * Accepted (202).
   */
  ACCEPTED = 202,

  /**
   * Non-Authoritative Information (203).
   */
  NON_AUTHORITATIVE_INFORMATION = 203,

  /**
   * No ContentMimeType (204).
   */
  NO_CONTENT = 204,

  /**
   * Reset ContentMimeType (205).
   */
  RESET_CONTENT = 205,

  /**
   * Partial ContentMimeType (206).
   */
  PARTIAL_CONTENT = 206,

  /**
   * Multi-Status (207).
   */
  MULTI_STATUS = 207,

  /**
   * Already Reported (208).
   */
  ALREADY_REPORTED = 208,

  /**
   * ContentMimeType Different (210).
   */
  CONTENT_DIFFERENT = 210,

  /**
   * Ambiguous (300).
   */
  AMBIGUOUS = 300,

  /**
   * Moved Permanently (301).
   */
  MOVED_PERMANENTLY = 301,

  /**
   * Found (302).
   */
  FOUND = 302,

  /**
   * See Other (303).
   */
  SEE_OTHER = 303,

  /**
   * Not Modified (304).
   */
  NOT_MODIFIED = 304,

  /**
   * Temporary Redirect (307).
   */
  TEMPORARY_REDIRECT = 307,

  /**
   * Permanent Redirect (308).
   */
  PERMANENT_REDIRECT = 308,

  /**
   * Bad Request (400).
   */
  BAD_REQUEST = 400,

  /**
   * Unauthorized (401).
   */
  UNAUTHORIZED = 401,

  /**
   * Payment Required (402).
   */
  PAYMENT_REQUIRED = 402,

  /**
   * Forbidden (403).
   */
  FORBIDDEN = 403,

  /**
   * Not Found (404).
   */
  NOT_FOUND = 404,

  /**
   * Method Not Allowed (405).
   */
  METHOD_NOT_ALLOWED = 405,

  /**
   * Not Acceptable (406).
   */
  NOT_ACCEPTABLE = 406,

  /**
   * Proxy Authentication Required (407).
   */
  PROXY_AUTHENTICATION_REQUIRED = 407,

  /**
   * Request Timeout (408).
   */
  REQUEST_TIMEOUT = 408,

  /**
   * Conflict (409).
   */
  CONFLICT = 409,

  /**
   * Gone (410).
   */
  GONE = 410,

  /**
   * Length Required (411).
   */
  LENGTH_REQUIRED = 411,

  /**
   * Precondition Failed (412).
   */
  PRECONDITION_FAILED = 412,

  /**
   * Payload Too Large (413).
   */
  PAYLOAD_TOO_LARGE = 413,

  /**
   * URI Too Long (414).
   */
  URI_TOO_LONG = 414,

  /**
   * Unsupported Media Type (415).
   */
  UNSUPPORTED_MEDIA_TYPE = 415,

  /**
   * Requested Range Not Satisfiable (416).
   */
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,

  /**
   * Expectation Failed (417).
   */
  EXPECTATION_FAILED = 417,

  /**
   * I am a teapot (418).
   */
  I_AM_A_TEAPOT = 418,

  /**
   * Misdirected (421).
   */
  MISDIRECTED = 421,

  /**
   * Unprocessable Entity (422).
   */
  UNPROCESSABLE_ENTITY = 422,

  /**
   * Locked (423).
   */
  LOCKED = 423,

  /**
   * Failed Dependency (424).
   */
  FAILED_DEPENDENCY = 424,

  /**
   * Precondition Required (428).
   */
  PRECONDITION_REQUIRED = 428,

  /**
   * Too Many Requests (429).
   */
  TOO_MANY_REQUESTS = 429,

  /**
   * Unrecoverable Error (456).
   */
  UNRECOVERABLE_ERROR = 456,

  /**
   * Internal Server Error (500).
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * Not Implemented (501).
   */
  NOT_IMPLEMENTED = 501,

  /**
   * Bad Gateway (502).
   */
  BAD_GATEWAY = 502,

  /**
   * Service Unavailable (503).
   */
  SERVICE_UNAVAILABLE = 503,

  /**
   * Gateway Timeout (504).
   */
  GATEWAY_TIMEOUT = 504,

  /**
   * HTTP Version Not Supported (505).
   */
  HTTP_VERSION_NOT_SUPPORTED = 505,

  /**
   * Insufficient Storage (507).
   */
  INSUFFICIENT_STORAGE = 507,

  /**
   * Loop Detected (508).
   */
  LOOP_DETECTED = 508
}
