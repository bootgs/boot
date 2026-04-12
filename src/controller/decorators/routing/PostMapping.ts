import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP POST requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { PostMapping, Body, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @PostMapping()
 *   create(@Body() user: any) {
 *     return user;
 *   }
 * }
 * ```
 */
export const PostMapping = createHttpDecorator(RequestMethod.POST);
