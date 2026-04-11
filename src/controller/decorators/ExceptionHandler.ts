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
 * @ExceptionHandler(UserNotFoundException)
 * handleUserNotFound(exception: UserNotFoundException) {
 *   return { message: exception.message };
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
