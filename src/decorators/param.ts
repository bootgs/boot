import { INJECT_TOKENS_METADATA, PARAM_DEFINITIONS_METADATA } from "../config/constants";
import { InjectTokenDefinition, ParamDefinition, ParamSource } from "../types";

/**
 * Updates parameter metadata with the argument's position (index).
 * Used by an internal factory function to register parameter decorators.
 *
 * @param   existing - The existing parameter metadata.
 * @param   index - The index of the parameter in the function's argument list.
 * @param   type - The data source type for the parameter.
 * @param   [key] - An optional key to extract a specific value.
 * @returns The updated parameter metadata.
 */
function assignMetadata(
  existing: Record<string, ParamDefinition>,
  index: number,
  type: ParamSource,
  key?: string
): Record<string, ParamDefinition> {
  return {
    ...existing,
    [`${type as string}:${index}`]: { type, key, index }
  };
}

/**
 * Updates or adds metadata for the injection tokens of a specific function parameter (argument) based on its index and token.
 *
 * @param   existing - The existing injection tokens metadata.
 * @param   index - The index of the parameter in the function's argument list.
 * @param   [token] - The injection token for this parameter.
 * @returns The updated injection tokens metadata.
 */
function assignInjectMetadata(
  existing: Record<string, InjectTokenDefinition>,
  index: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token?: any
): Record<string, InjectTokenDefinition> {
  const type = ParamSource.INJECT;

  return {
    ...existing,
    [`${type as string}:${index}`]: { type, token, index }
  };
}

/**
 * Retrieves injection tokens associated with a class constructor or a method prototype.
 *
 * @param       target - The class constructor (for constructor parameters) or the class prototype (for method parameters).
 * @param       [propertyKey] - The optional property key (method name) if tokens are being injected into method parameters.
 * @returns     An object with tokens, where the key is a string "${type}:${index}".
 * @environment `Google Apps Script`
 */
export function getInjectionTokens(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any,
  propertyKey?: string | symbol
): Record<string, InjectTokenDefinition> {
  const metadataTarget =
    typeof target === "function" ? target : target.constructor;

  if (propertyKey) {
    return (
      Reflect.getMetadata(
        INJECT_TOKENS_METADATA,
        metadataTarget,
        propertyKey
      ) || {}
    );
  } else {
    return Reflect.getMetadata(INJECT_TOKENS_METADATA, metadataTarget) || {};
  }
}

/**
 * Creates a parameter decorator with a specified source.
 */
function createDecorator(type: ParamSource) {
  return (key?: string): ParameterDecorator => {
    return (target, propertyKey, parameterIndex) => {
      const metadataTarget = propertyKey ? target : target.constructor;

      const existing: Record<string, ParamDefinition> =
        (propertyKey
          ? Reflect.getMetadata(
              PARAM_DEFINITIONS_METADATA,
              metadataTarget,
              propertyKey
            )
          : Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget)) ||
        {};

      const updated = assignMetadata(existing, parameterIndex, type, key);

      if (propertyKey) {
        Reflect.defineMetadata(
          PARAM_DEFINITIONS_METADATA,
          updated,
          metadataTarget,
          propertyKey
        );
      } else {
        Reflect.defineMetadata(
          PARAM_DEFINITIONS_METADATA,
          updated,
          metadataTarget
        );
      }
    };
  };
}

/**
 * A parameter decorator for injecting values from URL path parameters.
 * This is a generic decorator for path parameters.
 *
 * @param       key - The name of the path parameter to extract (`/users/{id}`).
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
 * @returns     A parameter decorator.
 * @environment `Google Apps Script`
 */
export const Param = createDecorator(ParamSource.PARAM);

/**
 * A parameter decorator for injecting values from URL query parameters.
 * This is a generic decorator for query parameters.
 *
 * @param       [key] - The name of the query parameter to extract (`?name=value`).
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
 * @returns     A parameter decorator.
 * @environment `Google Apps Script`
 */
export const Query = createDecorator(ParamSource.QUERY);

/**
 * A parameter decorator for injecting the full request body.
 * It is typically used for HTTP POST/PUT/PATCH requests.
 *
 * @param       [key] - The name of a key to extract a specific value from the request body (e.g., 'name' from JSON: `{ "name": "value" }`).
 * If not specified, the full request body is injected.
 * @see         Param
 * @see         PathVariable
 * @see         Query
 * @see         RequestParam
 * @see         RequestBody
 * @see         Request
 * @see         Headers
 * @see         Response
 * @see         Event
 * @see         Inject
 * @returns     A parameter decorator.
 * @environment `Google Apps Script`
 */
export const Body = createDecorator(ParamSource.BODY);

/**
 * A parameter decorator for injecting the request object.
 *
 * @param       [key] - The name of a key to extract a specific value from the request object. If not specified, the entire request object is injected.
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
 * @returns     A parameter decorator.
 * @environment `Google Apps Script`
 */
export const Request = createDecorator(ParamSource.REQUEST);

/**
 * A parameter decorator for injecting request headers.
 *
 * @param       [key] - The name of a header key to extract a specific value. If not specified, all request headers are injected as an object.
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
 * @returns     A parameter decorator.
 * @environment `Google Apps Script`
 */
export const Headers = createDecorator(ParamSource.HEADERS);

/**
 * A parameter decorator for injecting the response object.
 *
 * It is used to get a reference to the response object to set headers, status codes, or modify the response before it is sent.
 *
 * @see         Param
 * @see         PathVariable
 * @see         Query
 * @see         RequestParam
 * @see         Body
 * @see         RequestBody
 * @see         Request
 * @see         Event
 * @see         Inject
 * @returns     A parameter decorator.
 * @environment `Google Apps Script`
 */
export const Response = createDecorator(ParamSource.RESPONSE);

/**
 * A parameter decorator equivalent to {@link Param}.
 */
export const PathVariable = createDecorator(ParamSource.PARAM);

/**
 * A parameter decorator equivalent to {@link Query}.
 */
export const RequestParam = createDecorator(ParamSource.QUERY);

/**
 * A parameter decorator equivalent to {@link Body}.
 */
export const RequestBody = createDecorator(ParamSource.BODY);

/**
 * A parameter decorator used to inject the full Google Apps Script event object.
 *
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
 * @returns     A parameter decorator.
 * @environment `Google Apps Script`
 */
export const Event = createDecorator(ParamSource.EVENT);

/**
 * A parameter decorator used to explicitly specify an injection token for a dependency.
 *
 * This is useful when a parameter's type cannot be determined by reflection (e.g., when using interfaces), or when you need to inject a specific implementation that is different from the type.
 *
 * @param       [token] - The injection token that the DI container will use to resolve the dependency. This is typically a class constructor (Constructor), but can also be a Symbol, string, or any other unique identifier.
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
 * @returns     A parameter decorator.
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
