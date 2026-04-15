import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator, HttpDecoratorOptions } from "../../../repository";

/**
 * Route handler decorator for HTTP DELETE requests.
 *
 * @param   {string | HttpDecoratorOptions} [options] - Route path or options (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```TypeScript
 * import { DeleteMapping, Param, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @DeleteMapping("/{id}")
 *   remove(@Param("id") id: string) {
 *     return { deleted: true, id };
 *   }
 * }
 * ```
 */
export const DeleteMapping = createHttpDecorator(RequestMethod.DELETE);
