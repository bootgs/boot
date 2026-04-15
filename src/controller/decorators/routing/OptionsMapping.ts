import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator, HttpDecoratorOptions } from "../../../repository";

/**
 * Route handler decorator for HTTP OPTIONS requests.
 *
 * @param   {string | HttpDecoratorOptions} [options] - Route path or options (optional).
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
