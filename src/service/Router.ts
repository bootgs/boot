import { isFunctionLike, isNumber, isString } from "apps-script-utils";
import {
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  InjectionToken,
  InjectTokenDefinition,
  Newable,
  ParamDefinition,
  PipeTransform,
  RouteMetadata
} from "../domain/types";
import {
  EXCEPTION_HANDLER_METADATA,
  PARAM_DEFINITIONS_METADATA,
  PARAMTYPES_METADATA,
  PIPES_METADATA,
  RESPONSE_STATUS_METADATA
} from "../domain/constants";
import { HttpStatus, ParamSource } from "../domain/enums";
import { RouteExecutionContext } from "../domain/entities";
import { getInjectionTokens } from "../repository";
import { PathMatcher, Resolver } from "../service";
import { isHttpResponse, isRecord } from "../shared/utils";

/**
 * Router service for handling HTTP requests and dispatching them to controllers.
 */
export class Router {
  private readonly pathMatcher: PathMatcher = new PathMatcher();

  /**
   * Creates a new instance of Router.
   *
   * @param {Resolver} _resolver The dependency resolver.
   * @param {RouteMetadata[]} _routes The registered routes.
   * @param {InjectionToken[]} _advices The registered controller advices.
   * @param {Record<string, any>} _config Application configuration.
   */
  constructor(
    private readonly _resolver: Resolver,
    private readonly _routes: RouteMetadata[],
    private readonly _advices: InjectionToken[] = [],
    private readonly _config: Record<string, any> = {},
    private readonly _apiPrefix: string | null = null
  ) {}

  /**
   * Handles an incoming HTTP request.
   *
   * @param   {HttpRequest} request - The HTTP request object.
   * @param   {GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost} event - The Apps Script event object.
   * @param   {Function} responseBuilder - A function to build an HTTP response.
   * @returns {HttpResponse} The HTTP response.
   */
  public handle(
    request: HttpRequest,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost,
    responseBuilder: (
      request: HttpRequest,
      status?: number,
      headers?: HttpHeaders,
      data?: unknown
    ) => HttpResponse
  ): HttpResponse {
    const requestPathname: string = request.url.pathname;

    const route: RouteMetadata | undefined = this._routes.find((route: RouteMetadata): boolean => {
      const routeMethod: string = String(route.method).toLowerCase().trim();

      const requestMethod: string = String(request.method).toLowerCase().trim();

      if (routeMethod !== requestMethod) {
        return false;
      }

      return this.pathMatcher.match(route.path, requestPathname);
    });

    if (!route) {
      return responseBuilder(
        request,
        HttpStatus.NOT_FOUND,
        {},
        { message: `Cannot ${request.method} ${request.url.pathname}` }
      );
    }

    const controllerInstance: any = this._resolver.resolve(route.controller);

    const params: Record<string, string> = this.pathMatcher.extractParams(
      route.path,
      requestPathname
    );

    const ctx: RouteExecutionContext = {
      event,
      params,
      query: request.url.query,
      request,
      headers: request.headers,
      body: request.body,
      response: responseBuilder(request, undefined, {}, null)
    };

    if (!isRecord(controllerInstance)) {
      throw new Error(`Controller '${route.controller.name}' is not a valid object.`);
    }

    const handler = controllerInstance[ route.handler ];

    if (!isFunctionLike(handler)) {
      throw new Error(
        `Method '${String(route.handler)}' not found in controller '${route.controller.name}'.`
      );
    }

    const args = this.buildMethodParams(controllerInstance, route.handler, ctx);

    try {
      const result: unknown = Reflect.apply(handler, controllerInstance, args);

      if (isHttpResponse(result)) {
        return result;
      }

      const responseStatus: number | undefined = Reflect.getMetadata(
        RESPONSE_STATUS_METADATA,
        handler
      );

      return responseBuilder(
        request,
        responseStatus ?? ctx.response?.status,
        ctx.response?.headers,
        result
      );
    } catch (err: unknown) {
      const handledResponse: HttpResponse | null = this.handleException(
        err,
        controllerInstance,
        request,
        event,
        responseBuilder
      );

      if (handledResponse) {
        return handledResponse;
      }

      let status: number = 500;
      let message: string = String(err);

      if (isRecord(err)) {
        if (isNumber(err.status)) status = err.status;
        if (isString(err.message)) message = err.message;
      }

      return responseBuilder(request, status, {}, message);
    }
  }

