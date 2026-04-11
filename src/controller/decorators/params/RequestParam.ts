import { Query } from "../../../controller/decorators/params";

/**
 * A parameter decorator for injecting values from URL query parameters.
 *
 * Alias for `@Query()`.
 *
 * @param   {string} [key] - The name of the query parameter to extract (`?name=value`).
 * @returns {ParameterDecorator} A parameter decorator.
 */
export const RequestParam = Query;
