import { HttpHeaders } from "./HttpHeaders";
import { ParsedUrl } from "./ParsedUrl";
import { RequestMethod } from "../../domain/enums";

/**
 * Interface representing an HTTP request.
 */
export interface HttpRequest {
  /**
   * HTTP request headers.
   */
  headers: HttpHeaders;

  /**
   * HTTP request method.
   */
  method: RequestMethod;

  /**
   * Parsed URL information.
   */
  url: ParsedUrl;

  /**
   * Request body content.
   */
  body: unknown;
}
