import { ParamSource } from "../../../domain/enums";
import { createParamDecorator } from "../../../repository";

/**
 * A parameter decorator for injecting request headers.
 *
 * @param   {string} [key] - The name of a header to extract.
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```TypeScript
 * import { Get, Headers } from "bootgs";
 *
 * @Get()
 * findAll(@Headers("User-Agent") agent: string) {
 *   return { agent };
 * }
 * ```
 */
export const Headers = createParamDecorator(ParamSource.HEADERS);
