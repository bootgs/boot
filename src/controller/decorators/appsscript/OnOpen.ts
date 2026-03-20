import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onOpen events.
 */
export const OnOpen = createAppsScriptDecorator(AppsScriptEventType.OPEN);
