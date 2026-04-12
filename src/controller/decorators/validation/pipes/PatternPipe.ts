import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating a string against a regular expression.
 */
export class PatternPipe implements PipeTransform<string, string> {
  private readonly regexp: RegExp;

  /**
   * Creates an instance of PatternPipe.
   *
   * @param   {string | RegExp} regexp - The regular expression to match.
   */
  constructor(regexp: string | RegExp) {
    this.regexp = typeof regexp === "string" ? new RegExp(regexp) : regexp;
  }

  public transform(value: string, metadata: ArgumentMetadata): string {
    if (value === null || value === undefined || !this.regexp.test(value)) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must match pattern ${this.regexp})`
      );
    }

    return value;
  }
}
