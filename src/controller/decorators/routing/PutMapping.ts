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
 * import { PutMapping, Body, Param } from "bootgs";
 *
 * @PutMapping("/users/:id")
 * update(@Param("id") id: string, @Body() user: any) {
 *   return { id, ...user };
 * }
 * ```
 */
export const PutMapping = createHttpDecorator(RequestMethod.PUT);
