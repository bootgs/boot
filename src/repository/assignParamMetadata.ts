import { ParamDefinition } from "../domain/types";
import { ParamSource } from "../domain/enums";

/**
 * Updates parameter metadata with the argument's position (index).
 *
 * @param   {Record<string, ParamDefinition>} existing - The existing parameter metadata.
 * @param   {number} index - The index of the parameter in the function's argument list.
 * @param   {ParamSource} type - The data source type for the parameter.
 * @param   {string} key - An optional key to extract a specific value.
 * @returns {Record<string, ParamDefinition>} The updated parameter metadata.
 */
export function assignParamMetadata(
  existing: Record<string, ParamDefinition>,
  index: number,
  type: ParamSource,
  key?: string
): Record<string, ParamDefinition> {
  return {
    ...existing,
    [ `${type}:${index}` ]: { type, key, index }
  };
}
