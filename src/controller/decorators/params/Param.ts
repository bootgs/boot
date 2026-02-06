import { ParamSource } from "domain/enums";
import { createParamDecorator } from "repository";

/**
 * A parameter decorator for injecting values from URL path parameters.
 *
 * @param   {string} key - The name of the path parameter to extract (`/users/{id}`).
 * @returns {ParameterDecorator} A parameter decorator.
 */
export const Param = createParamDecorator(ParamSource.PARAM);
