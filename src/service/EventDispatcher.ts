import {
  APPSSCRIPT_EVENT_METADATA,
  APPSSCRIPT_OPTIONS_METADATA,
  PARAM_DEFINITIONS_METADATA,
  PARAMTYPES_METADATA
} from "domain/constants";
import { AppsScriptEventType, ParamSource } from "domain/enums";
import { InjectTokenDefinition, Newable, ParamDefinition } from "domain/types";
import { getInjectionTokens } from "repository";
import { Resolver } from "service";

export class EventDispatcher {
  constructor(
    private readonly resolver: Resolver,
    private readonly controllers: Map<Newable, unknown>
  ) {}

  public async dispatch(eventType: AppsScriptEventType, event: unknown): Promise<void> {
    for (const controller of this.controllers.keys()) {
      const prototype = controller.prototype;

      const propertyNames = Object.getOwnPropertyNames(prototype);

      for (const propertyName of propertyNames) {
        if (propertyName === "constructor") continue;

        const methodHandler = prototype[ propertyName ];

        const eventMetadata = Reflect.getMetadata(APPSSCRIPT_EVENT_METADATA, methodHandler);

        const options = Reflect.getMetadata(APPSSCRIPT_OPTIONS_METADATA, methodHandler);

        if (eventMetadata === eventType && this.checkFilters(eventType, event, options)) {
          const instance = this.resolver.resolve(controller);

          const args = this.buildArgs(instance as object, propertyName, event);

          const handler = (instance as Record<string | symbol, unknown>)[ propertyName ] as (
            ...args: unknown[]
          ) => unknown;
          await handler.apply(instance, args);
        }
      }
    }
  }

  private checkFilters(
    eventType: AppsScriptEventType,
    event: unknown,
    options: Record<string, unknown> | undefined
  ): boolean {
    if (!options) return true;

    switch (eventType) {
      case AppsScriptEventType.EDIT:
        if (options.range) {
          const editEvent = event as GoogleAppsScript.Events.SheetsOnEdit;
          const eventRangeA1 =
            typeof editEvent.range?.getA1Notation === "function"
              ? editEvent.range.getA1Notation()
              : null;

          if (!eventRangeA1) {
            return false;
          }

          const ranges = Array.isArray(options.range) ? options.range : [ options.range ];

          // TODO: isRegExp
          return ranges.some((r: string | RegExp) =>
            r instanceof RegExp ? r.test(eventRangeA1) : eventRangeA1 === r
          );
        }
        break;

      case AppsScriptEventType.FORM_SUBMIT:
        if (options.formId) {
          const submitEvent = event as GoogleAppsScript.Events.FormsOnFormSubmit;
          const eventFormId = (
            submitEvent.source as unknown as { getId?: () => string }
          )?.getId?.();

          if (!eventFormId) {
            return false;
          }

          const formIds = Array.isArray(options.formId) ? options.formId : [ options.formId ];

          return formIds.some((id: string) => eventFormId === id);
        }
        break;

      case AppsScriptEventType.CHANGE:
        if (options.changeType) {
          const changeEvent = event as GoogleAppsScript.Events.SheetsOnChange;
          const eventChangeType = changeEvent.changeType;

          if (!eventChangeType) {
            return false;
          }

          const changeTypes = Array.isArray(options.changeType)
            ? options.changeType
            : [ options.changeType ];

          return changeTypes.some((type: unknown) => eventChangeType === type);
        }
        break;
    }
    return true;
  }

  private buildArgs(target: object, propertyKey: string | symbol, event: unknown): unknown[] {
    const targetPrototype = Object.getPrototypeOf(target);

    const rawMetadata: Record<string, ParamDefinition> =
      Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, targetPrototype, propertyKey) || {};

    const rawInjectMetadata: Record<string, InjectTokenDefinition> = getInjectionTokens(
      targetPrototype,
      propertyKey
    );

    const metadata: (ParamDefinition | InjectTokenDefinition)[] = (
      Object.values(rawMetadata) as (ParamDefinition | InjectTokenDefinition)[]
    ).concat(Object.values(rawInjectMetadata) as (ParamDefinition | InjectTokenDefinition)[]);

    metadata.sort((a, b) => a.index - b.index);

    const designParamTypes: Newable[] =
      Reflect.getMetadata(PARAMTYPES_METADATA, targetPrototype, propertyKey) || [];

    const args: unknown[] = [];

    for (const param of metadata) {
      switch (param.type) {
        case ParamSource.EVENT:
          args[ param.index ] =
            param.key && typeof event === "object" && event !== null
              ? (event as Record<string, unknown>)[ param.key ]
              : event;
          break;

        case ParamSource.INJECT:
          try {
            const tokenToResolve = "token" in param ? param.token : designParamTypes[ param.index ];

            if (tokenToResolve) {
              args[ param.index ] = this.resolver.resolve(tokenToResolve);
            } else {
              args[ param.index ] = undefined;
            }
          } catch {
            args[ param.index ] = undefined;
          }
          break;
      }
    }

    return args;
  }
}
