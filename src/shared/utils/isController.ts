import { CONTROLLER_WATERMARK } from "../../domain/constants";
import { Newable } from "../../domain/types";

/**
 * Checks whether the provided class is marked as a Controller.
 *
 * @param {Newable} value The class to check.
 * @returns {boolean} True if the class has controller metadata; otherwise, false.
 */
export function isController(value: Newable): boolean {
  return !!Reflect.getMetadata(CONTROLLER_WATERMARK, value);
}
