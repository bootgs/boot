import { Injectable } from "../../controller/decorators";

/**
 * Decorator that marks a class as a service.
 *
 * @returns {ClassDecorator} A class decorator.
 */
export function Service(): ClassDecorator {
  return Injectable();
}
