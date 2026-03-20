import { isObject } from "apps-script-utils";

/**
 * Checks if a value is a Google Apps Script change event.
 *
 * @param {unknown} value The value to check.
 * @returns {value is GoogleAppsScript.Events.SheetsOnChange} True if the value is a change event, false otherwise.
 */
export function isChangeEvent(value: unknown): value is GoogleAppsScript.Events.SheetsOnChange {
  return isObject(value) && "changeType" in value;
}
