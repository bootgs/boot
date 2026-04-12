import "reflect-metadata";
import { BootApplication, BootApplicationFactory } from "./controller";

export * from "./controller";
export * from "./service";
export * from "./exceptions";
export * from "./domain";
export * from "./shared/utils";

export { BootApplication as App };

export const createApp = BootApplicationFactory.create;
