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
 * @Post('/users')
 * createUser(@Body() dto: CreateUserDto) {}
 * ```
 */
export const Post = createHttpDecorator(RequestMethod.POST);
