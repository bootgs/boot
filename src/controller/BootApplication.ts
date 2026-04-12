import { isEmpty, isString, normalize } from "apps-script-utils";
import {
  ApplicationConfig,
  ApplicationProperties,
  AppsScriptMenuProxy,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  InjectionToken,
  Newable,
  Provider,
  RouteMetadata
} from "../domain/types";
import { AppsScriptEventType, RequestMethod } from "../domain/enums";
import { EventDispatcher, RequestFactory, Resolver, ResponseBuilder, Router, RouterExplorer } from "../service";
import { isControllerAdvice } from "../shared/utils";

/**
 * Main application class for bootstrapping and handling Google Apps Script events.
 */
export class BootApplication {
  /**
   * Application controller map, mapping their constructors to instances.
   */
  private readonly _controllers: Map<Newable, unknown> = new Map<Newable, unknown>();

  /**
   * Application provider map used for dependency injection.
   */
  private readonly _providers: Map<InjectionToken, unknown> = new Map<InjectionToken, unknown>();

  /**
   * Application configuration properties.
   */
  private readonly _config: ApplicationProperties;

  /**
   * Global prefix for all API routes.
   */
  private readonly _apiPrefix: string | undefined;

  /**
   * List of tokens for controller advices (e.g., exception handlers).
   */
  private readonly _advices: InjectionToken[] = [];

  /**
   * Resolver for resolving dependencies and obtaining class instances.
   */
  private readonly _resolver: Resolver;

  /**
   * Router for managing request routing.
   */
  private readonly _router: Router;

  /**
   * Factory for creating HTTP request objects from Google Apps Script events.
   */
  private readonly _requestFactory: RequestFactory;

  /**
   * HTTP response builder for sending responses to the client.
   */
  private readonly _responseBuilder: ResponseBuilder;

  /**
   * Event dispatcher for handling and distributing internal application events.
   */
  private readonly _eventDispatcher: EventDispatcher;

  /**
   * Creates a new instance of BootApplication.
   *
   * @param {ApplicationConfig} config - The application configuration.
   */
  constructor(config?: ApplicationConfig) {
    this._config = config?.config ?? {};

    (config?.controllers || []).forEach(
      (c: Newable): Map<Newable, unknown> => this._controllers.set(c, null)
    );

    (config?.providers || []).forEach((provider: Provider): void => {
      let token: InjectionToken;

      if ("provide" in provider) {
        token = provider.provide;
        if ("useValue" in provider) {
          this._providers.set(provider.provide, provider.useValue);
        } else if ("useClass" in provider) {
          this._providers.set(provider.provide, null); // Will be resolved later
        } else if ("useFactory" in provider) {
          // TODO: implement factory providers
          this._providers.set(provider.provide, null);
        } else if ("useExisting" in provider) {
          // TODO: implement existing providers
          this._providers.set(provider.provide, null);
        }
      } else {
        token = provider;
        this._providers.set(provider, null);
      }

      if (isControllerAdvice(token)) {
        this._advices.push(token);
      }
    });

    this._resolver = new Resolver(this._controllers, this._providers, this._config);

    this._requestFactory = new RequestFactory();

    const apiPrefix: string =
      isString(config?.config?.apiPrefix) && !isEmpty(config.config.apiPrefix)
        ? normalize(`/${config.config.apiPrefix}/`)
        : "/api";

    this._apiPrefix = apiPrefix;

    this._responseBuilder = new ResponseBuilder(apiPrefix);

    const explorer: RouterExplorer = new RouterExplorer();

    const routes: RouteMetadata[] = explorer.explore(this._controllers);

    this._router = new Router(this._resolver, routes, this._advices, this._config, apiPrefix);

    this._eventDispatcher = new EventDispatcher(this._resolver, this._controllers);
  }

