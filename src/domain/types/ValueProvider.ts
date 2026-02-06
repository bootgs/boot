import { InjectionToken } from "./InjectionToken";

export interface ValueProvider<T = unknown> {
  provide: InjectionToken<T>;
  useValue: T;
}
