import { isFunction, isString, normalize } from "appsscript-utils";
import {
  APPSSCRIPT_EVENT_METADATA,
  APPSSCRIPT_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  CONTROLLER_WATERMARK,
  INJECTABLE_WATERMARK,
  PARAM_DEFINITIONS_METADATA,
  PARAMTYPES_METADATA
} from "./config/constants";
import { getInjectionTokens } from "./decorators";
import { RouterExplorer } from "./RouterExplorer";
import {
  AppConfig,
  AppsScriptEventType,
  HeaderAcceptMimeType,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpStatus,
  InjectTokenDefinition,
  Newable,
  ParamDefinition,
  ParamSource,
  ParsedUrl,
  RequestMethod,
  RouteMetadata
} from "./types";

/**
 * The main application class responsible for handling various types of Google Apps Script events.
 * This class implements the Singleton pattern, ensuring only one instance exists throughout the application lifecycle.
 *
 * @environment `Google Apps Script`
 */
export class App {
  private static instance: App | null = null;

  private readonly _controllers: Newable[] = [];
  private readonly _providers = new Map<Newable, any>();
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

    this._controllers = controllers ?? [];
    this._routes = RouterExplorer.explore(controllers ?? []);

    for (const provider of providers ?? []) {
      if (isFunction(provider)) {
        this._providers.set(provider, undefined);
      }
    }

