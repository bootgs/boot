import { RESPONSE_STATUS_METADATA } from "../../../domain/constants";
import { HttpStatus } from "src/domain";

/**
 * Decorator that sets the HTTP status code for the response.
 *
 * @param   {number} status - The HTTP status code.
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { Post, ResponseStatus, HttpStatus } from "bootgs";
 *
 * @Post("/users")
 * @ResponseStatus(HttpStatus.CREATED)
 * create() {
 *   return { created: true };
 * }
 * ```
 */
export function ResponseStatus(status: HttpStatus): MethodDecorator {
  return (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> => {
    if (descriptor.value) {
      Reflect.defineMetadata(RESPONSE_STATUS_METADATA, status, descriptor.value);
    }

    return descriptor;
  };
}
