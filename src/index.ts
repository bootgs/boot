import { BootApplication, BootApplicationFactory } from "controller";

export * from "controller";

export { BootApplication as App };
export const createApp = BootApplicationFactory.create;
