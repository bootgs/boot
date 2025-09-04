import { InjectTokenDefinition } from "../types";
import { INJECT_TOKENS_METADATA } from "../config/constants";

/**
 * Retrieves injection tokens associated with a class constructor or a method prototype.
 *
 * @param       target - The class constructor (for constructor parameters) or the class prototype (for method parameters).
 * @param       [propertyKey] - The optional property key (method name) if tokens are being injected into method parameters.
 * @returns     An object with tokens, where the key is a string "${type}:${index}".
 * @environment `Google Apps Script`
 */
export function getInjectionTokens(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any,
  propertyKey?: string | symbol
): Record<string, InjectTokenDefinition> {
  const metadataTarget =
    typeof target === "function" ? target : target.constructor;

  if (propertyKey) {
    return (
      Reflect.getMetadata(
        INJECT_TOKENS_METADATA,
        metadataTarget,
        propertyKey
      ) || {}
    );
  } else {
    return Reflect.getMetadata(INJECT_TOKENS_METADATA, metadataTarget) || {};
  }
}
