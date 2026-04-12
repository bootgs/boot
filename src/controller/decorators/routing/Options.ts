import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP OPTIONS requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { RestController, Options } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Options()
 *   getUsersOptions() {
 *     // ...
 *   }
 * }
 * ```
 */
export const Options = createHttpDecorator(RequestMethod.OPTIONS);
