import { Injectable } from "../../controller/decorators";

/**
 * Decorator that marks a class as a repository.
 *
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```typescript
 * import { Repository } from "bootgs";
 *
 * @Repository()
 * class UserRepository {
 *   save(user: any) {
 *     return user;
 *   }
 * }
 * ```
 */
export function Repository(): ClassDecorator {
  return Injectable();
}
