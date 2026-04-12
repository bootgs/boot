import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onFormSubmit events.
 *
 * @example
 * ```typescript
 * import { OnFormSubmit, Event } from "bootgs";
 *
 * @OnFormSubmit()
 * onFormSubmit(@Event() e: GoogleAppsScript.Events.SheetsOnFormSubmit) {
 *   Logger.log(`Form submitted by: ${e.authMode}`);
 * }
 * ```
 */
export const OnFormSubmit = createAppsScriptDecorator(AppsScriptEventType.FORM_SUBMIT);
