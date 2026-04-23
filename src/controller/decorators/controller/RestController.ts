import { HttpController } from "./HttpController";
import { ResponseBody } from "../web/ResponseBody";

/**
 * Decorator that marks a class as a REST controller.
 *
 * @param   {string} [path] - The base path for all routes in the controller.
 * @returns {ClassDecorator} A decorator.
 *
 * @example
 * ```TypeScript
 * import { RestController, Get, Param } from "bootgs";
 *
 * @RestController("/users")
 * class UserController {
 *   @Get("{id}")
 *   findOne(@Param("id") id: string) {
 *     return { id };
 *   }
 * }
 * ```
 */
export function RestController(path?: string): ClassDecorator {
  return (target: object): void => {
    HttpController(path)(target as any);
    ResponseBody()(target as any);
  };
}
