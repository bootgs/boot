import { Controller } from "../../controller/decorators";

/**
 * Decorator that marks a class as an HTTP controller.
 *
 * @param   {string} [basePath] - The base path for all routes in this controller.
 * @returns {ClassDecorator} A class decorator.
 */
export function HttpController(basePath: string = "/"): ClassDecorator {
  return Controller("http", { basePath: basePath === undefined ? "/" : basePath });
}
