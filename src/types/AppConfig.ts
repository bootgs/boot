import { Newable } from "./Newable";
import { Provider } from "./Provider";

export interface AppConfig {
  controllers?: Newable[];
  providers?: Provider[];
}
