import { ParamDefinition } from "../domain/types";
import { ParamSource } from "../domain/enums";

/**
 * Updates parameter metadata with the argument's position (index).
 *
 * @param   {Record<string, ParamDefinition>} existing - The existing parameter metadata.
 * @param   {number} index - The index of the parameter in the function's argument list.
 * @param   {ParamSource} type - The data source type for the parameter.
 * @param   {string} key - An optional key to extract a specific value.
 * @param   {any[]} pipes - Optional pipes for the parameter.
 * @returns {Record<string, ParamDefinition>} The updated parameter metadata.
 */
export function assignParamMetadata(
  existing: Record<string, ParamDefinition>,
  index: number,
  type: ParamSource,
  key?: string,
  pipes?: any[]
): Record<string, ParamDefinition> {
  const pendingKey: string = `__pending_pipes__:${index}`;
  const pending: ParamDefinition | undefined = existing[pendingKey];
  const updatedPipes: any[] = [...(pending?.pipes || []), ...(pipes || [])];

  const definition: ParamDefinition = { type, key, index };

  if (updatedPipes.length > 0) {
    definition.pipes = updatedPipes;
  }

  const result: Record<string, ParamDefinition> = {
    ...existing,
    [`${type}:${index}`]: definition
  };

  if (pending) {
    delete result[pendingKey];
  }

  return result;
}
