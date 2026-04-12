import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onChange events.
 *
 * @example
 * ```TypeScript
 * import { OnChange, Event } from "bootgs";
 *
 * @OnChange()
 * onChange(@Event() event: GoogleAppsScript.Events.SheetsOnChange) {
 *   Logger.log(`Sheet changed: ${event.changeType}`);
 * }
 * ```
 */
export const OnChange = createAppsScriptDecorator(AppsScriptEventType.CHANGE);
