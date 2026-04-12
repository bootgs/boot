import { HttpController } from "../../controller/decorators";

/**
 * Decorator that marks a class as a REST controller.
 *
 * @example
 * ```typescript
 * import { RestController, Get, Param } from "bootgs";
 *
 * @RestController("/users")
 * class UserController {
 *   @Get("{id}")
 *   findOne(@Param("id") id: string) {
 *     return { id };
 *   }
 * }
 * ```
 */
export const RestController = HttpController;
