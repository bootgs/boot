import { ParamSource } from "../../../domain/enums";
import { createParamDecorator } from "../../../repository";

/**
 * A parameter decorator for injecting the request object.
 *
 * @param   {string} [key] - The name of a key to extract from the request object.
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```TypeScript
 * import { Get, Request, HttpRequest, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get()
 *   findAll(@Request() request: HttpRequest) {
 *     return { path: request.url.path };
 *   }
 * }
 * ```
 */
export const Request = createParamDecorator(ParamSource.REQUEST);
