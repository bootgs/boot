import { Injectable } from "../../controller/decorators";

/**
 * Decorator that marks a class as a service.
 *
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```typescript
 * @Service()
 * class MyService {}
 * ```
 */
export function Service(): ClassDecorator {
  return Injectable();
}
