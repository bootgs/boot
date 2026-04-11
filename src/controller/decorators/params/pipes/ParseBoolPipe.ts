import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for parsing input as boolean.
 */
export class ParseBoolPipe implements PipeTransform<string | boolean, boolean> {
  /**
   * Transforms the input value to a boolean.
   *
   * @param {string | boolean} value The value to transform.
   * @param {ArgumentMetadata} metadata The argument metadata.
   * @returns {boolean} The parsed boolean.
   */
  public transform(value: string | boolean, metadata: ArgumentMetadata): boolean {
    if (value === true || value === "true") {
      return true;
    }

    if (value === false || value === "false") {
      return false;
    }

    throw new Error(`Validation failed (boolean string is expected for "${metadata.data}")`);
  }
}
