import { Newable } from "./Newable";
import { RequestMethod } from "../../domain/enums";

/**
 * Interface representing metadata for a route.
 */
export interface RouteMetadata {
  /**
   * The controller class.
   */
  controller: Newable;

  /**
   * The name of the handler method.
   */
  handler: string | symbol;

  /**
   * The HTTP request method.
   */
  method: RequestMethod;

  /**
   * The route path.
   */
  path: string;
}
