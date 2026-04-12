import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating that a string is not null, empty, or only contains whitespace.
 */
export class NotBlankPipe implements PipeTransform<string, string> {
  public transform(value: string, metadata: ArgumentMetadata): string {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim().length === 0)
    ) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must not be blank)`
      );
    }

    return value;
  }
}
