import { ParamSource } from "../../../domain/enums";
import { createParamDecorator } from "../../../repository";

/**
 * A parameter decorator for injecting the response object.
 *
 * @param   {string} [key] - The name of a key to extract from the response object.
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```TypeScript
 * import { Get, Response, HttpResponse, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get()
 *   findAll(@Response() response: HttpResponse) {
 *     response.status = 200;
 *
 *     return "success";
 *   }
 * }
 * ```
 */
export const Response = createParamDecorator(ParamSource.RESPONSE);
