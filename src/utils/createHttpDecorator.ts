import { RequestMethod } from "types";
import { METHOD_METADATA, PATH_METADATA } from "config/constants";

/**
 * A factory function that creates method decorators for HTTP methods.
 * It is not intended for direct use.
 *
 * @param       method - The HTTP method to be associated with the decorator.
 * @returns     A function that returns a method decorator.
 * @environment `Google Apps Script`
 */
export function createHttpDecorator(method: RequestMethod) {
  return (path?: string): MethodDecorator => {
    return (
      target: object,
      key: string | symbol,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor: TypedPropertyDescriptor<any>
    ) => {
      Reflect.defineMetadata(
        METHOD_METADATA,
        method || RequestMethod.GET,
        descriptor.value
      );

      Reflect.defineMetadata(
        PATH_METADATA,
        !path ? "/" : path,
        descriptor.value
      );

      return descriptor;
    };
  };
}
