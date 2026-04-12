import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP GET requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 *
 * @example
 * ```typescript
 * import { GetMapping, Param, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @GetMapping("/:id")
 *   findOne(@Param("id") id: string) {
 *     return { id };
 *   }
 * }
 * ```
 */
export const GetMapping = createHttpDecorator(RequestMethod.GET);
