import { ParamSource } from "../../domain/enums";
import { InjectionToken } from "./InjectionToken";

export interface InjectTokenDefinition {
  type: ParamSource.INJECT;
  token?: InjectionToken;
  index: number;
}
