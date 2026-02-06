import { AppsScriptEventType } from "domain/enums";
import { APPSSCRIPT_EVENT_METADATA, APPSSCRIPT_OPTIONS_METADATA } from "domain/constants";

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
  return <T>(
    _target: object,
    _key: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> => {
    if (descriptor.value) {
      Reflect.defineMetadata(APPSSCRIPT_EVENT_METADATA, eventType, descriptor.value);
      Reflect.defineMetadata(APPSSCRIPT_OPTIONS_METADATA, options || {}, descriptor.value);
    }

    return descriptor;
  };
}