    App.instance = this;
  }

  /**
   * Static method to create or retrieve the singleton instance of the App.
   * This method is used to initialize the application.
   *
   * @param config - The application configuration, including controllers and providers.
   * @returns The single instance of the App.
   */
  static create(config?: AppConfig | null | undefined): App {
    return new App(config ?? {});
  }

  /**
   * Handles the add-on installation event (`onInstall`).
   * It scans for controllers decorated with `@Install()` and invokes their respective methods.
   *
   * @param event - The installation event object.
   */
  onInstall(event: GoogleAppsScript.Events.AddonOnInstall): void {
    return this.handleAppsScriptEvent(event, AppsScriptEventType.INSTALL);
  }

  /**
   * Handles the _document_ | _spreadsheet_ | _presentation_ | _form_ open event (`onOpen`).
   * It scans for controllers decorated with `@Open()` and invokes their respective methods.
   *
   * @param event - The open event object.
   */
  onOpen(
    event:
      | GoogleAppsScript.Events.DocsOnOpen
      | GoogleAppsScript.Events.SlidesOnOpen
      | GoogleAppsScript.Events.SheetsOnOpen
      | GoogleAppsScript.Events.FormsOnOpen
  ): void {
    return this.handleAppsScriptEvent(event, AppsScriptEventType.OPEN);
  }

  /**
   * Handles the spreadsheet edit event (`onEdit`).
   * It scans for controllers decorated with `@Edit()` and invokes their respective methods.
   *
   * @param event - The edit event object.
   */
  onEdit(event: GoogleAppsScript.Events.SheetsOnEdit): void {
    return this.handleAppsScriptEvent(event, AppsScriptEventType.EDIT);
  }

  /**
   * Handles the spreadsheet change event (`onChange`).
   * It scans for controllers decorated with `@Change()` and invokes their respective methods.
   *
   * @param event - The change event object.
   */
  onChange(event: GoogleAppsScript.Events.SheetsOnChange): void {
    return this.handleAppsScriptEvent(event, AppsScriptEventType.CHANGE);
  }

  /**
   * Handles the spreadsheet selection change event (`onSelectionChange`).
   * It scans for controllers decorated with `@SelectionChange()` and invokes their respective methods.
   *
   * @param event - The selection change event object.
   */
  onSelectionChange(
    event: GoogleAppsScript.Events.SheetsOnSelectionChange
  ): void {
    return this.handleAppsScriptEvent(
      event,
      AppsScriptEventType.SELECTION_CHANGE
    );
  }

  /**
   * Handles the form submission event (`onFormSubmit`).
   * It scans for controllers decorated with `@FormSubmit()` and invokes their respective methods.
   *
   * @param event - The form submission event object.
   */
  onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit): void {
    return this.handleAppsScriptEvent(event, AppsScriptEventType.FORM_SUBMIT);
  }

  /**
   * Handles HTTP GET requests (`doGet`).
   * It processes the incoming event, routes it to the appropriate controller method,
   * and returns a response suitable for Apps Script.
   *
   * @param event - The HTTP GET event object.
   * @returns The response to be returned by the Apps Script `doGet` function.
   */
  doGet(
    event: GoogleAppsScript.Events.DoGet
  ):
    | string
    | object
    | null
    | GoogleAppsScript.Content.TextOutput
    | GoogleAppsScript.HTML.HtmlOutput {
    return this.handleRequest(RequestMethod.GET, event);
  }

  /**
   * Handles HTTP POST requests (`doPost`).
   * It processes the incoming event, routes it to the appropriate controller method,
   * and returns a response suitable for Apps Script.
   *
   * @param event - The HTTP POST event object.
   * @returns The response to be returned by the Apps Script `doPost` function.
   */
  doPost(
    event: GoogleAppsScript.Events.DoPost
  ):
    | string
    | object
    | null
    | GoogleAppsScript.Content.TextOutput
    | GoogleAppsScript.HTML.HtmlOutput {
    return this.handleRequest(RequestMethod.POST, event);
  }

  /**
   * Handles incoming HTTP requests (both `doPost` and `doGet` events).
   * This is the core routing and request processing method for HTTP endpoints.
   * It creates a structured request, finds a matching route, resolves the controller,
   * builds method parameters, executes the handler, and wraps the response.
   *
   * @param method - The HTTP request method (GET, POST, PUT, DELETE, etc.).
   * @param event - The raw Apps Script HTTP event object.
   * @returns The response to be returned by the Apps Script HTTP entry point function.
   */
  handleRequest(
    method: RequestMethod,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost
  ):
    | string
    | object
    | null
    | GoogleAppsScript.Content.TextOutput
    | GoogleAppsScript.HTML.HtmlOutput {
    const request: HttpRequest = this.createRequest(method, event);
    const headers: HttpHeaders = {};

    // FIXME: remove after debug
    console.log("event:", JSON.stringify(event, null, 2));
    console.log("request:", JSON.stringify(request, null, 2));

    try {
      let route: RouteMetadata | null = null;

      if (request.url.pathname) {
        const pathname = decodeURI(request.url.pathname);

        route =
          this._routes.find(
            route =>
              route.method === request.method &&
              this.pathMatch(route.path, pathname)
          ) || null;
      }

      if (!route) {
        return this.wrapResponse(
          request,
          this.createResponse(request, HttpStatus.NOT_FOUND, headers)
        );
      }

      const controller = this.resolve(route.controller);
      const handler =
        controller[route.handler as keyof typeof controller].bind(controller);

      const body = ((data, type): any => {
        if (!isString(data)) {
          return data;
        }

        if (type === "application/json") {
          try {
            return JSON.parse(data.trim());
          } catch (err: unknown) {
            // TODO: translate to en
            console.warn("Не удалось распарсить JSON:", err);
          }
        }

        return data;
      })(
        "postData" in event ? event?.postData?.contents : null,
        "postData" in event ? event?.postData?.type : "text/plain"
      );

      const args = this.buildMethodParams(controller, route.handler, {
        event,
        query: event.parameter,
        params: this.extractPathParams(route.path, request.url.pathname!),
        request,
        headers,
        body
        // TODO: add response
      });

      const result = handler(...args);
      const response = this.createResponse(request, undefined, headers, result);

      return this.wrapResponse(request, response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err?.stack || err?.message);
      } else {
        console.error(String(err));
      }

      const response = this.createResponse(
        request,
        HttpStatus.INTERNAL_SERVER_ERROR,
        headers,
        String(err)
      );

      return this.wrapResponse(request, response);
    }
  }

  /**
   * A universal handler for Google Apps Script events (excluding HTTP events).
   * This method scans registered controllers and their methods for corresponding event decorators.
   *
   * It iterates through all known controllers, resolves their instances, and then examines each method to find those decorated with specific Apps Script event types (e.g., `@Open`, `@Edit`).
   * If a method's event type matches the current `eventType` and passes any defined filters, the method's arguments are built, and the method is executed.
   *
   * @param event - The raw Apps Script event object. The structure of this object varies based on the specific Apps Script trigger that fired.
   * @param eventType - The expected type of event. This is used to match with the metadata placed by event decorators on controller methods.
   */
  private handleAppsScriptEvent(
    event: any,
    eventType: AppsScriptEventType
  ): void {
    for (const ControllerClass of this._controllers) {
      const isController = Reflect.getMetadata(
        CONTROLLER_WATERMARK,
        ControllerClass
      );

      if (!isController) {
        continue;
      }

      const controllerType: string | undefined = Reflect.getMetadata(
        CONTROLLER_TYPE_METADATA,
        ControllerClass
      );

      const isAppsScriptController =
        typeof controllerType === "string" &&
        controllerType.startsWith("appsscript");

      if (!isAppsScriptController) {
        continue;
      }

      const controllerInstance = this.resolve(ControllerClass);
      const prototype = Object.getPrototypeOf(controllerInstance);

      const methodNames: string[] = [];
      let currentProto = prototype;
      while (currentProto && currentProto !== Object.prototype) {
        Object.getOwnPropertyNames(currentProto).forEach(name => {
          if (
            name !== "constructor" &&
            typeof currentProto[name] === "function"
          ) {
            methodNames.push(name);
          }
        });
        currentProto = Object.getPrototypeOf(currentProto);
      }

      for (const methodName of methodNames) {
        const methodFunction = prototype[methodName];

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

        const matchesFilters = this.checkEventFilters(
          eventType,
          event,
          methodOptions
        );

        if (!matchesFilters) {
          continue;
        }

        const args = this.buildMethodParams(controllerInstance, methodName, {
          event
        });

        try {
          controllerInstance[methodName](...args);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error("Error:", err.stack);
          }
        }
      }
    }
  }

  /**
   * Checks if an Apps Script event matches specific filters defined in method options.
   * This allows event handlers to be triggered conditionally based on properties of the event, such as the edited range in a sheet, the ID of a submitted form, or the type of change.
   *
   * @param eventType - The type of Apps Script event (e.g., EDIT, FORM_SUBMIT).
   * @param event - The raw Apps Script event object. Its type varies based on `eventType`.
   * @param methodOptions - An object containing filtering options for the event.
   * @returns `true` if the event matches the specified filters or if no filters are defined, otherwise `false`.
   */
  private checkEventFilters(
    eventType: AppsScriptEventType,
    event: any,
    methodOptions: Record<string, any> | undefined
  ): boolean {
    if (!methodOptions) {
      return true;
    }

    switch (eventType) {
      case AppsScriptEventType.EDIT:
        if (methodOptions.range) {
          const eventRangeA1 = (
            event as GoogleAppsScript.Events.SheetsOnEdit
          ).range?.getA1Notation();

          if (!eventRangeA1) {
            return false;
          }

          const ranges = Array.isArray(methodOptions.range)
            ? methodOptions.range
            : [methodOptions.range];

          return ranges.some((r: string | RegExp) => {
            if (r instanceof RegExp) {
              return r.test(eventRangeA1);
            }

            return eventRangeA1 === r;
          });
        }
        break;

      case AppsScriptEventType.FORM_SUBMIT:
        if (methodOptions.formId) {
          const eventFormId = (
            event as GoogleAppsScript.Events.FormsOnFormSubmit
          ).source?.getId?.();

          if (!eventFormId) {
            return false;
          }

          const formIds = Array.isArray(methodOptions.formId)
            ? methodOptions.formId
            : [methodOptions.formId];

          return formIds.some((id: string) => eventFormId === id);
        }
        break;

      case AppsScriptEventType.CHANGE:
        if (methodOptions.changeType) {
          const eventChangeType = (
            event as GoogleAppsScript.Events.SheetsOnChange
          ).changeType;

          if (!eventChangeType) {
            return false;
          }

          const changeTypes = Array.isArray(methodOptions.changeType)
            ? methodOptions.changeType
            : [methodOptions.changeType];

          return changeTypes.some(type => eventChangeType === type);
        }
        break;
    }

    return true;
  }

  /**
   * Creates a structured {@link HttpRequest} object from a raw Apps Script `DoGet` or `DoPost` event.
   * This involves parsing headers (if provided in event parameters), determining the request method, normalizing the path, extracting query parameters, and retrieving the request body for POST/PUT/PATCH/DELETE methods.
   *
   * @param methodRequest - The expected request method, used as a fallback if the method isn't explicitly in `event.parameter.method`.
   * @param event - The raw Apps Script `doGet` or `doPost` event object.
   * @returns A structured object representing the HTTP request.
   */
  private createRequest(
    methodRequest: RequestMethod,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost
  ): HttpRequest {
    const headers: HttpHeaders =
      ((input: unknown): any => {
        if (!isString(input)) {
          return null;
        }

        try {
          return JSON.parse(input.trim());
        } catch (err) {
          // TODO: translate to en
          console.warn("Не удалось распарсить JSON:", err);
        }

        return null;
      })(event?.parameter?.headers) || {};

    const methodParam = event?.parameter?.method?.toLowerCase();
    const method = Object.values(RequestMethod).includes(
      methodParam as RequestMethod
    )
      ? (methodParam as RequestMethod)
      : methodRequest;

    const rawPathname =
      event?.pathInfo ||
      event?.parameter?.path ||
      event?.parameter?.pathname ||
      "";
    const pathname = normalize(rawPathname);

    const search = (params =>
      isString(params) && params.length > 0 ? `?${params}` : undefined)(
      event?.queryString
    );

    const url: ParsedUrl = {
      pathname,
      path: search ? `${pathname}${search}` : pathname,
      search,
      query: event?.parameters ?? {}
    };

    const body = [
      RequestMethod.POST,
      RequestMethod.PUT,
      RequestMethod.PATCH,
      RequestMethod.DELETE
    ].includes(method)
      ? "postData" in event
        ? event?.postData?.contents
        : null
      : null;

    return {
      headers,
      method,
      url,
      body
    };
  }

  /**
   * Creates a structured {@link HttpResponse} object based on the incoming request, a desired HTTP status, headers, and response data.
   *
   * It automatically determines the `statusText` and `ok` status based on the `resolvedStatus`.
   * For successful responses (2xx status codes), the `body` contains the `data`.
   * For error responses (non-2xx status codes), the `body` is wrapped in an `error` object.
   *
   * @param request - The original request object, used to infer default status for GET/POST.
   * @param status - The desired HTTP status code. If `undefined`, it defaults to `OK` for GET/HEAD/OPTIONS and `CREATED` for others.
   * @param [headers={}] - Optional custom headers to include in the response.
   * @param [data=null] - The data to be sent in the response body.
   * @returns A structured object representing the HTTP response.
   */
  private createResponse(
    request: HttpRequest,
    status: HttpStatus | undefined,
    headers: HttpHeaders | undefined = {},
    data: unknown = null
  ): HttpResponse {
    const resolvedStatus =
      status ??
      ([RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS].includes(
        request.method
      )
        ? HttpStatus.OK
        : HttpStatus.CREATED);

    const statusText = ((): string => {
      const entry = Object.entries(HttpStatus).find(
        ([, value]) => value === resolvedStatus
      );

      return entry ? entry[0] : "UNKNOWN_STATUS";
    })();

    const ok = resolvedStatus >= 200 && resolvedStatus < 300;

    return {
      headers,
      ok,
      status: resolvedStatus,
      statusText,
      body: ok
        ? data
        : {
            error: data
          }
    };
  }

  /**
   * Wraps a {@link HttpResponse} object into a format suitable for return from Apps Script entry point functions (e.g., `doGet`, `doPost`).
   *
   * This method determines the appropriate output type (TextOutput, HtmlOutput, or raw string) based on the `Accept` header in the incoming {@link HttpRequest} and the content type.
   *
   * @param request - The structured request object, including headers and URL.
   * @param response - The structured response object to be wrapped.
   * @returns A value that Apps Script can return directly to the client (e.g., web browser, Google Sheets UI).
   */
  private wrapResponse(
    request: HttpRequest,
    response: HttpResponse
  ):
    | string
    | GoogleAppsScript.Content.TextOutput
    | GoogleAppsScript.HTML.HtmlOutput {
    const mimeType =
      (request.headers?.Accept as HeaderAcceptMimeType) ||
      HeaderAcceptMimeType.HTML;

    response.headers["Content-Type"] = mimeType;

    // FIXME: remove after debug
    console.log("response:", JSON.stringify(response, null, 2));

    const isApi = request.url.pathname?.startsWith("/api/") || false;
    const result = JSON.stringify(isApi ? response : response.body);

    switch (mimeType) {
      case HeaderAcceptMimeType.GOOGLE_JSON:
        return result;

      case HeaderAcceptMimeType.GOOGLE_TEXT:
        return result;

      case HeaderAcceptMimeType.JSON:
        return ContentService.createTextOutput(result).setMimeType(
          ContentService.MimeType.JSON
        );

      case HeaderAcceptMimeType.TEXT:
        return ContentService.createTextOutput(result).setMimeType(
          ContentService.MimeType.TEXT
        );

      case HeaderAcceptMimeType.HTML:
        return HtmlService.createHtmlOutput(result);
    }
  }

  /**
   * Creates an array of arguments for invoking a controller method, based on parameter metadata and the provided context.
   *
   * This method inspects the metadata associated with the target method's parameters (e.g., `@Param`, `@Query`, `@Body`, `@Inject`) to populate the arguments array from the `ctx` (context) object.
   *
   * @param target - The controller instance (the target object).
   * @param propertyKey - The name of the method to be invoked.
   * @param ctx - The context object containing event data.
   * @param ctx.event - The raw Apps Script event object.
   * @param [ctx.params] - An object containing extracted path parameters (e.g., from a URL like `/users/{id}`).
   * @param [ctx.query] - An object containing query parameters (e.g., from a URL like `?name=value`).
   * @param [ctx.body] - The raw request body content, typically a JSON string for POST requests.
   * @param [ctx.request] - A structured request object derived from the Apps Script event.
   * @param [ctx.headers] - An object containing request headers.
   * @param [ctx.response] - A structured response object.
   * @returns An array of arguments, ready to be passed into the controller method.
   */
  private buildMethodParams(
    target: object,
    propertyKey: string | symbol,
    ctx: {
      event:
        | GoogleAppsScript.Events.DoGet
        | GoogleAppsScript.Events.DoPost
        | GoogleAppsScript.Events.AddonOnInstall
        | GoogleAppsScript.Events.DocsOnOpen
        | GoogleAppsScript.Events.SlidesOnOpen
        | GoogleAppsScript.Events.SheetsOnOpen
        | GoogleAppsScript.Events.FormsOnOpen
        | GoogleAppsScript.Events.SheetsOnEdit
        | GoogleAppsScript.Events.SheetsOnChange
        | GoogleAppsScript.Events.SheetsOnSelectionChange
        | GoogleAppsScript.Events.FormsOnFormSubmit;
      params?: Record<string, string>;
      query?: Record<string, string | string[]>;
      request?: HttpRequest;
      headers?: HttpHeaders;
      body?: string | object | null | undefined;
      response?: HttpResponse;
    }
  ): any[] {
    const targetPrototype = Object.getPrototypeOf(target);

    const rawMetadata: Record<string, ParamDefinition> =
      Reflect.getMetadata(
        PARAM_DEFINITIONS_METADATA,
        targetPrototype,
        propertyKey
      ) || {};

    const rawInjectMetadata: Record<string, InjectTokenDefinition> =
      getInjectionTokens(targetPrototype, propertyKey);

    const metadata: (ParamDefinition | InjectTokenDefinition)[] = (
      Object.values(rawMetadata) as (ParamDefinition | InjectTokenDefinition)[]
    ).concat(
      Object.values(rawInjectMetadata) as (
        | ParamDefinition
        | InjectTokenDefinition
      )[]
    );

    metadata.sort((a, b) => a.index - b.index);

    const designParamTypes: Newable<any>[] =
      Reflect.getMetadata(PARAMTYPES_METADATA, targetPrototype, propertyKey) ||
      [];

    const args: any[] = [];

    for (const param of metadata) {
      switch (param.type) {
        case ParamSource.PARAM:
          args[param.index] = param.key
            ? (ctx.params ?? {})[param.key]
            : ctx.params;
          break;

        case ParamSource.QUERY:
          args[param.index] = param.key
            ? (ctx.query ?? {})[param.key]
            : ctx.query;
          break;

        case ParamSource.BODY:
          args[param.index] =
            param.key && ctx.body && typeof ctx.body === "object"
              ? (ctx.body as Record<string, any>)[param.key]
              : ctx.body;
          break;

        case ParamSource.EVENT:
          args[param.index] = param.key
            ? (ctx.event as any)[param.key]
            : ctx.event;
          break;

        case ParamSource.REQUEST:
          args[param.index] = param.key
            ? (ctx.request as any)?.[param.key]
            : ctx.request;
          break;

        case ParamSource.HEADERS:
          if (param.key && ctx.headers) {
            const headerKey = Object.keys(ctx.headers).find(
              k => k.toLowerCase() === param.key!.toLowerCase()
            );
            args[param.index] = headerKey ? ctx.headers[headerKey] : undefined;
          } else {
            args[param.index] = ctx.headers;
          }
          break;

        case ParamSource.RESPONSE:
          args[param.index] = param.key
            ? (ctx.response as any)?.[param.key]
            : ctx.response;
          break;

        case ParamSource.INJECT:
          try {
            const tokenToResolve =
              "token" in param ? param.token : designParamTypes[param.index];

            if (tokenToResolve) {
              args[param.index] = this.resolve(tokenToResolve);
            } else {
              args[param.index] = undefined;
            }
          } catch (err: unknown) {
            args[param.index] = undefined;
          }
          break;
      }
    }

    return args;
  }

  /**
   * Resolves a class (Controller or Provider) and its dependencies from the DI container.
   *
   * @template T - The type of the class to resolve.
   * @param {Newable<T>} target - The constructor function of the class to be resolved.
   * This class should typically be decorated with `@Injectable()` or `@SheetsController()`.
   * @returns {T} An instance of the target class with all its dependencies injected.
   */
  private resolve<T>(target: Newable<T>): T {
    if (this._providers.has(target)) {
      const instance = this._providers.get(target);

      if (instance) {
        return instance as T;
      }
    }

    const designParamTypes: Newable[] =
      Reflect.getMetadata(PARAMTYPES_METADATA, target) || [];

    const explicitInjectTokens = getInjectionTokens(target);

    const deps = designParamTypes.map((type, index) => {
      const paramKey = `${ParamSource.INJECT}:${index}`;
      const injectDefinition = explicitInjectTokens[paramKey];
      const tokenToResolve = injectDefinition ? injectDefinition.token : type;

      if (!tokenToResolve) {
        return undefined;
      }

      return this.resolve(tokenToResolve);
    });

    if (deps.some(dep => dep === undefined)) {
      throw new Error(`Could not resolve all dependencies for ${target.name}`);
    }

    const instance = new target(...deps);

    const isController = Reflect.hasMetadata(CONTROLLER_WATERMARK, target);
    const isInjectable = Reflect.hasMetadata(INJECTABLE_WATERMARK, target);

    if (isController || isInjectable) {
      this._providers.set(target, instance);
    } else {
      console.warn(
        `[Resolve WARN] ${target.name} is not registered as a provider and is not marked @Injectable() or @Controller().`
      );
    }

    return instance;
  }

  /**
   * Checks if a given path matches a specified template.
   *
   * @param template - The path template (e.g., '/users/{id}').
   * @param actual - The actual request path (e.g., '/users/123').
   * @returns `true` if the paths match, otherwise `false`.
   */
  private pathMatch(template: string, actual: string): boolean {
    const tplParts = template.split("/").filter(Boolean);
    const actParts = actual.split("/").filter(Boolean);

    if (tplParts.length !== actParts.length) {
      return false;
    }

    return tplParts.every((part, i) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        return true;
      }
      return part === actParts[i];
    });
  }

  /**
   * Extracts path parameters from an actual URL based on a given template.
   *
   * @param template - The path template, e.g., "/users/{id}/posts/{postId}".
   * @param actual - The actual path, e.g., "/users/123/posts/456".
   * @returns An object containing the extracted path parameters.
   * For example, for the above inputs, it might return `{ id: "123", postId: "456" }`.
   */
  private extractPathParams(
    template: string,
    actual: string
  ): Record<string, string> {
    const tplParts = template.split("/").filter(Boolean);
    const actParts = actual.split("/").filter(Boolean);
    const params: Record<string, string> = {};

    tplParts.forEach((part, i) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        const paramName = part.slice(1, -1);
        params[paramName] = actParts[i];
      }
    });

    return params;
  }
}
