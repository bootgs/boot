import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating that a value is not null, undefined, or empty.
 */
export class NotEmptyPipe implements PipeTransform<any, any> {
  public transform(value: any, metadata: ArgumentMetadata): any {
    if (value === null || value === undefined) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must not be empty)`
      );
    }

    if (typeof value.length === "number" && value.length === 0) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must not be empty)`
      );
    }

    if (typeof value.size === "number" && value.size === 0) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must not be empty)`
      );
    }

    return value;
  }
}
