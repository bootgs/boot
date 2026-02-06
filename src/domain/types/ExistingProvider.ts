import { InjectionToken } from "./InjectionToken";

export interface ExistingProvider<T = unknown> {
  provide: InjectionToken<T>;
  useExisting: InjectionToken<T>;
}
