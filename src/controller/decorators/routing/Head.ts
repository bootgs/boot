import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP HEAD requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { RestController, Head } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Head("/check")
 *   checkUsers() {
 *     // ...
 *   }
 * }
 * ```
 */
export const Head = createHttpDecorator(RequestMethod.HEAD);
