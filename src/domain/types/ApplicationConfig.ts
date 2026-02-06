import { Newable } from "./Newable";
import { Provider } from "./Provider";

export interface ApplicationConfig {
  controllers?: Newable[];
  providers?: Provider[];
}
