import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP PUT requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 */
export const Put = createHttpDecorator(RequestMethod.PUT);
