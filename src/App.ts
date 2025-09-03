import { isFunctionLike, isString } from "appsscript-utils";
import { APPSSCRIPT_EVENT_METADATA, APPSSCRIPT_OPTIONS_METADATA, CONTROLLER_TYPE_METADATA } from "config/constants";
import {
  buildMethodParams,
  checkEventFilters,
  createRequest,
  createResponse,
  extractPathParams,
  isController,
  pathMatch,
  resolve,
  RouterExplorer,
  wrapResponse
} from "utils";
import {
  AppConfig,
  AppsScriptEventType,
  HttpHeaders,
  HttpRequest,
  HttpStatus,
  Newable,
  RequestMethod,
  RouteMetadata
} from "types";

/**
 * The main application class responsible for handling various types of Google Apps Script events.
 * This class implements the Singleton pattern, ensuring only one instance exists throughout the application lifecycle.
 *
 * @environment `Google Apps Script`
 */
export class App {
  private static instance: App | null = null;

  private readonly _controllers = new Map<Newable, unknown>();
  private readonly _providers = new Map<Newable, unknown>();
  private readonly _routes: RouteMetadata[] = [];

  /**
   * Constructor for the App class.
   * It applies the Singleton pattern, ensuring that only one instance of App exists.
   *
   * @param config - The application configuration, including the controllers and providers to be registered.
   */
  constructor({ controllers, providers }: AppConfig = {}) {
    if (App.instance) {
      return App.instance;
    }

    for (const controller of controllers ?? []) {
      if (!isFunctionLike(controller)) continue;
      if (!isController(controller)) continue;

      this._controllers.set(controller, null);
    }

    this._routes = RouterExplorer.explore(this._controllers);

    for (const provider of providers ?? []) {
      if (!isFunctionLike(provider)) continue;

      this._providers.set(provider, null);
    }

    App.instance = this;
  }

  /**
   * Static method to create or retrieve the singleton instance of the App.
   * This method is used to initialize the application.
   *
   * @param   config - The application configuration, including controllers and providers.
   * @returns The single instance of the App.
   */
  static create(config?: AppConfig | null | undefined): App {
    return new App(config ?? {});
  }

  /**
   * Handles the add-on installation event (`onInstall`).
   * It scans for controllers decorated with `@Install()` and invokes their respective methods.
   *
   * @param   event - The installation event object.
   * @returns
   * @see     onOpen
   * @see     onEdit
   * @see     onChange
   * @see     onSelectionChange
   * @see     onFormSubmit
   * @see     doGet
   * @see     doPost
   */
  onInstall(event: GoogleAppsScript.Events.AddonOnInstall): void {
    return this.on(AppsScriptEventType.INSTALL, event);
  }

  /**
   * Handles the _document_ | _spreadsheet_ | _presentation_ | _form_ open event (`onOpen`).
   * It scans for controllers decorated with `@Open()` and invokes their respective methods.
   *
   * @param   event - The open event object.
   * @returns
   * @see     onInstall
   * @see     onEdit
   * @see     onChange
   * @see     onSelectionChange
   * @see     onFormSubmit
   * @see     doGet
   * @see     doPost
   */
  onOpen(
    event:
      | GoogleAppsScript.Events.DocsOnOpen
      | GoogleAppsScript.Events.SlidesOnOpen
      | GoogleAppsScript.Events.SheetsOnOpen
      | GoogleAppsScript.Events.FormsOnOpen
  ): void {
    return this.on(AppsScriptEventType.OPEN, event);
  }

  /**
   * Handles the spreadsheet edit event (`onEdit`).
   * It scans for controllers decorated with `@Edit()` and invokes their respective methods.
   *
   * @param   event - The edit event object.
   * @returns
   * @see     onInstall
   * @see     onOpen
   * @see     onChange
   * @see     onSelectionChange
   * @see     onFormSubmit
   * @see     doGet
   * @see     doPost
   */
  onEdit(event: GoogleAppsScript.Events.SheetsOnEdit): void {
    return this.on(AppsScriptEventType.EDIT, event);
  }

