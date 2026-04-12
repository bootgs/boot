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
 * import { RestController, OptionsMapping } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @OptionsMapping()
 *   getUsersOptions() {
 *     // ...
 *   }
 * }
 * ```
 */
export const OptionsMapping = createHttpDecorator(RequestMethod.OPTIONS);
