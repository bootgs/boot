import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator, HttpDecoratorOptions } from "../../../repository";

/**
 * Route handler decorator for HTTP POST requests.
 *
 * @param   {string | HttpDecoratorOptions} [options] - Route path or options (optional).
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
