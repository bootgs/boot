import { Injectable } from "controller/decorators";

/**
 * Decorator that marks a class as a repository.
 *
 * @returns {ClassDecorator} A class decorator.
 */
export function Repository(): ClassDecorator {
  return Injectable();
}
