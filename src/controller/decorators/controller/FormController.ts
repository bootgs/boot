import { Controller } from "./Controller";

/**
 * Decorator that marks a class as a Google Forms event controller.
 *
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```TypeScript
 * import { FormController, OnFormSubmit } from "bootgs";
 *
 * @FormController()
 * class MyFormController {
 *   @OnFormSubmit()
 *   onSubmit(e) {
 *     // ...
 *   }
 * }
 * ```
 */
export function FormController(): ClassDecorator {
  return Controller("forms");
}

/**
 * Alias for {@link FormController}.
 *
 * @returns {ClassDecorator} A class decorator.
 */
export const FormsController = FormController;
