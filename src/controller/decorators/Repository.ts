import { Injectable } from "../../controller/decorators";

/**
 * Decorator that marks a class as a repository.
 *
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```typescript
 * @Repository()
 * class MyRepository {}
 * ```
 */
export function Repository(): ClassDecorator {
  return Injectable();
}
