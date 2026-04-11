import { Newable } from "./Newable";
import { Provider } from "./Provider";

/**
 * Interface representing application configuration.
 */
export interface ApplicationConfig {

  /**
   * List of controller classes.
   */
  controllers?: Newable[];

  /**
   * List of provider definitions.
   */
  providers?: Provider[];

  /**
   * The prefix for API routes.
   *
   * @default "/api/"
   */
  apiPrefix?: string;

  /**
   * Application configuration properties.
   */
  config?: Record<string, any>;
}
