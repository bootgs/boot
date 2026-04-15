import { ApplicationProperties } from "./ApplicationProperties";
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
   * @default "/api"
   */
  apiPrefix?: string | null;

  /**
   * Application configuration properties.
   */
  config?: ApplicationProperties;
}
