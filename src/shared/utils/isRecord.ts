import { isArray, isObject } from "apps-script-utils";

/**
 * Checks if a value is a plain object and can be treated as a record.
 *
 * @param {unknown} value The value to check.
 * @returns {value is Record<string | symbol, unknown>} True if the value is a record, false otherwise.
 */
export function isRecord(value: unknown): value is Record<string | symbol, unknown> {
  return isObject(value) && !isArray(value);
}
