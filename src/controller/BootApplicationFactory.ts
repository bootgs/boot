import { ApplicationConfig } from "domain/types";
import { BootApplication } from "controller";

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
