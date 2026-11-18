// SPDX-License-Identifier: Apache-2.0
import { ArgumentMetadata, PipeTransform } from "../../../../domain/types";

/**
 * Pipe for validating that a value is not null, undefined, or empty.
 */
export class NotEmptyPipe implements PipeTransform<unknown, unknown> {
  public transform<T>(value: T, metadata: ArgumentMetadata): T {
    if (value === null || value === undefined) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must not be empty)`
      );
    }

    const { length, size }: { length?: unknown; size?: unknown } = value as {
      length?: unknown;
      size?: unknown;
    };

    if (typeof length === "number" && length === 0) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must not be empty)`
      );
    }

    if (typeof size === "number" && size === 0) {
      throw new Error(
        `Validation failed (${metadata.data ? `for "${metadata.data}" ` : ""}value must not be empty)`
      );
    }

    return value;
  }
}
