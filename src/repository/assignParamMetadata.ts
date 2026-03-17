import { ParamDefinition } from "../domain/types";
import { ParamSource } from "../domain/enums";

/**
 * Updates parameter metadata with the argument's position (index).
 *
 * @param   existing - The existing parameter metadata.
 * @param   index - The index of the parameter in the function's argument list.
 * @param   type - The data source type for the parameter.
 * @param   key - An optional key to extract a specific value.
 * @returns The updated parameter metadata.
 */
export function assignParamMetadata(
  existing: Record<string, ParamDefinition>,
  index: number,
  type: ParamSource,
  key?: string
): Record<string, ParamDefinition> {
  return {
    ...existing,
    [ `${type as string}:${index}` ]: { type, key, index }
  };
}
