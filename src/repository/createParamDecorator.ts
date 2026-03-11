import { PARAM_DEFINITIONS_METADATA } from "../domain/constants";
import { ParamDefinition } from "../domain/types";
import { ParamSource } from "../domain/enums";
import { assignParamMetadata } from "../repository";

/**
 * Creates a parameter decorator with a specified source.
 *
 * @param   {ParamSource} type - The parameter source type.
 * @returns {Function} A function that returns a parameter decorator.
 */
export function createParamDecorator(type: ParamSource) {
  return (key?: string): ParameterDecorator => {
    return (target, propertyKey, parameterIndex) => {
      const metadataTarget = target;

      const existing: Record<string, ParamDefinition> =
        (propertyKey
          ? Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey)
          : Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget)) || {};

      const updated = assignParamMetadata(existing, parameterIndex, type, key);

      if (propertyKey) {
        Reflect.defineMetadata(PARAM_DEFINITIONS_METADATA, updated, metadataTarget, propertyKey);
      } else {
        Reflect.defineMetadata(PARAM_DEFINITIONS_METADATA, updated, metadataTarget);
      }
    };
  };
}
