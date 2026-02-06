import { INJECT_TOKENS_METADATA } from "domain/constants";
import { InjectTokenDefinition } from "domain/types";

/**
 * Retrieves injection tokens associated with a class constructor or a method prototype.
 *
 * @param   {object} target - The class constructor or the class prototype.
 * @param   {string | symbol} [propertyKey] - The optional property key (method name).
 * @returns {Record<string, InjectTokenDefinition>} An object with tokens.
 */
export function getInjectionTokens(
  target: object,
  propertyKey?: string | symbol
): Record<string, InjectTokenDefinition> {
  const metadataTarget = target;

  if (propertyKey) {
    return Reflect.getMetadata(INJECT_TOKENS_METADATA, metadataTarget, propertyKey) || {};
  } else {
    return Reflect.getMetadata(INJECT_TOKENS_METADATA, metadataTarget) || {};
  }
}
