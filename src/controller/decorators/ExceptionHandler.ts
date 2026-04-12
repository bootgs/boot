import { EXCEPTION_HANDLER_METADATA } from "../../domain/constants";
import { Newable } from "../../domain/types";

/**
 * Decorator that marks a method as an exception handler.
 *
 * @param   {...Newable<Error>[]} exceptions - The exceptions to handle.
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```typescript
 * import { ExceptionHandler, ResponseStatus } from "bootgs";
 *
 * @ExceptionHandler(Error)
 * @ResponseStatus(500)
 * handleError(error: Error) {
 *   return { message: error.message };
 * }
 * ```
 */
export function ExceptionHandler(...exceptions: Newable<Error>[]): MethodDecorator {
  return (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> => {
    if (descriptor.value) {
      Reflect.defineMetadata(EXCEPTION_HANDLER_METADATA, exceptions, descriptor.value);
    }

    return descriptor;
  };
}
