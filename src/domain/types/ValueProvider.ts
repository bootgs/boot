// SPDX-License-Identifier: Apache-2.0
import { InjectionToken } from "./InjectionToken";

/**
 * Interface representing a value provider.
 */
export interface ValueProvider<T = unknown> {
  /**
   * The injection token.
   */
  provide: InjectionToken<T>;

  /**
   * The value to be used.
   */
  useValue: T;
}
