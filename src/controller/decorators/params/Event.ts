import { ParamSource } from "../../../domain/enums";
import { createParamDecorator } from "../../../repository";

/**
 * A parameter decorator for injecting the raw Apps Script event object.
 *
 * @param   {string} [key] - The name of a key to extract a specific value from the event object.
 * @returns {ParameterDecorator} A parameter decorator.
 */
export const Event = createParamDecorator(ParamSource.EVENT);
