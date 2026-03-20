import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onInstall events.
 */
export const OnInstall = createAppsScriptDecorator(AppsScriptEventType.INSTALL);
