import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP POST requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```typescript
 * import { Post, Body, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Post()
 *   create(@Body() user: any) {
 *     return user;
 *   }
 * }
 * ```
 */
export const Post = createHttpDecorator(RequestMethod.POST);
