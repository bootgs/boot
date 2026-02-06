import { ENTITY_WATERMARK } from "domain/constants";

/**
 * Decorator that marks a class as an entity.
 *
 * @returns {ClassDecorator} A class decorator.
 */
export function Entity(): ClassDecorator {
  return (target: object) => {
    // In a GAS context, this might be used to map classes to Spreadsheet ranges or other storage.
    // For now, it serves as a semantic marker.
    Reflect.defineMetadata(ENTITY_WATERMARK, true, target);
  };
}
