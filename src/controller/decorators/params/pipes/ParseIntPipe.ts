import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for parsing input as integers.
 *
 * @example
 * ```TypeScript
 * import { Get, Query, ParseIntPipe, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get("/search")
 *   search(@Query("id", ParseIntPipe) id: number) {
 *     return { id };
 *   }
 * }
 * ```
 */
export class ParseIntPipe implements PipeTransform<string | number, number> {
  /**
   * Transforms the input value to an integer.
   *
   * @param   {string | number} value - The value to transform.
   * @param   {ArgumentMetadata} metadata - The argument metadata.
   * @returns {number} The parsed integer.
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

    const result: number = parseInt(String(value), 10);

    if (isNaN(result)) {
      throw new Error(
        `Validation failed (numeric string is expected${metadata.data ? ` for "${metadata.data}"` : ""})`
      );
    }

    return result;
  }
}