  /**
   * Handles an exception using registered exception handlers.
   *
   * @param   {unknown} err - The error to handle.
   * @param   {any} controllerInstance - The controller instance where the error occurred.
   * @param   {HttpRequest} request - The HTTP request object.
   * @param   {GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost} event - The Apps Script event object.
   * @param   {Function} responseBuilder - A function to build an HTTP response.
   * @returns {HttpResponse | null} The handled response, or null if no handler was found.
   */
  private handleException(
    err: unknown,
    controllerInstance: any,
    request: HttpRequest,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost,
    responseBuilder: (
      request: HttpRequest,
      status?: number,
      headers?: HttpHeaders,
      data?: unknown
    ) => HttpResponse
  ): HttpResponse | null {
    // 1. Try local handlers in the controller
    const localHandler: string | null = this.findExceptionHandler(err, controllerInstance);

    if (localHandler) {
      return this.callExceptionHandler(
        localHandler,
        controllerInstance,
        err,
        request,
        event,
        responseBuilder
      );
    }

    // 2. Try global advices
    for (const adviceToken of this._advices) {
      const adviceInstance: unknown = this._resolver.resolve(adviceToken);

      const globalHandler: string | null = this.findExceptionHandler(err, adviceInstance);

      if (globalHandler) {
        return this.callExceptionHandler(
          globalHandler,
          adviceInstance,
          err,
          request,
          event,
          responseBuilder
        );
      }
    }

    return null;
  }

  /**
   * Finds an exception handler for a given error in a target instance.
   *
   * @param   {unknown} err - The error to handle.
   * @param   {any} instance - The instance to search for handlers.
   * @returns {string | null} The name of the handler method, or null if not found.
   */
  private findExceptionHandler(err: unknown, instance: any): string | null {
    if (!instance) {
      return null;
    }

    const prototype: any = Object.getPrototypeOf(instance);

    const propertyNames: string[] = Object.getOwnPropertyNames(prototype);

    for (const propertyName of propertyNames) {
      const method: any = instance[ propertyName ];

      if (!isFunctionLike(method)) continue;

      const exceptions: Newable<Error>[] | undefined = Reflect.getMetadata(
        EXCEPTION_HANDLER_METADATA,
        method
      );

      if (exceptions && Array.isArray(exceptions)) {
        for (const exceptionClass of exceptions) {
          if (err instanceof exceptionClass) {
            return propertyName;
          }
        }
      }
    }

    return null;
  }

  /**
   * Calls an exception handler method.
   *
   * @param   {string} handlerName - The name of the handler method.
   * @param   {any} instance - The instance containing the handler method.
   * @param   {unknown} err - The error to handle.
   * @param   {HttpRequest} request - The HTTP request object.
   * @param   {GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost} event - The Apps Script event object.
   * @param   {Function} responseBuilder - A function to build an HTTP response.
   * @returns {HttpResponse} The resulting HTTP response.
   */
  private callExceptionHandler(
    handlerName: string,
    instance: any,
    err: unknown,
    request: HttpRequest,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost,
    responseBuilder: (
      request: HttpRequest,
      status?: number,
      headers?: HttpHeaders,
      data?: unknown
    ) => HttpResponse
  ): HttpResponse {
    const handler = instance[ handlerName ];

    // TODO: Support argument injection for exception handlers (similar to buildMethodParams)
    // For now, just pass the error as the first argument.
    const result: unknown = Reflect.apply(handler, instance, [err, request, event]);

    if (isHttpResponse(result)) {
      return result;
    }

    const responseStatus: number | undefined = Reflect.getMetadata(
      RESPONSE_STATUS_METADATA,
      handler
    );

    return responseBuilder(request, responseStatus, {}, result);
  }

  /**
   * Resolves a configuration value by its key.
   * Supports nested keys (e.g., "app.name").
   *
   * @param   {string} key - The configuration key.
   * @returns {unknown} The resolved value.
   */
  private resolveConfigValue(key: string): unknown {
    if (!key) return undefined;

    const parts: string[] = key.split(".");

    let current: any = this._config;

    for (const part of parts) {
      if (current === null || typeof current !== "object") {
        return undefined;
      }

      current = current[ part ];
    }

    return current;
  }

  /**
   * Builds the parameters for a controller method based on the route execution context.
   *
   * @param   {object} target - The target object.
   * @param   {string | symbol} propertyKey - The name of the property.
   * @param   {RouteExecutionContext} ctx - The route execution context.
   * @returns {unknown[]} An array of parameters for the method.
   */
  private buildMethodParams(
    target: object,
    propertyKey: string | symbol,
    ctx: RouteExecutionContext
  ): unknown[] {
    const targetPrototype: Record<string, unknown> = Object.getPrototypeOf(target);

    const rawMetadata: Record<string, ParamDefinition> =
      Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, targetPrototype, propertyKey) || {};

