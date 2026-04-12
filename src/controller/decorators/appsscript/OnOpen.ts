import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onOpen events.
 *
 * @example
 * ```typescript
 * import { OnOpen, Event } from "bootgs";
 *
 * @OnOpen()
 * onOpen(@Event() e: GoogleAppsScript.Events.AppsScriptEvent) {
 *   Logger.log("Application opened");
 * }
 * ```
 */
export const OnOpen = createAppsScriptDecorator(AppsScriptEventType.OPEN);
