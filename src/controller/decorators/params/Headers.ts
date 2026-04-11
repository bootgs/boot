import { ParamSource } from "../../../domain/enums";
import { createParamDecorator } from "../../../repository";

/**
 * A parameter decorator for injecting request headers.
 *
 * @param   {string} [key] - The name of a header to extract.
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```typescript
 * @Get()
 * get(@Headers('Authorization') auth: string) {}
 * ```
 */
export const Headers = createParamDecorator(ParamSource.HEADERS);
