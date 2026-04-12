import { CONTROLLER_ADVICE_WATERMARK, INJECTABLE_WATERMARK } from "../../domain/constants";

/**
 * Decorator that marks a class as a controller advice.
 * Global exception handlers can be defined in these classes.
 *
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```typescript
 * import { ControllerAdvice, ExceptionHandler } from "bootgs";
 *
 * @ControllerAdvice()
 * class GlobalExceptionHandler {
 *   @ExceptionHandler(Error)
 *   handleError(error: Error) {
 *     return { message: error.message };
 *   }
 * }
 * ```
 */
export function ControllerAdvice(): ClassDecorator {
  return (target: object): void => {
    Reflect.defineMetadata(CONTROLLER_ADVICE_WATERMARK, true, target);
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target); // Advice should also be injectable
  };
}

/**
 * Alias for `@ControllerAdvice()`.
 *
 * @example
 * ```typescript
 * import { RestControllerAdvice } from "bootgs";
 *
 * @RestControllerAdvice()
 * class GlobalExceptionHandler {}
 * ```
 */
export const RestControllerAdvice = ControllerAdvice;
