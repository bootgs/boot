import { INJECTABLE_WATERMARK } from "../../domain/constants";
import { Newable } from "../../domain/types";

/**
 * Checks whether the provided class is marked as Injectable.
 *
 * @param   {Newable} value - The class to check.
 * @returns {boolean} `true` if the class has injectable metadata; otherwise, `false`.
 */
export function isInjectable(value: Newable): boolean {
  return !!Reflect.hasMetadata(INJECTABLE_WATERMARK, value);
}
