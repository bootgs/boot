import { INJECT_TOKENS_METADATA } from "../config/constants";
import { InjectTokenDefinition, ParamSource } from "../types";
import { assignInjectMetadata, createParamDecorator } from "../utils";

/**
 * A parameter decorator for injecting values from URL path parameters.
 * This is a generic decorator for path parameters.
 *
 * @param       key - The name of the path parameter to extract (`/users/{id}`).
 * @returns     A parameter decorator.
 * @see         PathVariable
 * @see         Query
 * @see         RequestParam
 * @see         Body
 * @see         RequestBody
 * @see         Request
 * @see         Headers
 * @see         Response
 * @see         Event
 * @see         Inject
 * @environment `Google Apps Script`
 */
export const Param = createParamDecorator(ParamSource.PARAM);

/**
 * A parameter decorator for injecting values from URL query parameters.
 * This is a generic decorator for query parameters.
 *
 * @param       [key] - The name of the query parameter to extract (`?name=value`).
 * @returns     A parameter decorator.
 * @see         Param
 * @see         PathVariable
 * @see         RequestParam
 * @see         Body
 * @see         RequestBody
 * @see         Request
 * @see         Headers
 * @see         Response
 * @see         Event
 * @see         Inject
 * @environment `Google Apps Script`
 */
export const Query = createParamDecorator(ParamSource.QUERY);

/**
 * A parameter decorator for injecting the full request body.
 * It is typically used for HTTP POST/PUT/PATCH requests.
 *
 * @param       [key] - The name of a key to extract a specific value from the request body (e.g., 'name' from JSON: `{ "name": "value" }`).
 * If not specified, the full request body is injected.
 * @see         Param
 * @returns     A parameter decorator.
 * @see         PathVariable
 * @see         Query
 * @see         RequestParam
 * @see         RequestBody
 * @see         Request
 * @see         Headers
 * @see         Response
 * @see         Event
 * @see         Inject
 * @environment `Google Apps Script`
 */
export const Body = createParamDecorator(ParamSource.BODY);

/**
 * A parameter decorator for injecting the request object.
 *
 * @param       [key] - The name of a key to extract a specific value from the request object. If not specified, the entire request object is injected.
 * @returns     A parameter decorator.
 * @see         Param
 * @see         PathVariable
 * @see         Query
 * @see         RequestParam
 * @see         Body
 * @see         RequestBody
 * @see         Headers
 * @see         Response
 * @see         Event
 * @see         Inject
 * @environment `Google Apps Script`
 */
export const Request = createParamDecorator(ParamSource.REQUEST);

/**
 * A parameter decorator for injecting request headers.
 *
 * @param       [key] - The name of a header key to extract a specific value. If not specified, all request headers are injected as an object.
 * @returns     A parameter decorator.
 * @see         Param
 * @see         PathVariable
 * @see         Query
 * @see         RequestParam
 * @see         Body
 * @see         RequestBody
 * @see         Request
 * @see         Headers
 * @see         Response
 * @see         Event
 * @see         Inject
 * @environment `Google Apps Script`
 */
export const Headers = createParamDecorator(ParamSource.HEADERS);

/**
 * A parameter decorator for injecting the response object.
 *
 * It is used to get a reference to the response object to set headers, status codes, or modify the response before it is sent.
 *
 * @returns     A parameter decorator.
 * @see         Param
 * @see         PathVariable
 * @see         Query
 * @see         RequestParam
 * @see         Body
 * @see         RequestBody
 * @see         Request
 * @see         Event
 * @see         Inject
 * @environment `Google Apps Script`
 */
export const Response = createParamDecorator(ParamSource.RESPONSE);

/**
 * A parameter decorator equivalent to {@link Param}.
 */
export const PathVariable = createParamDecorator(ParamSource.PARAM);

/**
 * A parameter decorator equivalent to {@link Query}.
 */
export const RequestParam = createParamDecorator(ParamSource.QUERY);

/**
 * A parameter decorator equivalent to {@link Body}.
 */
export const RequestBody = createParamDecorator(ParamSource.BODY);

/**
 * A parameter decorator used to inject the full Google Apps Script event object.
 *
 * @returns     A parameter decorator.
 * @see         Path
 * @see         PathVariable
 * @see         Query
 * @see         RequestParam
 * @see         Body
 * @see         RequestBody
 * @see         Request
 * @see         Headers
 * @see         Response
 * @see         Inject
 * @environment `Google Apps Script`
 */
export const Event = createParamDecorator(ParamSource.EVENT);

/**
 * A parameter decorator used to explicitly specify an injection token for a dependency.
 *
 * This is useful when a parameter's type cannot be determined by reflection (e.g., when using interfaces), or when you need to inject a specific implementation that is different from the type.
 *
 * @param       [token] - The injection token that the DI container will use to resolve the dependency. This is typically a class constructor (Constructor), but can also be a Symbol, string, or any other unique identifier.
 * @returns     A parameter decorator.
 * @see         Path
 * @see         PathVariable
 * @see         Query
 * @see         RequestParam
 * @see         Body
 * @see         RequestBody
 * @see         Request
 * @see         Headers
 * @see         Response
 * @see         Event
 * @environment `Google Apps Script`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Inject(token?: any): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    const metadataTarget =
      typeof target === "function" ? target : target.constructor;

    const existing: Record<string, InjectTokenDefinition> =
      (propertyKey
        ? Reflect.getMetadata(
            INJECT_TOKENS_METADATA,
            metadataTarget,
            propertyKey
          )
        : Reflect.getMetadata(INJECT_TOKENS_METADATA, metadataTarget)) || {};

    const updatedTokens = assignInjectMetadata(existing, parameterIndex, token);

    if (propertyKey) {
      Reflect.defineMetadata(
        INJECT_TOKENS_METADATA,
        updatedTokens,
        metadataTarget,
        propertyKey
      );
    } else {
      Reflect.defineMetadata(
        INJECT_TOKENS_METADATA,
        updatedTokens,
        metadataTarget
      );
    }
  };
}
