import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for parsing input as boolean.
 *
 * @example
 * ```TypeScript
 * import { Get, Query, ParseBooleanPipe, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get("/search")
 *   search(@Query("active", ParseBooleanPipe) active: boolean) {
 *     return { active };
 *   }
 * }
 * ```
 */
export class ParseBooleanPipe implements PipeTransform<string | boolean, boolean> {
  /**
   * Transforms the input value to a boolean.
   *
   * @param   {string | boolean} value - The value to transform.
   * @param   {ArgumentMetadata} metadata - The argument metadata.
   * @returns {boolean} The parsed boolean.
   */
  public transform(
    value: string | null | undefined | number | boolean | Array<string | number | boolean>,
    metadata: ArgumentMetadata
  ): boolean {
    if (Array.isArray(value)) {
      value = value[0];
    }

    if (value === true || value === "true" || value === 1 || value === "1") {
      return true;
    }

    if (
      value === false ||
      value === "false" ||
      value === 0 ||
      value === "0" ||
      value === null ||
      value === undefined
    ) {
      return false;
    }

    throw new Error(
      `Validation failed (boolean string is expected${metadata.data ? ` for "${metadata.data}"` : ""})`
    );
  }
}
