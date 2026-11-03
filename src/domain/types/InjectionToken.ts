// SPDX-License-Identifier: Apache-2.0
import { Newable } from "./Newable";

/**
 * Represents an injection token.
 */
export type InjectionToken<T = unknown> = string | symbol | Newable<T>;
