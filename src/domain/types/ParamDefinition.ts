import { ParamSource } from "../../domain/enums";

export interface ParamDefinition {
  type: ParamSource;
  key?: string;
  index: number;
}
