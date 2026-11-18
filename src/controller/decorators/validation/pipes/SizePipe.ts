// SPDX-License-Identifier: Apache-2.0
import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating the size of a string, array, map, or set.
 */
export class SizePipe implements PipeTransform<unknown, unknown> {
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

  public transform<T>(value: T, metadata: ArgumentMetadata): T {
    const size: number = this.getSize(value);

    if (size < this.min || size > this.max) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}size must be between ${this.min} and ${this.max})`
      );
    }

    return value;
  }

  private getSize(value: unknown): number {
    if (value === null || value === undefined) {
      return 0;
    }

    const { length, size }: { length?: unknown; size?: unknown } = value as {
      length?: unknown;
      size?: unknown;
    };

    if (typeof length === "number") {
      return length;
    }

    if (typeof size === "number") {
      return size;
    }

    if (typeof value === "object") {
      return Object.keys(value).length;
    }

    return 0;
  }
}
