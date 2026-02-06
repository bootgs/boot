import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { BootApplicationFactory } from "src/controller";
import { Resolver } from "src/service";
import { HttpController, Inject, Injectable } from "src/controller/decorators";

@Injectable()
class UnregisteredService {}

@HttpController()
class FaultyController {
  constructor(@Inject(UnregisteredService) public service: UnregisteredService) {}
}

describe("Inject Decorator: Negative", () => {
  it("should throw error when injecting an unregistered provider", () => {
    const app = BootApplicationFactory.create({
      controllers: [ FaultyController ],
      providers: []
    });

    expect(() =>
      (app as unknown as { _resolver: Resolver })._resolver.resolve(FaultyController)
    ).toThrow(/'UnregisteredService' is not registered/);
  });
});
