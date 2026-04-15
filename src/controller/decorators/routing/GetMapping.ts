import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator, HttpDecoratorOptions } from "../../../repository";

/**
 * Route handler decorator for HTTP GET requests.
 *
 * @param   {string | HttpDecoratorOptions} [options] - Route path or options (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { GetMapping, Param, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @GetMapping("/{id}")
 *   findOne(@Param("id") id: string) {
 *     return { id };
 *   }
 * }
 * ```
 */
export const GetMapping = createHttpDecorator(RequestMethod.GET);