    const rawInjectMetadata: Record<string, InjectTokenDefinition> = getInjectionTokens(
      targetPrototype,
      propertyKey
    );

    const metadata: (ParamDefinition | InjectTokenDefinition)[] = [
      ...Object.values(rawMetadata),
      ...Object.values(rawInjectMetadata)
    ];

    metadata.sort(
      (
        a: ParamDefinition | InjectTokenDefinition,
        b: ParamDefinition | InjectTokenDefinition
      ): number => a.index - b.index
    );

    const designParamTypes: Newable[] =
      Reflect.getMetadata(PARAMTYPES_METADATA, targetPrototype, propertyKey) || [];

    const handler: any = (target as any)[ propertyKey ];

    const controllerPipes: any[] =
      Reflect.getMetadata(PIPES_METADATA, targetPrototype.constructor) || [];

    const methodPipes: any[] = Reflect.getMetadata(PIPES_METADATA, handler) || [];

    const globalPipes: any[] = [...controllerPipes, ...methodPipes];

    const args: unknown[] = new Array(
      Math.max(
        handler.length,
        designParamTypes.length,
        metadata.length > 0
          ? Math.max(
              ...metadata.map((m: ParamDefinition | InjectTokenDefinition): number => m.index)
            ) + 1
          : 0
      )
    );

    for (const param of metadata) {
      let value: unknown;

      switch (param.type) {
        case ParamSource.PARAM:
          value = param.key ? (ctx.params ?? {})[ param.key ] : ctx.params;
          break;

        case ParamSource.QUERY:
          value = param.key ? (ctx.query ?? {})[ param.key ] : ctx.query;
          break;

        case ParamSource.BODY:
          value = param.key && isRecord(ctx.body) ? ctx.body[ param.key ] : ctx.body;
          break;

        case ParamSource.EVENT:
          value = param.key && isRecord(ctx.event) ? ctx.event[ param.key ] : ctx.event;
          break;

        case ParamSource.REQUEST:
          value = param.key && isRecord(ctx.request) ? ctx.request[ param.key ] : ctx.request;
          break;

        case ParamSource.HEADERS:
          {
            if (param.key && ctx.headers) {
              const headerKey: string | undefined = Object.keys(ctx.headers).find(
                (k: string): boolean => k.toLowerCase() === param.key!.toLowerCase()
              );

              value = headerKey ? ctx.headers[ headerKey ] : undefined;
            } else {
              value = ctx.headers;
            }
          }
          break;

        case ParamSource.RESPONSE:
          value = param.key && isRecord(ctx.response) ? ctx.response[ param.key ] : ctx.response;
          break;

        case ParamSource.VALUE:
          {
            const valueKey: string | undefined =
              "key" in param ? param.key : "token" in param ? (param.token as string) : undefined;

            value = this.resolveConfigValue(valueKey as string);
          }
          break;

        case ParamSource.INJECT:
          {
            try {
              const tokenToResolve: InjectionToken | undefined =
                "token" in param ? param.token : designParamTypes[ param.index ];

              if (tokenToResolve) {
                value = this._resolver.resolve(tokenToResolve);
              } else {
                value = undefined;
              }
            } catch {
              value = undefined;
            }
          }
          break;
      }

      const pipes: any[] = [
        ...globalPipes,
        ...("pipes" in param && Array.isArray(param.pipes) ? param.pipes : [])
      ];

      for (const pipe of pipes) {
        try {
          if (typeof pipe === "function") {
            if (pipe.prototype && pipe.prototype.transform) {
              const pipeInstance = this._resolver.resolve<PipeTransform>(pipe);

              value = pipeInstance.transform(value, {
                type: param.type,
                metatype: designParamTypes[ param.index ],
                data: "key" in param ? param.key : undefined
              });
            } else {
              value = pipe(value, {
                type: param.type,
                metatype: designParamTypes[ param.index ],
                data: "key" in param ? param.key : undefined
              });
            }
          } else if (pipe && typeof pipe.transform === "function") {
            value = (pipe as PipeTransform).transform(value, {
              type: param.type,
              metatype: designParamTypes[ param.index ],
              data: "key" in param ? param.key : undefined
            });
          }
        } catch (err) {
          throw err;
        }
      }

      args[ param.index ] = value;
    }

    return args;
  }
}
