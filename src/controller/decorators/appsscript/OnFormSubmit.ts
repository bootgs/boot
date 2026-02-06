import { AppsScriptEventType } from "domain/enums";
import { createAppsScriptDecorator } from "repository";

export const OnFormSubmit = createAppsScriptDecorator(AppsScriptEventType.FORM_SUBMIT);
