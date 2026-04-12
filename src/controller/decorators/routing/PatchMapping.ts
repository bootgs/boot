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
 * import { PatchMapping, Body, Param } from "bootgs";
 *
 * @PatchMapping("/users/:id")
 * partialUpdate(@Param("id") id: string, @Body() partialUser: any) {
 *   return { id, ...partialUser };
 * }
 * ```
 */
export const PatchMapping = createHttpDecorator(RequestMethod.PATCH);
