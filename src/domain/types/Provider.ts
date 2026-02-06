import { ClassProvider } from "./ClassProvider";
import { ExistingProvider } from "./ExistingProvider";
import { FactoryProvider } from "./FactoryProvider";
import { Newable } from "./Newable";
import { ValueProvider } from "./ValueProvider";

export type Provider<T = unknown> =
  | Newable<T>
  | ValueProvider<T>
  | ClassProvider<T>
  | FactoryProvider<T>
  | ExistingProvider<T>;
