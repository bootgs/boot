import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating the size of a string, array, map, or set.
 */
export class SizePipe implements PipeTransform<any, any> {
  private readonly min: number;
  private readonly max: number;

  /**
   * Creates an instance of SizePipe.
   *
   * @param   {object} options - The size options.
   * @param   {number} [options.min=0] - The minimum size.
   * @param   {number} [options.max=Infinity] - The maximum size.
   */
  constructor({ min = 0, max = Infinity }: { min?: number; max?: number } = {}) {
    this.min = min;
    this.max = max;
  }

  public transform(value: any, metadata: ArgumentMetadata): any {
    const size: number = this.getSize(value);

    if (size < this.min || size > this.max) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}size must be between ${this.min} and ${this.max})`
      );
    }

    return value;
  }

  private getSize(value: any): number {
    if (value === null || value === undefined) {
      return 0;
    }

    if (typeof value.length === "number") {
      return value.length;
    }

    if (typeof value.size === "number") {
      return value.size;
    }

    if (typeof value === "object") {
      return Object.keys(value).length;
    }

    return 0;
  }
}
