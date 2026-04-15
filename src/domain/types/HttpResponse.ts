import { HttpHeaders } from "./HttpHeaders";
import { ContentMimeType, HttpStatus } from "../../domain/enums";

/**
 * Interface representing an HTTP response.
 */
export interface HttpResponse {

  /**
   * HTTP response headers.
   */
  headers: HttpHeaders;

  /**
   * Indicates whether the response was successful.
   */
  ok: boolean;

  /**
   * HTTP response status code.
   */
  status: HttpStatus;

  /**
   * HTTP response status text.
   */
  statusText: string;

  /**
   * Response body content.
   */
  body: unknown;

  /**
   * The produced MIME type.
   */
  produce?: ContentMimeType;

  /**
   * Indicates whether the response should be serialized directly into the response body.
   */
  isResponseBody?: boolean;
}
