import "reflect-metadata";
import { BootApplication, BootApplicationFactory } from "./controller";

export * from "./controller";
export * from "./utils";
export * from "./domain/types";
export * from "./domain/enums";

export { BootApplication as App };
export const createApp = BootApplicationFactory.create;
