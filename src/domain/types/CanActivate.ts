import { RouteExecutionContext } from "../entities";

/**
 * Interface representing an execution context.
 */
export interface ExecutionContext extends RouteExecutionContext {

  /**
   * Returns the controller class.
   */
  getClass<T = any>(): T;

  /**
   * Returns the handler function.
   */
  getHandler(): Function;
}

/**
 * Interface representing a guard that can activate a route.
 */
export interface CanActivate {

  /**
   * Determines whether the route can be activated.
   *
   * @param {ExecutionContext} context The execution context.
   * @returns {boolean | Promise<boolean>} Whether the route can be activated.
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
