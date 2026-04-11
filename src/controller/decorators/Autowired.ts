import { Inject } from "../../controller/decorators";

/**
 * Decorator that marks a constructor parameter or property as being autowired.
 *
 * Alias for `@Inject()`.
 *
 * @param   {any} [token] - The injection token.
 * @returns {ParameterDecorator & PropertyDecorator} A decorator.
 */
export const Autowired = Inject;
