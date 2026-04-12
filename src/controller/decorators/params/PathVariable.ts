import { Param } from "../../../controller/decorators/params";

/**
 * A parameter decorator for injecting values from URL path parameters.
 *
 * Alias for `@Param()`.
 *
 * @param   {string} key - The name of the path parameter to extract (`/users/{id}`).
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```TypeScript
 * import { Get, Param, ParseNumberPipe, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get("/{id}")
 *   getUser(@Param("id", ParseNumberPipe) id: number) {
 *     return { id };
 *   }
 * }
 * ```
 */
export const PathVariable = Param;
