import "reflect-metadata";

/**
 * Repository for managing metadata across the framework.
 */
export class MetadataRepository {
  /**
   * Retrieves metadata for a given key from a target object.
   *
   * @param   {unknown} metadataKey - The metadata key.
   * @param   {object} target - The target object.
   * @param   {string | symbol} [propertyKey] - The optional property key.
   * @returns {T | undefined} The metadata value.
   */
  public getMetadata<T = unknown>(
    metadataKey: unknown,
    target: object,
    propertyKey?: string | symbol
  ): T | undefined {
    return propertyKey
      ? Reflect.getMetadata(metadataKey, target, propertyKey)
      : Reflect.getMetadata(metadataKey, target);
  }

  /**
   * Defines metadata for a given key on a target object.
   *
   * @param   {unknown} metadataKey - The metadata key.
   * @param   {unknown} metadataValue - The metadata value.
   * @param   {object} target - The target object.
   * @param   {string | symbol} [propertyKey] - The optional property key.
   * @returns {void}
   */
  public defineMetadata(
    metadataKey: unknown,
    metadataValue: unknown,
    target: object,
    propertyKey?: string | symbol
  ): void {
    if (propertyKey) {
      Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    } else {
      Reflect.defineMetadata(metadataKey, metadataValue, target);
    }
  }

  /**
   * Checks if metadata for a given key exists on a target object.
   *
   * @param   {unknown} metadataKey - The metadata key.
   * @param   {object} target - The target object.
   * @param   {string | symbol} [propertyKey] - The optional property key.
   * @returns {boolean} True if metadata exists, false otherwise.
   */
  public hasMetadata(metadataKey: unknown, target: object, propertyKey?: string | symbol): boolean {
    return propertyKey
      ? Reflect.hasMetadata(metadataKey, target, propertyKey)
      : Reflect.hasMetadata(metadataKey, target);
  }

  /**
   * Retrieves all own metadata keys from a target object.
   *
   * @param   {object} target - The target object.
   * @param   {string | symbol} [propertyKey] - The optional property key.
   * @returns {unknown[]} An array of metadata keys.
   */
  public getOwnMetadataKeys(target: object, propertyKey?: string | symbol): unknown[] {
    return propertyKey
      ? Reflect.getOwnMetadataKeys(target, propertyKey)
      : Reflect.getOwnMetadataKeys(target);
  }
}
