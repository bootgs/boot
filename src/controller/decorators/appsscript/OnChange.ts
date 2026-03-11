import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

export const OnChange = createAppsScriptDecorator(AppsScriptEventType.CHANGE);
