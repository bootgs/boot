/**
 * Interface representing an error response.
 */
export interface ErrorResponse {
  /**
   * The timestamp of the error.
   */
  timestamp: string;

  /**
   * The HTTP status code.
   */
  status: number;

  /**
   * The error type or title.
   */
  error: string;

  /**
   * The error message.
   */
  message: string;
}
