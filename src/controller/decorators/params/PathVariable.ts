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
 * ```typescript
 * import { Get, PathVariable, ParseIntPipe } from "bootgs";
 *
 * @Get("/users/:id")
 * getUser(@PathVariable("id", ParseIntPipe) id: number) {
 *   return { id };
 * }
 * ```
 */
export const PathVariable = Param;
