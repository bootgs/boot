import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for parsing input as integers.
 *
 * @example
 * ```TypeScript
 * import { Get, Param, ParseNumberPipe, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get("/{id}")
 *   getUser(@Param("id", ParseNumberPipe) id: number) {
 *     return { id };
 *   }
 * }
 * ```
 */
export class ParseNumberPipe implements PipeTransform<string | number, number> {
  /**
   * Transforms the input value to an integer.
   *
   * @param   {string | number} value - The value to transform.
   * @param   {ArgumentMetadata} metadata - The argument metadata.
   * @returns {number} The parsed integer.
   */
  public transform(value: string | number, metadata: ArgumentMetadata): number {
    const isNumeric: boolean =
      (typeof value === "number" || (typeof value === "string" && value.trim() !== "")) &&
      !isNaN(Number(value));

    if (!isNumeric) {
      throw new Error(`Validation failed (number string is expected for "${metadata.data}")`);
    }

    return parseInt(String(value), 10);
  }
}
