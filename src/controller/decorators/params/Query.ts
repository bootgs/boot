import { ParamSource } from "../../../domain/enums";
import { createParamDecorator } from "../../../repository";

/**
 * A parameter decorator for injecting values from URL query parameters.
 *
 * @param   {string} [key] - The name of the query parameter to extract (`?name=value`).
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```TypeScript
 * import { Get, Query, ParseNumberPipe, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Get()
 *   findAll(@Query("page", ParseNumberPipe) page: number) {
 *     return { page };
 *   }
 * }
 * ```
 */
export const Query = createParamDecorator(ParamSource.QUERY);
