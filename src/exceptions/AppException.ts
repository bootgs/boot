import { HttpStatus } from "../domain";

/**
 * Base exception class for all exceptions in the application.
 *
 * @param   {string} message - The error message.
 * @param   {number} [status] - The HTTP status code.
 */
export class AppException extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    super(message);

    this.name = "AppException";
  }
}
