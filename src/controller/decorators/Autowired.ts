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
 * import { Service, Autowired } from "bootgs";
 * import { MyProvider } from "./MyProvider";
 *
 * @Service()
 * class MyService {
 *   @Autowired()
 *   private readonly provider: MyProvider;
 * }
 * ```
 */
export const Autowired = Inject;
