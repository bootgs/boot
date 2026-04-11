import { Body } from "../../../controller/decorators/params";

/**
 * A parameter decorator for injecting the full request body.
 *
 * Alias for `@Body()`.
 *
 * @param   {string} [key] - The name of a key to extract a specific value from the request body.
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```typescript
 * @Post()
 * create(@RequestBody() dto: CreateDto) {}
 * ```
 */
export const RequestBody = Body;
