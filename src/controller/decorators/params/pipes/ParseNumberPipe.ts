import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for parsing input as numbers.
 *
 * @example
 * ```TypeScript
 * import { Get, Param, ParseNumberPipe, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get("/{identifier}")
 *   getUser(@Param("identifier", ParseNumberPipe) identifier: number) {
 *     return { identifier };
 *   }
 * }
 * ```
 */
export class ParseNumberPipe implements PipeTransform<string | number, number> {
  /**
   * Transforms the input value to a number.
   *
   * @param   {string | number} value - The value to transform.
   * @param   {ArgumentMetadata} metadata - The argument metadata.
   * @returns {number} The parsed number.
   */
  public transform(
    value: string | number | Array<string | number>,
    metadata: ArgumentMetadata
  ): number {
    if (Array.isArray(value)) {
      value = value[0];
    }

    const isNumeric: boolean =
      (typeof value === "number" || (typeof value === "string" && value.trim() !== "")) &&
      !isNaN(Number(value));

    if (!isNumeric) {
      throw new Error(
        `Validation failed (numeric string is expected${metadata.data ? ` for "${metadata.data}"` : ""})`
      );
    }

    return Number(value);
  }
}
