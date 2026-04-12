import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating that a value is false.
 */
export class AssertFalsePipe implements PipeTransform<boolean, boolean> {
  public transform(value: boolean, metadata: ArgumentMetadata): boolean {
    if (value !== false) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must be false)`
      );
    }

    return value;
  }
}
