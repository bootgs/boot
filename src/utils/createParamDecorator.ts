import { ParamDefinition, ParamSource } from "types";
import { PARAM_DEFINITIONS_METADATA } from "config/constants";
import { assignMetadata } from "utils";

/**
 * Creates a parameter decorator with a specified source.
 */
export function createParamDecorator(type: ParamSource) {
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
