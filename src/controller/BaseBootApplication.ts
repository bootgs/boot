import { isEmpty, isString, normalize } from "apps-script-utils";
import {
  ApplicationConfig,
  ApplicationProperties,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  InjectionToken,
  Newable,
  Provider,
  RouteMetadata
} from "../domain/types";
import { RequestMethod } from "../domain/enums";
import {
  EventDispatcher,
  RequestFactory,
  Resolver,
  ResponseBuilder,
  Router,
  RouterExplorer
} from "../service";
import { isControllerAdvice } from "../shared/utils";

/**
 * Base application class for bootstrapping and handling Google Apps Script events.
 */
export abstract class BaseBootApplication {
  /**
   * Application controller map, mapping their constructors to instances.
   */
  protected readonly _controllers: Map<Newable, unknown> = new Map<Newable, unknown>();

  /**
   * Application provider map used for dependency injection.
   */
  protected readonly _providers: Map<InjectionToken, unknown> = new Map<InjectionToken, unknown>();

  /**
   * Application configuration properties.
   */
  protected readonly _config: ApplicationProperties;

  /**
   * Global prefix for all API routes.
   */
  protected readonly _apiPrefix: string | undefined;

  /**
   * List of tokens for controller advices (e.g., exception handlers).
   */
  protected readonly _advices: InjectionToken[] = [];

  /**
   * Resolver for resolving dependencies and obtaining class instances.
   */
  protected readonly _resolver: Resolver;

  /**
   * Router for managing request routing.
   */
  protected readonly _router: Router;

  /**
   * Factory for creating HTTP request objects from Google Apps Script events.
   */
  protected readonly _requestFactory: RequestFactory;

  /**
   * HTTP response builder for sending responses to the client.
   */
  protected readonly _responseBuilder: ResponseBuilder;

  /**
   * Event dispatcher for handling and distributing internal application events.
   */
  protected readonly _eventDispatcher: EventDispatcher;

  /**
   * Creates a new instance of BaseBootApplication.
   *
   * @param {ApplicationConfig} config - The application configuration.
   */
  protected constructor(config?: ApplicationConfig) {
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
      isString(config?.apiPrefix) && !isEmpty(config.apiPrefix)
        ? normalize(`/${config.apiPrefix}/`)
        : "/api";

    this._apiPrefix = apiPrefix;

    this._responseBuilder = new ResponseBuilder(apiPrefix);

    const explorer: RouterExplorer = new RouterExplorer();

    const routes: RouteMetadata[] = explorer.explore(this._controllers);

    this._router = new Router(this._resolver, routes, this._advices, this._config, apiPrefix);

    this._eventDispatcher = new EventDispatcher(this._resolver, this._controllers);
  }

  /**
   * Handles incoming HTTP requests and routes them to the appropriate controller.
   *
   * @param   {RequestMethod} method - The HTTP method (GET or POST).
   * @param   {GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost} event - The Apps Script event object.
   * @returns {{ request: HttpRequest, response: HttpResponse | Promise<HttpResponse> }} The request and response.
   */
  protected handleHttpRequestInternal(
    method: RequestMethod,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost
  ): { request: HttpRequest; response: HttpResponse | Promise<HttpResponse> } {
    const request: HttpRequest = this._requestFactory.create(method, event);

    const response: HttpResponse | Promise<HttpResponse> = this._router.handle(
      request,
      event,
      (
        req: HttpRequest,
        status: number | undefined,
        headers: HttpHeaders | undefined,
        data: unknown
      ): HttpResponse => this._responseBuilder.create(req, status, headers, data)
    );

    return { request, response };
  }
}
