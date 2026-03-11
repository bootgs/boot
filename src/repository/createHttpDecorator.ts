import { METHOD_METADATA, PATH_METADATA } from "../domain/constants";
import { RequestMethod } from "../domain/enums";

/**
 * A factory function that creates method decorators for HTTP methods.
 *
 * @param   {RequestMethod} method - The HTTP method to be associated with the decorator.
 * @returns {Function} A function that returns a method decorator.
 */
export function createHttpDecorator(method: RequestMethod) {
  return (path?: string): MethodDecorator => {
    return <T>(
      _target: object,
      _key: string | symbol,
      descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> => {
      if (descriptor.value) {
        Reflect.defineMetadata(METHOD_METADATA, method || RequestMethod.GET, descriptor.value);
        Reflect.defineMetadata(PATH_METADATA, !path ? "/" : path, descriptor.value);
      }

      return descriptor;
    };
  };
}
