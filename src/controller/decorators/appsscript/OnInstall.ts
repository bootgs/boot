import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onInstall events.
 *
 * @example
 * ```typescript
 * @OnInstall()
 * onInstall(@Event() e: GoogleAppsScript.Events.AppsScriptEvent) {}
 * ```
 */
export const OnInstall = createAppsScriptDecorator(AppsScriptEventType.INSTALL);