  /**
   * Handles the spreadsheet change event (`onChange`).
   * It scans for controllers decorated with `@Change()` and invokes their respective methods.
   *
   * @param   event - The change event object.
   * @returns
   * @see     onInstall
   * @see     onOpen
   * @see     onEdit
   * @see     onSelectionChange
   * @see     onFormSubmit
   * @see     doGet
   * @see     doPost
   */
  onChange(event: GoogleAppsScript.Events.SheetsOnChange): void {
    return this.on(AppsScriptEventType.CHANGE, event);
  }

  /**
   * Handles the spreadsheet selection change event (`onSelectionChange`).
   * It scans for controllers decorated with `@SelectionChange()` and invokes their respective methods.
   *
   * @param   event - The selection change event object.
   * @returns
   * @see     onInstall
   * @see     onOpen
   * @see     onEdit
   * @see     onChange
   * @see     onFormSubmit
   * @see     doGet
   * @see     doPost
   */
  onSelectionChange(
    event: GoogleAppsScript.Events.SheetsOnSelectionChange
  ): void {
    return this.on(AppsScriptEventType.SELECTION_CHANGE, event);
  }

  /**
   * Handles the form submission event (`onFormSubmit`).
   * It scans for controllers decorated with `@FormSubmit()` and invokes their respective methods.
   *
   * @param   event - The form submission event object.
   * @returns
   * @see     onInstall
   * @see     onOpen
   * @see     onEdit
   * @see     onChange
   * @see     onSelectionChange
   * @see     doGet
   * @see     doPost
   */
  onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit): void {
    return this.on(AppsScriptEventType.FORM_SUBMIT, event);
  }

  /**
   * Handles HTTP GET requests (`doGet`).
   * It processes the incoming event, routes it to the appropriate controller method,
   * and returns a response suitable for Apps Script.
   *
   * @param   event - The HTTP GET event object.
   * @returns The response to be returned by the Apps Script `doGet` function.
   * @see     doPost
   * @see     onInstall
   * @see     onOpen
   * @see     onEdit
   * @see     onChange
   * @see     onSelectionChange
   * @see     onFormSubmit
   */
  doGet(
    event: GoogleAppsScript.Events.DoGet
  ):
    | string
    | object
    | null
    | GoogleAppsScript.Content.TextOutput
    | GoogleAppsScript.HTML.HtmlOutput {
    return this.do(RequestMethod.GET, event);
  }

  /**
   * Handles HTTP POST requests (`doPost`).
   * It processes the incoming event, routes it to the appropriate controller method,
   * and returns a response suitable for Apps Script.
   *
   * @param   event - The HTTP POST event object.
   * @returns The response to be returned by the Apps Script `doPost` function.
   * @see     doGet
   * @see     onInstall
   * @see     onOpen
   * @see     onEdit
   * @see     onChange
   * @see     onSelectionChange
   * @see     onFormSubmit
   */
  doPost(
    event: GoogleAppsScript.Events.DoPost
  ):
    | string
    | object
    | null
    | GoogleAppsScript.Content.TextOutput
    | GoogleAppsScript.HTML.HtmlOutput {
    return this.do(RequestMethod.POST, event);
  }

  /**
   * Handles incoming HTTP requests (both `doPost` and `doGet` events).
   * This is the core routing and request processing method for HTTP endpoints.
   * It creates a structured request, finds a matching route, resolves the controller,
   * builds method parameters, executes the handler, and wraps the response.
   *
   * @param   method - The HTTP request method (GET, POST, PUT, DELETE, etc.).
   * @param   event - The raw Apps Script HTTP event object.
   * @returns The response to be returned by the Apps Script HTTP entry point function.
   */
  do(
    method: RequestMethod,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost
  ):
    | string
    | object
    | null
    | GoogleAppsScript.Content.TextOutput
    | GoogleAppsScript.HTML.HtmlOutput {
    const request: HttpRequest = createRequest(method, event);
    const headers: HttpHeaders = {};

    try {
      let route: RouteMetadata | null = null;

      if (request.url.pathname) {
        const pathname = decodeURI(request.url.pathname);

        route =
          this._routes.find(
            route =>
              route.method === request.method && pathMatch(route.path, pathname)
          ) || null;
      }

      if (!route) {
        return wrapResponse(
          request,
          createResponse(request, HttpStatus.NOT_FOUND, headers)
        );
      }

      const controllerInstance = resolve(
        this._controllers,
        this._providers,
        route.controller
      );
      const handler =
        controllerInstance[
          route.handler as keyof typeof controllerInstance
        ].bind(controllerInstance);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body = ((data, type): any => {
        if (!isString(data)) {
          return data;
        }

        if (type === "application/json") {
          try {
            return JSON.parse(data.trim());
          } catch (err: unknown) {
            console.warn("Failed to parse JSON:", err);
          }
        }

        return data;
      })(
        "postData" in event ? event?.postData?.contents : null,
        "postData" in event ? event?.postData?.type : "text/plain"
      );

      const args = buildMethodParams(
        controllerInstance,
        route.handler,
        {
          event,
          query: event.parameter,
          params: extractPathParams(route.path, request.url.pathname!),
          request,
          headers,
          body
          // TODO: add response
        },
        this._controllers,
        this._providers
      );

      const result = handler(...args);
      const response = createResponse(request, undefined, headers, result);

      return wrapResponse(request, response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err?.stack || err?.message);
      } else {
        console.error(String(err));
      }

      const response = createResponse(
        request,
        HttpStatus.INTERNAL_SERVER_ERROR,
        headers,
        String(err)
      );

      return wrapResponse(request, response);
    }
  }

  /**
   * A universal handler for Google Apps Script events (excluding HTTP events).
   * This method scans registered controllers and their methods for corresponding event decorators.
   *
   * It iterates through all known controllers, resolves their instances, and then examines each method to find those decorated with specific Apps Script event types (e.g., `@Open`, `@Edit`).
   * If a method's event type matches the current `eventType` and passes any defined filters, the method's arguments are built, and the method is executed.
   *
   * @param   eventType - The expected type of event. This is used to match with the metadata placed by event decorators on controller methods.
   * @param   event - The raw Apps Script event object. The structure of this object varies based on the specific Apps Script trigger that fired.
   * @returns
   */
  on(
    eventType: AppsScriptEventType,
    event:
      | GoogleAppsScript.Events.AddonOnInstall
      | GoogleAppsScript.Events.DocsOnOpen
      | GoogleAppsScript.Events.SlidesOnOpen
      | GoogleAppsScript.Events.SheetsOnOpen
      | GoogleAppsScript.Events.FormsOnOpen
      | GoogleAppsScript.Events.SheetsOnEdit
      | GoogleAppsScript.Events.SheetsOnChange
      | GoogleAppsScript.Events.SheetsOnSelectionChange
      | GoogleAppsScript.Events.FormsOnFormSubmit
  ): void {
    for (const controller of this._controllers.keys()) {
      const controllerType: string | null =
        Reflect.getMetadata(CONTROLLER_TYPE_METADATA, controller) || null;

      const isAppsScriptController =
        isString(controllerType) && controllerType.startsWith("appsscript");

      if (!isAppsScriptController) {
        continue;
      }

      const controllerInstance = resolve(
        this._controllers,
        this._providers,
        controller
      );

      const prototype = Object.getPrototypeOf(controllerInstance);

      const methodNames: string[] = [];
      let currentProto = prototype;
      while (currentProto && currentProto !== Object.prototype) {
        Object.getOwnPropertyNames(currentProto).forEach(name => {
          if (name !== "constructor" && isFunctionLike(currentProto[name])) {
            methodNames.push(name);
          }
        });
        currentProto = Object.getPrototypeOf(currentProto);
      }

      for (const methodName of methodNames) {
        const methodFunction = prototype?.[methodName];

        const methodEventType = Reflect.getMetadata(
          APPSSCRIPT_EVENT_METADATA,
          methodFunction
        );

        if (methodEventType !== eventType) {
          continue;
        }

        const methodOptions = Reflect.getMetadata(
          APPSSCRIPT_OPTIONS_METADATA,
          methodFunction
        );

        const matchesFilters = checkEventFilters(
          eventType,
          event,
          methodOptions
        );

        if (!matchesFilters) {
          continue;
        }

        const args = buildMethodParams(
          controllerInstance,
          methodName,
          {
            event
          },
          this._controllers,
          this._providers
        );

        try {
          controllerInstance?.[methodName]?.(...args);
        } catch (err: unknown) {
          console.error(
            "Error:",
            err instanceof Error ? err.stack : String(err)
          );
        }
      }
    }
  }
}
