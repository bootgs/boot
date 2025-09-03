import { AppsScriptEventType } from "types";
import {
  APPSSCRIPT_EVENT_METADATA,
  APPSSCRIPT_OPTIONS_METADATA
} from "config/constants";

/**
 * Options for Google Apps Script events.
 *
 * This interface defines event-specific filters for `onEdit`, `onFormSubmit`, and `onChange` handlers.
 */
export interface AppsScriptOptions {
  eventType: AppsScriptEventType;
  range?: string | string[] | RegExp;
  formId?: string | string[];
  changeType?:
    | GoogleAppsScript.Events.SheetsOnChangeChangeType
    | GoogleAppsScript.Events.SheetsOnChangeChangeType[];
}

/**
 * A factory function that creates a method decorator for Google Apps Script event handlers.
 *
 * @param   eventType - The specific type of Apps Script event to handle.
 * @param   options - Optional filters for the event.
 * @returns A method decorator.
 */
export function createMethodDecorator(
  eventType: AppsScriptEventType,
  options?: Omit<AppsScriptOptions, "eventType">
): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target, key, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.defineMetadata(
      APPSSCRIPT_EVENT_METADATA,
      eventType,
      descriptor.value
    );
    Reflect.defineMetadata(
      APPSSCRIPT_OPTIONS_METADATA,
      options || {},
      descriptor.value
    );

    return descriptor;
  };
}
