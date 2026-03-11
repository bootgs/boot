import { InjectionToken } from "./InjectionToken";

export interface FactoryProvider<T = unknown> {
  provide: InjectionToken<T>;
  useFactory: (...args: unknown[]) => T;
  inject?: InjectionToken[];
}
