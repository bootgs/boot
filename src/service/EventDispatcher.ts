import {
  APPSSCRIPT_EVENT_METADATA,
  APPSSCRIPT_OPTIONS_METADATA,
  PARAM_DEFINITIONS_METADATA,
  PARAMTYPES_METADATA
} from "../domain/constants";
import { AppsScriptEventType, ParamSource } from "../domain/enums";
import { InjectTokenDefinition, Newable, ParamDefinition } from "../domain/types";
import { getInjectionTokens } from "../repository";
import { Resolver } from "../service";
import { isFunctionLike } from "apps-script-utils";

/**
 * Service for dispatching events to controllers.
 */
export class EventDispatcher {
  /**
   * Creates a new instance of EventDispatcher.
   *
   * @param {Resolver} resolver The dependency resolver.
   * @param {Map<Newable, unknown>} controllers The registered controllers.
   */
  constructor(
    private readonly resolver: Resolver,
    private readonly controllers: Map<Newable, unknown>
  ) {}

  /**
   * Dispatches an event to the registered controllers.
   *
   * @param {AppsScriptEventType} eventType The type of the event to dispatch.
   * @param {unknown} event The event object.
   * @returns {Promise<void>} A promise that resolves when all handlers have finished.
   */
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

          const args = this.buildMethodParams(instance as object, propertyName, event);

          const handler = (instance as Record<string | symbol, unknown>)[ propertyName ] as (
            ...args: unknown[]
          ) => unknown;
          await handler.apply(instance, args);
        }
      }
    }
  }

  /**
   * Dispatches an event to the registered controllers by its name.
   *
   * @param {string} methodName The name of the method to dispatch the event to.
   * @param {unknown} event The event object.
   * @returns {Promise<void>} A promise that resolves when all handlers have finished.
   */
  public async dispatchByName(methodName: string, event: unknown): Promise<void> {
    for (const controller of this.controllers.keys()) {
      const instance = this.resolver.resolve(controller) as Record<string, any>;

      const prototype = Object.getPrototypeOf(instance);

      const methodNames: string[] = [];

      let currentProto = prototype;

      while (currentProto && currentProto !== Object.prototype) {
        Object.getOwnPropertyNames(currentProto).forEach((name) => {
          if (name !== "constructor" && isFunctionLike(currentProto[ name ])) {
            methodNames.push(name);
          }
        });
        currentProto = Object.getPrototypeOf(currentProto);
      }

      if (!methodNames.includes(methodName)) {
        continue;
      }

      const handler = instance[ methodName ].bind(instance);

      if (!isFunctionLike(handler)) {
        console.warn(
          "Method '%s' in controller '%s' is not a callable function and was skipped during event handling.",
          methodName,
          controller.name
        );

        continue;
      }

      const args = this.buildMethodParams(instance as object, methodName, event);

      try {
        await handler(...args);
      } catch (err: unknown) {
        console.error("Error:", err instanceof Error ? err.stack : String(err));
      }
    }
  }

  /**
   * Builds the parameters for a controller method.
   *
   * @param {object} target The target object.
   * @param {string | symbol} propertyKey The name of the property.
   * @param {unknown} event The event object.
   * @returns {unknown[]} An array of parameters for the method.
   */
  public buildMethodParams(
    target: object,
    propertyKey: string | symbol,
    event: unknown
  ): unknown[] {
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

  /**
   * Checks if the event should be dispatched based on the provided options.
   *
   * @param {AppsScriptEventType} eventType The type of the event.
   * @param {unknown} event The event object.
   * @param {Record<string, unknown> | undefined} options The options to check against.
   * @returns {boolean} True if the event should be dispatched, false otherwise.
   */
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
}
