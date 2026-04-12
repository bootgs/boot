import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onEdit events.
 *
 * @example
 * ```typescript
 * import { OnEdit, Event } from "bootgs";
 *
 * @OnEdit()
 * onEdit(@Event() e: GoogleAppsScript.Events.SheetsOnEdit) {
 *   Logger.log(`Range ${e.range.getA1Notation()} edited`);
 * }
 * ```
 */
export const OnEdit = createAppsScriptDecorator(AppsScriptEventType.EDIT);
