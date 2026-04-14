import { InjectionToken } from "./InjectionToken";

/**
 * Interface representing an existing provider.
 */
export interface ExistingProvider<T = unknown> {

  /**
   * The injection token.
   */
  provide: InjectionToken<T>;

  /**
   * The injection token to be used.
   */
  useExisting: InjectionToken<T>;
}
