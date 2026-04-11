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
 * @PatchMapping('/users/:id')
 * patchUser(@PathVariable('id') id: string, @Body() dto: Partial<UpdateUserDto>) {}
 * ```
 */
export const PatchMapping = createHttpDecorator(RequestMethod.PATCH);
