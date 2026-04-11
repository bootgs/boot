import { RESPONSE_STATUS_METADATA } from "../../domain/constants";

/**
 * Decorator that sets the HTTP status code for the response.
 *
 * @param   {number} status - The HTTP status code.
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```typescript
 * @Get('/users')
 * @ResponseStatus(200)
 * getUsers() {}
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
