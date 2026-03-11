import { Newable } from "./Newable";

/**
 * Represents an injection token.
 */
export type InjectionToken<T = unknown> = string | symbol | Newable<T>;
