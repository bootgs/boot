// SPDX-License-Identifier: Apache-2.0
import { ParamSource } from "../../domain/enums";
import { InjectionToken } from "./InjectionToken";

/**
 * Interface representing an injection token definition.
 */
export interface InjectTokenDefinition {
  /**
   * The source of the parameter (`INJECT` or `VALUE`).
   */
  type: ParamSource.INJECT | ParamSource.VALUE;

  /**
   * The injection token.
   */
  token?: InjectionToken;

  /**
   * The parameter index.
   */
  index: number;
}
