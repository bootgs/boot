import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onChange events.
 */
export const OnChange = createAppsScriptDecorator(AppsScriptEventType.CHANGE);
