import { isObject } from "apps-script-utils";

/**
 * Checks if a value is a Google Apps Script edit event.
 *
 * @param   {unknown} value - The value to check.
 * @returns {value is GoogleAppsScript.Events.SheetsOnEdit} `true` if the value is an edit event, `false` otherwise.
 */
export function isEditEvent(value: unknown): value is GoogleAppsScript.Events.SheetsOnEdit {
  return isObject(value) && "range" in value;
}
