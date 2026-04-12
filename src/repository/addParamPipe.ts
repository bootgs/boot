import { PARAM_DEFINITIONS_METADATA } from "../domain/constants";
import { ParamDefinition } from "../domain/types";

/**
 * Adds a pipe to a parameter's metadata.
 *
 * @param   {object} target - The target object.
 * @param   {string | symbol | undefined} propertyKey - The property key.
 * @param   {number} index - The parameter index.
 * @param   {any} pipe - The pipe to add.
 */
export function addParamPipe(
  target: object,
  propertyKey: string | symbol | undefined,
  index: number,
  pipe: any
): void {
  const metadataTarget: object = target;

  const existing: Record<string, ParamDefinition> =
    (propertyKey
      ? Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget, propertyKey)
      : Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget)) || {};

  // Find any existing parameter definition for this index
  const keys: string[] = Object.keys(existing).filter((key: string): boolean =>
    key.endsWith(`:${index}`)
  );

  if (keys.length > 0) {
    // Add to all existing definitions for this index
    for (const key of keys) {
      const definition: ParamDefinition = existing[ key ];
      definition.pipes = [...(definition.pipes || []), pipe];
    }
  } else {
    // Create a temporary definition for this index if none exists yet
    // Use a special prefix so it can be picked up by later decorators
    const tempKey: string = `__pending_pipes__:${index}`;
    const definition: ParamDefinition = (existing[ tempKey ] as any) || { index, pipes: [] };
    definition.pipes = [...(definition.pipes || []), pipe];
    existing[ tempKey ] = definition as any;
  }

  if (propertyKey) {
    Reflect.defineMetadata(PARAM_DEFINITIONS_METADATA, existing, metadataTarget, propertyKey);
  } else {
    Reflect.defineMetadata(PARAM_DEFINITIONS_METADATA, existing, metadataTarget);
  }
}
