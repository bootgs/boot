import { Newable } from "./Newable";
import { RequestMethod } from "./RequestMethod";

export interface RouteMetadata {
  method: RequestMethod;
  path: string;
  handler: string | symbol;
  controller: Newable;
}
