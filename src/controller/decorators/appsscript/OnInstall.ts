import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onInstall events.
 *
 * @example
 * ```TypeScript
 * import { OnInstall, Event } from "bootgs";
 *
 * @OnInstall()
 * onInstall(@Event() event: GoogleAppsScript.Events.AppsScriptEvent) {
 *   Logger.log("Application installed");
 * }
 * ```
 */
export const OnInstall = createAppsScriptDecorator(AppsScriptEventType.INSTALL);
