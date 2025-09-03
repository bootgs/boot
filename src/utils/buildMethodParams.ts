import {
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  InjectTokenDefinition,
  Newable,
  ParamDefinition,
  ParamSource
} from "types";
import { PARAM_DEFINITIONS_METADATA, PARAMTYPES_METADATA } from "config/constants";
import { getInjectionTokens, resolve } from "utils";
import { isObject } from "appsscript-utils";

/**
 * Creates an array of arguments for invoking a controller method, based on parameter metadata and the provided context.
 *
 * This method inspects the metadata associated with the target method's parameters (e.g., `@Param`, `@Query`, `@Body`, `@Inject`) to populate the arguments array from the `ctx` (context) object.
 *
 * @param   target - The controller instance (the target object).
 * @param   propertyKey - The name of the method to be invoked.
 * @param   ctx - The context object containing event data.
 * @param   ctx.event - The raw Apps Script event object.
 * @param   [ctx.params] - An object containing extracted path parameters (e.g., from a URL like `/users/{id}`).
 * @param   [ctx.query] - An object containing query parameters (e.g., from a URL like `?name=value`).
 * @param   [ctx.body] - The raw request body content, typically a JSON string for POST requests.
 * @param   [ctx.request] - A structured request object derived from the Apps Script event.
 * @param   [ctx.headers] - An object containing request headers.
 * @param   [ctx.response] - A structured response object.
 * @param    controllers
 * @param    providers
 * @returns An array of arguments, ready to be passed into the controller method.
 */
export function buildMethodParams(
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
  },
  controllers: Map<Newable, unknown>,
  providers: Map<Newable, unknown>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const designParamTypes: Newable<any>[] =
    Reflect.getMetadata(PARAMTYPES_METADATA, targetPrototype, propertyKey) ||
    [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          param.key && ctx.body && isObject(ctx.body)
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (ctx.body as Record<string, any>)[param.key]
            : ctx.body;
        break;

      case ParamSource.EVENT:
        args[param.index] = param.key
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (ctx.event as any)[param.key]
          : ctx.event;
        break;

      case ParamSource.REQUEST:
        args[param.index] = param.key
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (ctx.request as any)?.[param.key]
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
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (ctx.response as any)?.[param.key]
          : ctx.response;
        break;

      case ParamSource.INJECT:
        try {
          const tokenToResolve =
            "token" in param ? param.token : designParamTypes[param.index];

          if (tokenToResolve) {
            args[param.index] = resolve(controllers, providers, tokenToResolve);
          } else {
            args[param.index] = undefined;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
          args[param.index] = undefined;
        }
        break;
    }
  }

  return args;
}
