import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onEdit events.
 */
export const OnEdit = createAppsScriptDecorator(AppsScriptEventType.EDIT);
