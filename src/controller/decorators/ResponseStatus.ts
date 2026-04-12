import { RESPONSE_STATUS_METADATA } from "../../domain/constants";

/**
 * Decorator that sets the HTTP status code for the response.
 *
 * @param   {number} status - The HTTP status code.
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { Post, ResponseStatus } from "bootgs";
 *
 * @Post("/users")
 * @ResponseStatus(201)
 * create() {
 *   return { created: true };
 * }
 * ```
 */
export function ResponseStatus(status: number): MethodDecorator {
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
