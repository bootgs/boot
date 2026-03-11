import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP PATCH requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 */
export const PatchMapping = createHttpDecorator(RequestMethod.PATCH);
