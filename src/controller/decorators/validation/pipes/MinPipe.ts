import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating that a number or bigint is at least a specified minimum.
 *
 * @example
 * ```TypeScript
 * import { Get, Query, Min, RestController } from "bootgs";
 *
 * @RestController("/items")
 * class ItemsController {
 *   @Get()
 *   findAll(@Query("page") @Min(1) page: number) {
 *     return { page };
 *   }
 * }
 * ```
 */
export class MinPipe implements PipeTransform<number | bigint, number | bigint> {
  /**
   * The minimum allowed value.
   */
  private readonly min: number | bigint;

  /**
   * Creates an instance of MinPipe.
   *
   * @param   {number | bigint} min - The minimum allowed value.
   */
  constructor(min: number | bigint) {
    this.min = min;
  }

  /**
   * Transforms the input value to ensure it's at least the minimum.
   *
   * @param   {number | bigint} value - The value to validate.
   * @param   {ArgumentMetadata} metadata - The argument metadata.
   * @returns {number | bigint} The validated value.
   */
  public transform(value: number | bigint, metadata: ArgumentMetadata): number | bigint {
    if (value < this.min) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must be at least ${this.min})`
      );
    }

    return value;
  }
}
