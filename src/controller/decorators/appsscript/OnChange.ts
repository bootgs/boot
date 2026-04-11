import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onChange events.
 *
 * @example
 * ```typescript
 * @OnChange()
 * onChange(@Event() e: GoogleAppsScript.Events.SheetsOnChange) {}
 * ```
 */
export const OnChange = createAppsScriptDecorator(AppsScriptEventType.CHANGE);
