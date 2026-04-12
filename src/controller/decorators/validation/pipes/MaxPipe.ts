import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating that a number or bigint is at most a specified maximum.
 */
export class MaxPipe implements PipeTransform<number | bigint, number | bigint> {
  /**
   * The maximum allowed value.
   */
  private readonly max: number | bigint;

  /**
   * Creates an instance of MaxPipe.
   *
   * @param   {number | bigint} max - The maximum allowed value.
   */
  constructor(max: number | bigint) {
    this.max = max;
  }

  /**
   * Transforms the input value to ensure it's at most the maximum.
   *
   * @param   {number | bigint} value - The value to validate.
   * @param   {ArgumentMetadata} metadata - The argument metadata.
   * @returns {number | bigint} The validated value.
   */
  public transform(value: number | bigint, metadata: ArgumentMetadata): number | bigint {
    if (value > this.max) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must be at most ${this.max})`
      );
    }

    return value;
  }
}
