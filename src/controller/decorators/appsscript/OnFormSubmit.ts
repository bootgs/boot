import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

/**
 * Decorator for handling Google Apps Script onFormSubmit events.
 */
export const OnFormSubmit = createAppsScriptDecorator(AppsScriptEventType.FORM_SUBMIT);
