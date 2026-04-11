import { ParamSource } from "../../domain/enums";
import { InjectionToken } from "./InjectionToken";

/**
 * Interface representing an injection token definition.
 */
export interface InjectTokenDefinition {

  /**
   * The source of the parameter (always `INJECT`).
   */
  type: ParamSource.INJECT;

  /**
   * The injection token.
   */
  token?: InjectionToken;

  /**
   * The parameter index.
   */
  index: number;
}
