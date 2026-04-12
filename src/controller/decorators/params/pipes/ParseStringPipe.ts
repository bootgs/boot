import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for parsing input as strings.
 *
 * @example
 * ```TypeScript
 * import { Get, Query, ParseStringPipe, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get("/search")
 *   search(@Query("q", ParseStringPipe) q: string) {
 *     return { q };
 *   }
 * }
 * ```
 */
export class ParseStringPipe implements PipeTransform<unknown, string> {
  /**
   * Transforms the input value to a string.
   *
   * @param   {unknown} value - The value to transform.
   * @param   {ArgumentMetadata} metadata - The argument metadata.
   * @returns {string} The parsed string.
   */
  public transform(value: unknown, _metadata: ArgumentMetadata): string {
    if (Array.isArray(value)) {
      value = value[0];
    }

    if (value === null || value === undefined) {
      return "";
    }

    return String(value);
  }
}
