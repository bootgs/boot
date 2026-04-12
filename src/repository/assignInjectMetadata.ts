import { ParamSource } from "../domain/enums";
import { InjectionToken, InjectTokenDefinition } from "../domain/types";

/**
 * Updates or adds metadata for the injection tokens of a specific function parameter (argument) based on its index and token.
 *
 * @param   {Record<string, InjectTokenDefinition>} existing - The existing injection tokens metadata.
 * @param   {number} index - The index of the parameter in the function's argument list.
 * @param   {InjectionToken} [token] - The injection token for this parameter.
 * @returns {Record<string, InjectTokenDefinition>} The updated injection tokens metadata.
 */
export function assignInjectMetadata(
  existing: Record<string, InjectTokenDefinition>,
  index: number,
  token?: InjectionToken
): Record<string, InjectTokenDefinition> {
  const type = ParamSource.INJECT;

  return {
    ...existing,
    [`${type}:${index}`]: { type, token, index }
  };
}
