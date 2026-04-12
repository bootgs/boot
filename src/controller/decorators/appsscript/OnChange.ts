import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onChange events.
 *
 * @example
 * ```typescript
 * import { OnChange, Event } from "bootgs";
 *
 * @OnChange()
 * onChange(@Event() e: GoogleAppsScript.Events.SheetsOnChange) {
 *   Logger.log(`Sheet changed: ${e.changeType}`);
 * }
 * ```
 */
export const OnChange = createAppsScriptDecorator(AppsScriptEventType.CHANGE);
