import { ApplicationConfig } from "../domain/types";
import { BootApplication } from "../controller";

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
}
