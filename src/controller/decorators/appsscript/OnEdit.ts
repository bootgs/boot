import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

export const OnEdit = createAppsScriptDecorator(AppsScriptEventType.EDIT);
