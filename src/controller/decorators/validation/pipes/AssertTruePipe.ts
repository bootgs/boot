import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating that a value is true.
 */
export class AssertTruePipe implements PipeTransform<boolean, boolean> {
  public transform(value: boolean, metadata: ArgumentMetadata): boolean {
    if (value !== true) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must be true)`
      );
    }

    return value;
  }
}
