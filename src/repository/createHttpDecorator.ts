import { METHOD_METADATA, PATH_METADATA, PRODUCE_METADATA } from "../domain/constants";
import { ContentMimeType, RequestMethod } from "../domain/enums";

/**
 * Options for HTTP decorators.
 */
export interface HttpDecoratorOptions {
  /**
   * The path for the route.
   */
  path?: string;

  /**
   * The path for the route (alias for `path`).
   */
  value?: string;

  /**
   * The MIME type(s) that the route produces.
   */
  produces?: ContentMimeType | ContentMimeType[];
}

/**
 * A factory function that creates method decorators for HTTP methods.
 *
 * @param   {RequestMethod} method - The HTTP method to be associated with the decorator.
 * @returns {Function} A function that returns a method decorator.
 */
export function createHttpDecorator(method: RequestMethod) {
  return (options?: string | HttpDecoratorOptions): MethodDecorator => {
    const path: string =
      (typeof options === "string" ? options : options?.path || options?.value) || "/";

    const produces: ContentMimeType | ContentMimeType[] | undefined =
      typeof options === "object" ? options?.produces : undefined;

    return <T>(
      _target: object,
      _key: string | symbol,
      descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> => {
      if (descriptor.value) {
        Reflect.defineMetadata(METHOD_METADATA, method || RequestMethod.GET, descriptor.value);
        Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);

        if (produces) {
          Reflect.defineMetadata(
            PRODUCE_METADATA,
            Array.isArray(produces) ? produces[0] : produces,
            descriptor.value
          );
        }
      }

      return descriptor;
    };
  };
}
