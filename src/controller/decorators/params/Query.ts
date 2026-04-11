import { ParamSource } from "../../../domain/enums";
import { createParamDecorator } from "../../../repository";

/**
 * A parameter decorator for injecting values from URL query parameters.
 *
 * @param   {string} [key] - The name of the query parameter to extract (`?name=value`).
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```typescript
 * @Get()
 * getUsers(@Query('search') search: string) {}
 * ```
 */
export const Query = createParamDecorator(ParamSource.QUERY);
