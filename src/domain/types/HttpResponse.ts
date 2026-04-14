import { HttpHeaders } from "./HttpHeaders";
import { HttpStatus } from "../../domain/enums";

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
}
