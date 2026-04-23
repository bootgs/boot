import { Injectable } from "./Injectable";

/**
 * Decorator that marks a class as a service.
 *
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```TypeScript
 * import { Service, Injectable } from "bootgs";
 *
 * @Service()
 * class UsersService {
 *   findAll() {
 *     return [];
 *   }
 * }
 * ```
 */
export function Service(): ClassDecorator {
  return Injectable();
}
