import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP DELETE requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```typescript
 * @DeleteMapping('/users/:id')
 * deleteUser(@PathVariable('id') id: string) {}
 * ```
 */
export const DeleteMapping = createHttpDecorator(RequestMethod.DELETE);
