import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onFormSubmit events.
 *
 * @example
 * ```TypeScript
 * import { OnFormSubmit, Event } from "bootgs";
 *
 * @OnFormSubmit()
 * onFormSubmit(@Event() event: GoogleAppsScript.Events.SheetsOnFormSubmit) {
 *   Logger.log(`Form submitted by: ${event.authMode}`);
 * }
 * ```
 */
export const OnFormSubmit = createAppsScriptDecorator(AppsScriptEventType.FORM_SUBMIT);
