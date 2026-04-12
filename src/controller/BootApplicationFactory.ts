import { ApplicationConfig } from "../domain/types";
import { AsyncBootApplication } from "./AsyncBootApplication";
import { BootApplication } from "./BootApplication";

/**
 * Factory for creating BootApplication instances.
 */
export class BootApplicationFactory {
  /**
   * Creates an instance of BootApplication.
   *
   * @param   {ApplicationConfig} config - The application configuration.
   * @returns {BootApplication} An instance of BootApplication.
   */
  public static create(config: ApplicationConfig): BootApplication {
    return new BootApplication(config);
  }

  /**
   * Creates an instance of AsyncBootApplication.
   *
   * @param   {ApplicationConfig} config - The application configuration.
   * @returns {AsyncBootApplication} An instance of AsyncBootApplication.
   */
  public static createAsync(config: ApplicationConfig): AsyncBootApplication {
    return new AsyncBootApplication(config);
  }
}
