import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating that a number or bigint is positive or zero (>= 0).
 */
export class PositiveOrZeroPipe implements PipeTransform<number | bigint, number | bigint> {
  public transform(value: number | bigint, metadata: ArgumentMetadata): number | bigint {
    if (value < 0) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must be positive or zero)`
      );
    }

    return value;
  }
}
