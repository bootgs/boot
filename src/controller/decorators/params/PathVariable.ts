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
 * @Get('/:id')
 * getUser(@PathVariable('id') id: string) {}
 * ```
 */
export const PathVariable = Param;
