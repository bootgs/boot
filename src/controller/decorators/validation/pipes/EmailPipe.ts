import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";
import { isEmail } from "apps-script-utils";

/**
 * Pipe for validating that a string is a valid email address.
 */
export class EmailPipe implements PipeTransform<string, string> {
  public transform(value: string, metadata: ArgumentMetadata): string {
    if (value === null || value === undefined || !isEmail(value)) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must be a valid email address)`
      );
    }

    return value;
  }
}
