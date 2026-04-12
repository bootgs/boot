import { ParamSource } from "../../../domain/enums";
import { createParamDecorator } from "../../../repository";

/**
 * A parameter decorator for injecting the full request body.
 *
 * @param   {string} [key] - The name of a key to extract a specific value from the request body.
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```typescript
 * import { Post, Body, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Post()
 *   create(@Body() user: any) {
 *     return user;
 *   }
 *
 *   @Post("/name")
 *   createField(@Body("name") name: string) {
 *     return { name };
 *   }
 * }
 * ```
 */
export const Body = createParamDecorator(ParamSource.BODY);
