import { Controller } from "./Controller";

/**
 * Decorator that marks a class as a Google Slides event controller.
 *
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```TypeScript
 * import { SlideController, OnOpen } from "bootgs";
 *
 * @SlideController()
 * class MySlideController {
 *   @OnOpen()
 *   onOpen(e) {
 *     // ...
 *   }
 * }
 * ```
 */
export function SlideController(): ClassDecorator {
  return Controller("slides");
}

/**
 * Alias for {@link SlideController}.
 *
 * @returns {ClassDecorator} A class decorator.
 */
export const SlidesController = SlideController;
