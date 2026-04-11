import { HttpController } from "../../controller/decorators";

/**
 * Decorator that marks a class as a REST controller.
 *
 * @example
 * ```typescript
 * @RestController('/api')
 * class MyController {}
 * ```
 */
export const RestController = HttpController;
