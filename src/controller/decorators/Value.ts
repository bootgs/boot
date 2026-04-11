import { INJECT_TOKENS_METADATA, PARAM_DEFINITIONS_METADATA } from "../../domain/constants";
import { ParamSource } from "../../domain/enums";
import { InjectTokenDefinition, ParamDefinition } from "../../domain/types";
import { assignParamMetadata } from "../../repository";

/**
 * Decorator that injects a configuration value.
 *
 * @param   {string} key - The configuration key (e.g., "app.name").
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```typescript
 * class MyService {
 *   constructor(@Value('app.name') private readonly appName: string) {}
 * }
 * ```
 */
export function Value(key: string): ParameterDecorator {
  return (
    target: object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ): void => {
    const metadataTarget: object = target;

    if (propertyKey) {
      // Method parameter decorator
      const existing: Record<string, ParamDefinition> =
        Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey) || {};

      const updated: Record<string, ParamDefinition> = assignParamMetadata(
        existing,
        parameterIndex,
        ParamSource.VALUE,
        key
      );

      Reflect.defineMetadata(PARAM_DEFINITIONS_METADATA, updated, metadataTarget, propertyKey);
    } else {
      // Constructor parameter decorator
      const existing: Record<string, InjectTokenDefinition> =
        Reflect.getMetadata(INJECT_TOKENS_METADATA, metadataTarget) || {};

      // We use assignInjectMetadata but we need to specify it's a VALUE type
      // Actually, assignInjectMetadata currently only sets ParamSource.INJECT.
      // I should probably update it or manually set the metadata.

      const updatedTokens: Record<string, InjectTokenDefinition> = {
        ...existing,
        [ `${ParamSource.INJECT}:${parameterIndex}` ]: {
          type: ParamSource.VALUE,
          token: key,
          index: parameterIndex
        } as any
      };

      Reflect.defineMetadata(INJECT_TOKENS_METADATA, updatedTokens, metadataTarget);
    }
  };
}
