import { INJECT_TOKENS_METADATA } from "../../domain/constants";
import { InjectTokenDefinition, Newable } from "../../domain/types";
import { assignInjectMetadata } from "../../repository";

/**
 * A parameter decorator used to explicitly specify an injection token for a dependency.
 *
 * @param   {Newable | string | symbol} [token] - The injection token that the DI container will use to resolve the dependency.
 * @returns {ParameterDecorator} A parameter decorator.
 *
 * @example
 * ```typescript
 * class MyService {
 *   constructor(@Inject('MyProvider') private readonly provider: any) {}
 * }
 * ```
 */
export function Inject(token?: Newable | string | symbol): ParameterDecorator {
  return (
    target: object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ): void => {
    const metadataTarget: object = target;

    const existing: Record<string, InjectTokenDefinition> =
      (propertyKey
        ? Reflect.getMetadata(INJECT_TOKENS_METADATA, metadataTarget, propertyKey)
        : Reflect.getMetadata(INJECT_TOKENS_METADATA, metadataTarget)) || {};

    const updatedTokens: Record<string, InjectTokenDefinition> = assignInjectMetadata(
      existing,
      parameterIndex,
      token
    );

    if (propertyKey) {
      Reflect.defineMetadata(INJECT_TOKENS_METADATA, updatedTokens, metadataTarget, propertyKey);
    } else {
      Reflect.defineMetadata(INJECT_TOKENS_METADATA, updatedTokens, metadataTarget);
    }
  };
}
