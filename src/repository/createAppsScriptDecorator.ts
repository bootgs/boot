import { APPSSCRIPT_EVENT_METADATA, APPSSCRIPT_OPTIONS_METADATA } from "domain/constants";
import { AppsScriptEventType } from "domain/enums";

/**
 * A factory function that creates method decorators for Apps Script events.
 *
 * @param   {AppsScriptEventType} eventType - The Apps Script event type to be associated with the decorator.
 * @returns {Function} A function that returns a method decorator.
 */
export function createAppsScriptDecorator(eventType: AppsScriptEventType) {
  return (options: Record<string, unknown> = {}): MethodDecorator => {
    return <T>(
      _target: object,
      _key: string | symbol,
      descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> => {
      if (descriptor.value) {
        Reflect.defineMetadata(APPSSCRIPT_EVENT_METADATA, eventType, descriptor.value);
        Reflect.defineMetadata(APPSSCRIPT_OPTIONS_METADATA, options, descriptor.value);
      }

      return descriptor;
    };
  };
}
