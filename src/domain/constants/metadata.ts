/**
 * Key for marking classes as controllers.
 */
export const CONTROLLER_WATERMARK: string = "__controller__";

/**
 * Key for marking classes as services.
 */
export const SERVICE_WATERMARK: string = "__service__";

/**
 * Key for marking classes as repositories.
 */
export const REPOSITORY_WATERMARK: string = "__repository__";

/**
 * Key for marking classes as entities.
 */
export const ENTITY_WATERMARK: string = "__entity__";

/**
 * Key for marking classes as injectables.
 */
export const INJECTABLE_WATERMARK: string = "__injectable__";

/**
 * Metadata key for storing controller type.
 */
export const CONTROLLER_TYPE_METADATA: string = "controller:type";

/**
 * Metadata key for storing controller options.
 */
export const CONTROLLER_OPTIONS_METADATA: string = "controller:options";

/**
 * Metadata key for storing injection tokens.
 */
export const INJECT_TOKENS_METADATA: string = "custom:inject";

/**
 * Metadata key for storing parameter definitions.
 */
export const PARAM_DEFINITIONS_METADATA: string = "custom:param";

/**
 * Metadata key for storing constructor parameter types (standard for TypeScript).
 */
export const PARAMTYPES_METADATA: string = "design:paramtypes";
