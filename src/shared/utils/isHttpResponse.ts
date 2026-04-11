import { HttpResponse } from "../../domain/types";
import { isRecord } from "./isRecord";

/**
 * Checks if a value is a valid {@link HttpResponse} object.
 *
 * @param   {unknown} value - The value to check.
 * @returns {value is HttpResponse} `true` if the value is an {@link HttpResponse}, `false` otherwise.
 */
export function isHttpResponse(value: unknown): value is HttpResponse {
  return isRecord(value) && "status" in value && "body" in value;
}
