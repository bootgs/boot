import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator, HttpDecoratorOptions } from "../../../repository";

/**
 * Route handler decorator for HTTP PATCH requests.
 *
 * @param   {string | HttpDecoratorOptions} [options] - Route path or options (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { RestController, PatchMapping, Body, Param } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @PatchMapping("/{id}")
 *   partialUpdate(@Param("id") id: string, @Body() partialUser: any) {
 *     return { id, ...partialUser };
 *   }
 * }
 * ```
 */
export const PatchMapping = createHttpDecorator(RequestMethod.PATCH);
