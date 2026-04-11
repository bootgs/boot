import { Inject } from "../../controller/decorators";

/**
 * Decorator that marks a constructor parameter or property as being autowired.
 *
 * Alias for `@Inject()`.
 *
 * @param   {any} [token] - The injection token.
 * @returns {ParameterDecorator & PropertyDecorator} A decorator.
 *
 * @example
 * ```typescript
 * class MyService {
 *   @Autowired()
 *   private readonly provider: any;
 * }
 * ```
 */
export const Autowired = Inject;
