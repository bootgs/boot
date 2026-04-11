import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for parsing input as floating-point numbers.
 *
 * @example
 * ```typescript
 * @Get()
 * get(@Query('price', ParseFloatPipe) price: number) {}
 * ```
 */
export class ParseFloatPipe implements PipeTransform<string | number, number> {
  /**
   * Transforms the input value to a float.
   *
   * @param {string | number} value The value to transform.
   * @param {ArgumentMetadata} metadata The argument metadata.
   * @returns {number} The parsed float.
   */
  public transform(value: string | number, metadata: ArgumentMetadata): number {
    const isNumeric: boolean =
      (typeof value === "number" || (typeof value === "string" && value.trim() !== "")) &&
      !isNaN(Number(value));

    if (!isNumeric) {
      throw new Error(`Validation failed (number string is expected for "${metadata.data}")`);
    }

    return parseFloat(String(value));
  }
}
