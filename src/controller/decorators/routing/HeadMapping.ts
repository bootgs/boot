import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator, HttpDecoratorOptions } from "../../../repository";

/**
 * Route handler decorator for HTTP HEAD requests.
 *
 * @param   {string | HttpDecoratorOptions} [options] - Route path or options (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { RestController, Head } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @HeadMapping('/check')
 *   checkUsers() {}
 * }
 * ```
 */
export const HeadMapping = createHttpDecorator(RequestMethod.HEAD);
