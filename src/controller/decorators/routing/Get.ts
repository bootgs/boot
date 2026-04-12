import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP GET requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { Get, Param, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get("/{id}")
 *   findOne(@Param("id") id: string) {
 *     return { id };
 *   }
 * }
 * ```
 */
export const Get = createHttpDecorator(RequestMethod.GET);
