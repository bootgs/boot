import { AppsScriptEventType } from "domain/enums";
import { createAppsScriptDecorator } from "repository";

export const OnOpen = createAppsScriptDecorator(AppsScriptEventType.OPEN);
