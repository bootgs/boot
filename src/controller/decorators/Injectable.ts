import { INJECTABLE_WATERMARK } from "../../domain/constants";

/**
 * Decorator that marks a class as injectable (a provider).
 *
 * @returns {ClassDecorator} A class decorator.
 */
export function Injectable(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
  };
}
