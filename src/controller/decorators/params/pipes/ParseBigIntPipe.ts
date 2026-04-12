import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for parsing input as bigints.
 *
 * @example
 * ```TypeScript
 * import { Get, Query, ParseBigIntPipe, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get("/search")
 *   search(@Query("identifier", ParseBigIntPipe) identifier: bigint) {
 *     return { identifier };
 *   }
 * }
 * ```
 */
export class ParseBigIntPipe implements PipeTransform<string | number | bigint, bigint> {
  /**
   * Transforms the input value to a bigint.
   *
   * @param   {string | number | bigint} value - The value to transform.
   * @param   {ArgumentMetadata} metadata - The argument metadata.
   * @returns {bigint} The parsed bigint.
   */
  public transform(
    value: string | number | bigint | Array<string | number | bigint>,
    metadata: ArgumentMetadata
  ): bigint {
    if (Array.isArray(value)) {
      value = value[ 0 ];
    }

    try {
      return BigInt(value);
    } catch {
      throw new Error(
        `Validation failed (bigint string is expected${metadata.data ? ` for "${metadata.data}"` : ""})`
      );
    }
  }
}
