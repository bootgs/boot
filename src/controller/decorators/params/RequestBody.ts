import { Body } from "../../../controller/decorators/params";

/**
 * A parameter decorator for injecting the full request body.
 *
 * Alias for `@Body()`.
 *
 * @param   {string} [key] - The name of a key to extract a specific value from the request body.
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```TypeScript
 * import { Post, RequestBody, RestController } from "bootgs";
 *
 * @RestController("/users")
 * class UsersController {
 *   @Post()
 *   create(@RequestBody() user: any) {
 *     return user;
 *   }
 * }
 * ```
 */
export const RequestBody = Body;
