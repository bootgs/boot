import { ParamSource } from "./ParamSource";

/**
 *
 */
export interface InjectTokenDefinition {
  type: ParamSource.INJECT;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any;
}
