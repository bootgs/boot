import { isObject } from "apps-script-utils";
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

export class Router {
  private readonly pathMatcher = new PathMatcher();

  constructor(
    private readonly _resolver: Resolver,
    private readonly _routes: RouteMetadata[]
  ) {}

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

    const args = this.buildMethodParams(controllerInstance as object, route.handler, ctx);

    try {
      const handler = (controllerInstance as Record<string | symbol, unknown>)[route.handler] as (
        ...args: unknown[]
      ) => unknown;
      const result = await handler.apply(controllerInstance, args);

      if (isObject(result) && "status" in result && "body" in result) {
        return result as HttpResponse;
      }

      return responseBuilder(request, ctx.response?.status, ctx.response?.headers, result);
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status || 500;
      const message = (err as { message?: string })?.message || String(err);
      return responseBuilder(request, status, {}, message);
    }
  }

  private buildMethodParams(
    target: object,
    propertyKey: string | symbol,
    ctx: RouteExecutionContext
  ): unknown[] {
    const targetPrototype = Object.getPrototypeOf(target);

    const rawMetadata: Record<string, ParamDefinition> =
      (Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, targetPrototype, propertyKey) as Record<
        string,
        ParamDefinition
      >) || {};

    const rawInjectMetadata: Record<string, InjectTokenDefinition> = getInjectionTokens(
      targetPrototype,
      propertyKey
    );

    const metadata: (ParamDefinition | InjectTokenDefinition)[] = (
      Object.values(rawMetadata) as (ParamDefinition | InjectTokenDefinition)[]
    ).concat(Object.values(rawInjectMetadata) as (ParamDefinition | InjectTokenDefinition)[]);

    metadata.sort((a, b) => a.index - b.index);

    const designParamTypes: Newable[] =
      (Reflect.getMetadata(PARAMTYPES_METADATA, targetPrototype, propertyKey) as Newable[]) || [];

    const args: unknown[] = [];

    for (const param of metadata) {
      switch (param.type) {
        case ParamSource.PARAM:
          args[param.index] = param.key ? (ctx.params ?? {})[param.key] : ctx.params;
          break;

        case ParamSource.QUERY:
          args[param.index] = param.key ? (ctx.query ?? {})[param.key] : ctx.query;
          break;

        case ParamSource.BODY:
          args[param.index] =
            param.key && ctx.body && isObject(ctx.body)
              ? (ctx.body as unknown as Record<string, unknown>)[param.key]
              : ctx.body;
          break;

        case ParamSource.EVENT:
          args[param.index] =
            param.key && isObject(ctx.event)
              ? (ctx.event as unknown as Record<string, unknown>)[param.key]
              : ctx.event;
          break;

        case ParamSource.REQUEST:
          args[param.index] =
            param.key && isObject(ctx.request)
              ? (ctx.request as unknown as Record<string, unknown>)[param.key]
              : ctx.request;
          break;

        case ParamSource.HEADERS:
          if (param.key && ctx.headers) {
            const headerKey = Object.keys(ctx.headers).find(
              (k) => k.toLowerCase() === param.key!.toLowerCase()
            );
            args[param.index] = headerKey ? ctx.headers[headerKey] : undefined;
          } else {
            args[param.index] = ctx.headers;
          }
          break;

        case ParamSource.RESPONSE:
          args[param.index] =
            param.key && isObject(ctx.response)
              ? (ctx.response as unknown as Record<string, unknown>)[param.key]
              : ctx.response;
          break;

        case ParamSource.INJECT:
          try {
            const tokenToResolve = "token" in param ? param.token : designParamTypes[param.index];

            if (tokenToResolve) {
              args[param.index] = this._resolver.resolve(tokenToResolve);
            } else {
              args[param.index] = undefined;
            }
          } catch {
            args[param.index] = undefined;
          }
          break;
      }
    }

    return args;
  }
}
