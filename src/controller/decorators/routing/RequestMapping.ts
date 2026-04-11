import { CONTROLLER_OPTIONS_METADATA, METHOD_METADATA, PATH_METADATA } from "../../../domain/constants";
import { RequestMethod } from "../../../domain/enums";

/**
 * Interface representing RequestMapping options.
 */
export interface RequestMappingOptions {

  /**
   * The path for the route.
   */
  path?: string;

  /**
   * The path for the route (alias for `path`).
   */
  value?: string;

  /**
   * The HTTP method(s) for the route.
   */
  method?: RequestMethod | RequestMethod[];
}

/**
 * Decorator that maps HTTP requests to handler methods or controllers.
 *
 * @param   {string | RequestMappingOptions} [options] - Mapping options.
 * @returns {ClassDecorator & MethodDecorator} A decorator.
 *
 * @example
 * ```typescript
 * @RequestMapping({ path: '/users', method: RequestMethod.GET })
 * getUsers() {}
 *
 * @RequestMapping('/users')
 * class UserController {}
 * ```
 */
export function RequestMapping(
  options?: string | RequestMappingOptions
): ClassDecorator & MethodDecorator {
  const path: string =
    (typeof options === "string" ? options : options?.path || options?.value) || "/";

  const method: RequestMethod | RequestMethod[] | undefined =
    typeof options === "object" ? options?.method : undefined;

  return (
    target: object,
    _propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>
  ): void => {
    if (descriptor?.value) {
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);

      if (method) {
        Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
      }
    } else {
      const existingOptions: Record<string, any> =
        Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, target) || {};

      Reflect.defineMetadata(
        CONTROLLER_OPTIONS_METADATA,
        { ...existingOptions, basePath: path },
        target
      );
    }
  };
}
