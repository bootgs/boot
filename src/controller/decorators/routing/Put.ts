import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP PUT requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { RestController, Put, Body, Param } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Put("/{id}")
 *   update(@Param("id") id: string, @Body() user: any) {
 *     return { id, ...user };
 *   }
 * }
 * ```
 */
export const Put = createHttpDecorator(RequestMethod.PUT);
