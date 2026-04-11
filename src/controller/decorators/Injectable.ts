import { INJECTABLE_WATERMARK } from "../../domain/constants";

/**
 * Decorator that marks a class as injectable (a provider).
 *
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```typescript
 * @Injectable()
 * class MyProvider {}
 * ```
 */
export function Injectable(): ClassDecorator {
  return (target: object): void => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
  };
}
