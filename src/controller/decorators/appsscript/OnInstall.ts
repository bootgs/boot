import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onInstall events.
 *
 * @example
 * ```typescript
 * import { OnInstall, Event } from "bootgs";
 *
 * @OnInstall()
 * onInstall(@Event() e: GoogleAppsScript.Events.AppsScriptEvent) {
 *   Logger.log("Application installed");
 * }
 * ```
 */
export const OnInstall = createAppsScriptDecorator(AppsScriptEventType.INSTALL);
