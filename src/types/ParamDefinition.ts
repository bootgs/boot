import { ParamSource } from "./ParamSource";

export interface ParamDefinition {
  type: ParamSource;
  index: number;
  key: string | null | undefined;
}
