import { ParamSource } from "./ParamSource";

/**
 *
 */
export interface InjectTokenDefinition {
  type: ParamSource.INJECT;
  index: number;
  token: any;
}
