import { AppsScriptEventType } from "../../../domain/enums";
import { createAppsScriptDecorator } from "../../../repository";

export const OnInstall = createAppsScriptDecorator(AppsScriptEventType.INSTALL);
