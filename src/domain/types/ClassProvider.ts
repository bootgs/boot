import { InjectionToken } from "./InjectionToken";
import { Newable } from "./Newable";

/**
 * Interface representing a class provider.
 */
export interface ClassProvider<T = unknown> {

  /**
   * The injection token.
   */
  provide: InjectionToken<T>;

  /**
   * The class to be used.
   */
  useClass: Newable<T>;
}
