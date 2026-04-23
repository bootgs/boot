import { Controller } from "./Controller";

/**
 * Decorator that marks a class as a Google Sheets event controller.
 *
 * @param   {string | string[] | RegExp} [sheetName] - Filter by sheet name (string, array, or RegExp).
 * @returns {ClassDecorator} A class decorator.
 *
 * @example
 * ```TypeScript
 * import { SheetController, OnEdit } from "bootgs";
 *
 * @SheetController("Sheet1")
 * class MySheetController {
 *   @OnEdit()
 *   onEdit(e) {
 *     // ...
 *   }
 * }
 * ```
 */
export function SheetController(sheetName?: string | string[] | RegExp): ClassDecorator {
  return Controller("sheets", { sheetName });
}

/**
 * Alias for {@link SheetController}.
 *
 * @param   {string | string[] | RegExp} [sheetName] - Filter by sheet name (string, array, or RegExp).
 * @returns {ClassDecorator} A class decorator.
 */
export const SheetsController = SheetController;
