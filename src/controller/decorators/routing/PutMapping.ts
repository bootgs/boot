import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator, HttpDecoratorOptions } from "../../../repository";

/**
 * Route handler decorator for HTTP PUT requests.
 *
 * @param   {string | HttpDecoratorOptions} [options] - Route path or options (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { RestController, PutMapping, Body, Param } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @PutMapping("/{id}")
 *   update(@Param("id") id: string, @Body() user: any) {
 *     return { id, ...user };
 *   }
 * }
 * ```
 */
export const PutMapping = createHttpDecorator(RequestMethod.PUT);
