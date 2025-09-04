import { ParamDefinition, ParamSource } from "../types";

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
export function assignMetadata(
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
