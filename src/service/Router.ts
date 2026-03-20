import {
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  InjectTokenDefinition,
  Newable,
  ParamDefinition,
  RouteMetadata
} from "../domain/types";
import { PARAM_DEFINITIONS_METADATA, PARAMTYPES_METADATA } from "../domain/constants";
import { ParamSource } from "../domain/enums";
import { RouteExecutionContext } from "../domain/entities";
import { getInjectionTokens } from "../repository";
import { PathMatcher, Resolver } from "../service";
import { isHttpResponse, isRecord } from "../shared/utils";

/**
 * Router service for handling HTTP requests and dispatching them to controllers.
 */
export class Router {
  private readonly pathMatcher = new PathMatcher();

  /**
   * Creates a new instance of Router.
   *
   * @param {Resolver} _resolver The dependency resolver.
   * @param {RouteMetadata[]} _routes The registered routes.
   */
  constructor(
    private readonly _resolver: Resolver,
    private readonly _routes: RouteMetadata[]
  ) {}

  /**
   * Handles an incoming HTTP request.
   *
   * @param {HttpRequest} request The HTTP request object.
   * @param {GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost} event The Apps Script event object.
   * @param {Function} responseBuilder A function to build an HTTP response.
   * @returns {Promise<HttpResponse>} A promise that resolves to the HTTP response.
   */
  public async handle(
    request: HttpRequest,
    event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost,
    responseBuilder: (
      request: HttpRequest,
      status?: number,
      headers?: HttpHeaders,
      data?: unknown
    ) => HttpResponse
  ): Promise<HttpResponse> {
    const route = this._routes.find(
      (r) => r.method === request.method && this.pathMatcher.match(r.path, request.url.pathname)
    );

    if (!route) {
      return responseBuilder(
        request,
        404,
        {},
        { message: `Cannot ${request.method} ${request.url.pathname}` }
      );
    }

    const controllerInstance = this._resolver.resolve(route.controller);

    const params = this.pathMatcher.extractParams(route.path, request.url.pathname);

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

    const args = this.buildMethodParams(controllerInstance, route.handler, ctx);

    try {
      const handler = controllerInstance[ route.handler ];

      if (typeof handler !== "function") {
        throw new Error(
          `Method '${String(route.handler)}' not found in controller '${route.controller.name}'.`
        );
      }

      const result = await Reflect.apply(handler, controllerInstance, args);

      if (isHttpResponse(result)) {
        return result;
      }

      return responseBuilder(request, ctx.response?.status, ctx.response?.headers, result);
    } catch (err: unknown) {
      let status = 500;
      let message = String(err);

      if (isRecord(err)) {
        if (typeof err.status === "number") status = err.status;
        if (typeof err.message === "string") message = err.message;
      }

      return responseBuilder(request, status, {}, message);
    }
  }

  /**
   * Builds the parameters for a controller method based on the route execution context.
   *
   * @param {object} target The target object.
   * @param {string | symbol} propertyKey The name of the property.
   * @param {RouteExecutionContext} ctx The route execution context.
   * @returns {unknown[]} An array of parameters for the method.
   */
  private buildMethodParams(
    target: object,
    propertyKey: string | symbol,
    ctx: RouteExecutionContext
  ): unknown[] {
    const targetPrototype = Object.getPrototypeOf(target);

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

    metadata.sort((a, b) => a.index - b.index);

    const designParamTypes: Newable[] =
      Reflect.getMetadata(PARAMTYPES_METADATA, targetPrototype, propertyKey) || [];

    const args: unknown[] = [];

    for (const param of metadata) {
      switch (param.type) {
        case ParamSource.PARAM:
          args[ param.index ] = param.key ? (ctx.params ?? {})[ param.key ] : ctx.params;
          break;

        case ParamSource.QUERY:
          args[ param.index ] = param.key ? (ctx.query ?? {})[ param.key ] : ctx.query;
          break;

        case ParamSource.BODY:
          args[ param.index ] = param.key && isRecord(ctx.body) ? ctx.body[ param.key ] : ctx.body;
          break;

        case ParamSource.EVENT:
          args[ param.index ] = param.key && isRecord(ctx.event) ? ctx.event[ param.key ] : ctx.event;
          break;

        case ParamSource.REQUEST:
          args[ param.index ] =
            param.key && isRecord(ctx.request) ? ctx.request[ param.key ] : ctx.request;
          break;

        case ParamSource.HEADERS:
          if (param.key && ctx.headers) {
            const headerKey = Object.keys(ctx.headers).find(
              (k) => k.toLowerCase() === param.key!.toLowerCase()
            );
            args[ param.index ] = headerKey ? ctx.headers[ headerKey ] : undefined;
          } else {
            args[ param.index ] = ctx.headers;
          }
          break;

        case ParamSource.RESPONSE:
          args[ param.index ] =
            param.key && isRecord(ctx.response) ? ctx.response[ param.key ] : ctx.response;
          break;

        case ParamSource.INJECT:
          try {
            const tokenToResolve = "token" in param ? param.token : designParamTypes[ param.index ];

            if (tokenToResolve) {
              args[ param.index ] = this._resolver.resolve(tokenToResolve);
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
