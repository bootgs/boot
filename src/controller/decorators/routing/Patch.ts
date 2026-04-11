import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP PATCH requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```typescript
 * @Patch('/users/:id')
 * patchUser(@PathVariable('id') id: string, @Body() dto: Partial<UpdateUserDto>) {}
 * ```
 */
export const Patch = createHttpDecorator(RequestMethod.PATCH);
