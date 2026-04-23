import { Controller } from "./Controller";

/**
 * Decorator that marks a class as a Google Docs event controller.
 *
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```TypeScript
 * import { DocController, OnOpen } from "bootgs";
 *
 * @DocController()
 * class MyDocController {
 *   @OnOpen()
 *   onOpen(e) {
 *     // ...
 *   }
 * }
 * ```
 */
export function DocController(): ClassDecorator {
  return Controller("docs");
}

/**
 * Alias for {@link DocController}.
 *
 * @returns {ClassDecorator} A class decorator.
 */
export const DocsController = DocController;
