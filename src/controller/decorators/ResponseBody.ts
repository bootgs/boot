import { RESPONSE_BODY_METADATA } from "../../domain/constants";

/**
 * Decorator that tells the controller that the return object should be serialized
 * directly into the HTTP response body.
 *
 * In this framework, this is the default behavior for all controller methods,
 * but this decorator is provided for compatibility with Spring Boot patterns.
 *
 * @returns {MethodDecorator & ClassDecorator} A decorator.
 *
 * @example
 * ```TypeScript
 * import { ResponseBody, GetMapping, Controller } from "bootgs";
 *
 * @Controller()
 * class MyController {
 *   @GetMapping("/data")
 *   @ResponseBody
 *   getData() {
 *     return { message: "Hello" };
 *   }
 * }
 * ```
 */
export function ResponseBody(): MethodDecorator & ClassDecorator {
  return (
    target: object,
    propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>
  ): void => {
    if (propertyKey) {
      if (descriptor && descriptor.value) {
        Reflect.defineMetadata(RESPONSE_BODY_METADATA, true, descriptor.value);
      } else {
        Reflect.defineMetadata(RESPONSE_BODY_METADATA, true, target, propertyKey);
      }
    } else {
      Reflect.defineMetadata(RESPONSE_BODY_METADATA, true, target);
    }
  };
}
