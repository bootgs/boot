import { CONTROLLER_ADVICE_WATERMARK } from "../../domain/constants";

/**
 * Checks if the target is a controller advice.
 *
 * @param   {any} target - The target to check.
 * @returns {boolean} `true` if it's a controller advice; otherwise, `false`.
 */
export function isControllerAdvice(target: any): boolean {
  if (!target) {
    return false;
  }

  const constructor = typeof target === "function" ? target : target.constructor;

  return !!Reflect.getMetadata(CONTROLLER_ADVICE_WATERMARK, constructor);
}
