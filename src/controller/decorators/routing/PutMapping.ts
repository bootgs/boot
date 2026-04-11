import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP PUT requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```typescript
 * @PutMapping('/users/:id')
 * updateUser(@PathVariable('id') id: string, @Body() dto: UpdateUserDto) {}
 * ```
 */
export const PutMapping = createHttpDecorator(RequestMethod.PUT);
