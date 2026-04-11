import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onOpen events.
 *
 * @example
 * ```typescript
 * @OnOpen()
 * onOpen(@Event() e: GoogleAppsScript.Events.AppsScriptEvent) {}
 * ```
 */
export const OnOpen = createAppsScriptDecorator(AppsScriptEventType.OPEN);
