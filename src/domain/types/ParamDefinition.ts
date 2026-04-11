import { ParamSource } from "../../domain/enums";

/**
 * Interface representing a parameter definition.
 */
export interface ParamDefinition {

  /**
   * The source of the parameter.
   */
  type: ParamSource;

  /**
   * Optional key for the parameter (e.g., parameter name).
   */
  key?: string;

  /**
   * The parameter index in the method signature.
   */
  index: number;
}
