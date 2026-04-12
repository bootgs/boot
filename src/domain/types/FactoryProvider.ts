import { InjectionToken } from "./InjectionToken";

/**
 * Interface representing a factory provider.
 */
export interface FactoryProvider<T = unknown> {
  /**
   * The injection token.
   */
  provide: InjectionToken<T>;

  /**
   * The factory function to create the instance.
   */
  useFactory: (...args: unknown[]) => T;

  /**
   * Optional tokens to inject into the factory function.
   */
  inject?: InjectionToken[];
}
