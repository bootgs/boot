/**
 * Type representing a class constructor.
 *
 * @template T - The type of the instance created by the constructor.
 */
export type Newable<T = unknown> = new (...args: never[]) => T;