  /**
   * Returns a Proxy object that can be used to handle Google Apps Script menu actions.
   *
   * @returns {AppsScriptMenuProxy} A Proxy object.
   */
  public get onMenu(): AppsScriptMenuProxy {
    const handler: () => AppsScriptMenuProxy = (): AppsScriptMenuProxy => proxy;

    const proxy: AppsScriptMenuProxy = new Proxy(handler, {
      get: (target, prop, receiver: any): any => {
        if (!isString(prop)) {
          return Reflect.get(target, prop, receiver);
        }

        if (prop === "inspect") {
          return Reflect.get(target, prop, receiver);
        }

        if (prop === "apply" || prop === "call" || prop === "bind") {
          return Reflect.get(target, prop, receiver);
        }

        return (event: GoogleAppsScript.Events.AppsScriptEvent): void => {
          return this._eventDispatcher.dispatchByName(prop, event);
        };
      },
      apply: (target, thisArg: any, argArray): any => {
        return Reflect.apply(target, thisArg, argArray);
      }
    }) as unknown as AppsScriptMenuProxy;

    return proxy;
  }

  /**
   * Handles Google Apps Script doGet events.
   *
   * @param   {GoogleAppsScript.Events.DoGet} event - The doGet event object.
   * @returns {GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string} The response object or string.
   */
  public doGet(
    event: GoogleAppsScript.Events.DoGet
  ): GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string {
    return this.handleHttpRequest(RequestMethod.GET, event);
  }

  /**
   * Handles Google Apps Script doPost events.
   *
   * @param   {GoogleAppsScript.Events.DoPost} event - The doPost event object.
   * @returns {GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string} The response object or string.
   */
  public doPost(
    event: GoogleAppsScript.Events.DoPost
  ): GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string {
    return this.handleHttpRequest(RequestMethod.POST, event);
  }

  /**
   * Handles Google Apps Script onInstall events.
   *
   * @param   {GoogleAppsScript.Events.AddonOnInstall} event - The onInstall event object.
   * @returns {void}
   */
  public onInstall(event: GoogleAppsScript.Events.AddonOnInstall): void {
    this._eventDispatcher.dispatch(AppsScriptEventType.INSTALL, event);
  }

  /**
   * Handles Google Apps Script onOpen events.
   *
   * @param   {GoogleAppsScript.Events.AppsScriptEvent} event - The onOpen event object.
   * @returns {void}
   */
  public onOpen(event: GoogleAppsScript.Events.AppsScriptEvent): void {
    this._eventDispatcher.dispatch(AppsScriptEventType.OPEN, event);
  }

  /**
   * Handles Google Apps Script onEdit events.
   *
   * @param   {GoogleAppsScript.Events.SheetsOnEdit} event - The onEdit event object.
   * @returns {void}
   */
  public onEdit(event: GoogleAppsScript.Events.SheetsOnEdit): void {
    this._eventDispatcher.dispatch(AppsScriptEventType.EDIT, event);
  }

  // TODO: onSelectionChange
  // public onSelectionChange(event: GoogleAppsScript.Events.SheetsOnSelectionChange) {
  //   this.eventDispatcher.dispatch(AppsScriptEventType.SELECTION_CHANGE, event);
  // }

  /**
   * Handles Google Apps Script onChange events.
   *
   * @param   {GoogleAppsScript.Events.SheetsOnChange} event - The onChange event object.
   * @returns {void}
   */
  public onChange(event: GoogleAppsScript.Events.SheetsOnChange): void {
    this._eventDispatcher.dispatch(AppsScriptEventType.CHANGE, event);
  }

  /**
   * Handles Google Apps Script onFormSubmit events.
   *
   * @param   {GoogleAppsScript.Events.FormsOnFormSubmit} event - The onFormSubmit event object.
   * @returns {void}
   */
  public onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit): void {
    this._eventDispatcher.dispatch(AppsScriptEventType.FORM_SUBMIT, event);
  }

  /**
   * Handles incoming HTTP requests and routes them to the appropriate controller.
   *
   * @param   {RequestMethod} method - The HTTP method (GET or POST).
   * @param   {GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost} event - The Apps Script event object.
   * @returns {GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string} The response object or string.
   */
  private handleHttpRequest(
    method: RequestMethod,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost
  ): GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput | string {
    const request: HttpRequest = this._requestFactory.create(method, event);

    const response: HttpResponse = this._router.handle(
      request,
      event,
      (
        req: HttpRequest,
        status: number | undefined,
        headers: HttpHeaders | undefined,
        data: unknown
      ): HttpResponse => this._responseBuilder.create(req, status, headers, data)
    );

    return this._responseBuilder.wrap(request, response);
  }
}
