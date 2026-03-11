/**
 * Base exception class for all exceptions in the application.
 *
 * @param   {string} message - The error message.
 * @param   {number} [status] - The HTTP status code.
 */
export class AppException extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number = 500
  ) {
    super(message);
    this.name = "AppException";
  }
}
