import { Newable } from "./Newable";
import { RequestMethod } from "domain/enums";

export interface RouteMetadata {
  controller: Newable;
  handler: string | symbol;
  method: RequestMethod;
  path: string;
}
