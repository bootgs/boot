import { isObject } from "apps-script-utils";

/**
 * Checks if a value is a Google Apps Script form submit event.
 *
 * @param {unknown} value The value to check.
 * @returns {value is GoogleAppsScript.Events.FormsOnFormSubmit} True if the value is a form submit event, false otherwise.
 */
export function isFormSubmitEvent(
  value: unknown
): value is GoogleAppsScript.Events.FormsOnFormSubmit {
  return isObject(value) && "source" in value;
}
