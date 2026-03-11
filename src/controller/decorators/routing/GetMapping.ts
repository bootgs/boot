import { RequestMethod } from "../../../domain/enums";
import { createHttpDecorator } from "../../../repository";

/**
 * Route handler decorator for HTTP GET requests.
 *
 * @param   {string} [path] - Route path (optional).
 * @returns {MethodDecorator} A method decorator.
 */
export const GetMapping = createHttpDecorator(RequestMethod.GET);
