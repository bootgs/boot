import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onEdit events.
 *
 * @example
 * ```TypeScript
 * import { OnEdit, Event } from "bootgs";
 *
 * @OnEdit()
 * onEdit(@Event() event: GoogleAppsScript.Events.SheetsOnEdit) {
 *   Logger.log(`Range ${event.range.getA1Notation()} edited`);
 * }
 * ```
 */
export const OnEdit = createAppsScriptDecorator(AppsScriptEventType.EDIT);
