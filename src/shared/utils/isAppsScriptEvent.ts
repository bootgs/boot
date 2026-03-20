/**
 * Checks if a value is a Google Apps Script edit event.
 *
 * @param {unknown} value The value to check.
 * @returns {value is GoogleAppsScript.Events.SheetsOnEdit} True if the value is an edit event, false otherwise.
 */
export function isEditEvent(value: unknown): value is GoogleAppsScript.Events.SheetsOnEdit {
  return typeof value === "object" && value !== null && "range" in value;
}

/**
 * Checks if a value is a Google Apps Script form submit event.
 *
 * @param {unknown} value The value to check.
 * @returns {value is GoogleAppsScript.Events.FormsOnFormSubmit} True if the value is a form submit event, false otherwise.
 */
export function isFormSubmitEvent(
  value: unknown
): value is GoogleAppsScript.Events.FormsOnFormSubmit {
  return typeof value === "object" && value !== null && "source" in value;
}

/**
 * Checks if a value is a Google Apps Script change event.
 *
 * @param {unknown} value The value to check.
 * @returns {value is GoogleAppsScript.Events.SheetsOnChange} True if the value is a change event, false otherwise.
 */
export function isChangeEvent(value: unknown): value is GoogleAppsScript.Events.SheetsOnChange {
  return typeof value === "object" && value !== null && "changeType" in value;
}
