import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP PATCH requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { RestController, Patch, Body, Param } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Patch("/{id}")
 *   partialUpdate(@Param("id") id: string, @Body() partialUser: any) {
 *     return { id, ...partialUser };
 *   }
 * }
 * ```
 */
export const Patch = createHttpDecorator(RequestMethod.PATCH);
