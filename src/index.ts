import "reflect-metadata";
import { AsyncBootApplication, BootApplication, BootApplicationFactory } from "./controller";

export * from "./controller";
export * from "./service";
export * from "./exceptions";
export * from "./domain";
export * from "./shared/utils";

export { BootApplication as App };

export { AsyncBootApplication as AsyncApp };

export const createApp = BootApplicationFactory.create;

export const createAsyncApp = BootApplicationFactory.createAsync;
