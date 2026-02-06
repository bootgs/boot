import { InjectionToken } from "./InjectionToken";
import { Newable } from "./Newable";

export interface ClassProvider<T = unknown> {
  provide: InjectionToken<T>;
  useClass: Newable<T>;
}
