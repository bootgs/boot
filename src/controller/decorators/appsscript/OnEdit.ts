import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onEdit events.
 *
 * @example
 * ```typescript
 * @OnEdit()
 * onEdit(@Event() e: GoogleAppsScript.Events.SheetsOnEdit) {}
 * ```
 */
export const OnEdit = createAppsScriptDecorator(AppsScriptEventType.EDIT);
