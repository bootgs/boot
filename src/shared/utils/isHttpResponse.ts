import { HttpResponse } from "../domain/types";
import { isRecord } from "./isRecord";

/**
 * Checks if a value is a valid HttpResponse object.
 *
 * @param {unknown} value The value to check.
 * @returns {value is HttpResponse} True if the value is an HttpResponse, false otherwise.
 */
export function isHttpResponse(value: unknown): value is HttpResponse {
  return isRecord(value) && "status" in value && "body" in value;
}
