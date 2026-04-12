import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP OPTIONS requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```typescript
 * import { Options } from "bootgs";
 *
 * @Options("/users")
 * getUsersOptions() {
 *   // ...
 * }
 * ```
 */
export const Options = createHttpDecorator(RequestMethod.OPTIONS);
