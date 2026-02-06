import { ParamSource } from "domain/enums";
import { createParamDecorator } from "repository";

/**
 * A parameter decorator for injecting the response object.
 *
 * @param   {string} [key] - The name of a key to extract from the response object.
 * @returns {ParameterDecorator} A parameter decorator.
 */
export const Response = createParamDecorator(ParamSource.RESPONSE);
