import { ParamSource } from "../domain/enums";
import { InjectionToken, InjectTokenDefinition } from "../domain/types";

/**
 * Updates or adds metadata for the injection tokens of a specific function parameter (argument) based on its index and token.
 *
 * @param   existing - The existing injection tokens metadata.
 * @param   index - The index of the parameter in the function's argument list.
 * @param   [token] - The injection token for this parameter.
 * @returns The updated injection tokens metadata.
 */
export function assignInjectMetadata(
  existing: Record<string, InjectTokenDefinition>,
  index: number,
  token?: InjectionToken
): Record<string, InjectTokenDefinition> {
  const type = ParamSource.INJECT;

  return {
    ...existing,
    [`${type as string}:${index}`]: { type, token, index }
  };
}
