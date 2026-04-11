import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onFormSubmit events.
 *
 * @example
 * ```typescript
 * @OnFormSubmit()
 * onFormSubmit(@Event() e: GoogleAppsScript.Events.SheetsOnFormSubmit) {}
 * ```
 */
export const OnFormSubmit = createAppsScriptDecorator(AppsScriptEventType.FORM_SUBMIT);
