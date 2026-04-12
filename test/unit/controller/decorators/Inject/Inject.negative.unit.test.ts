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

describe("Inject Decorator: Auto-resolution", () => {
  it("should resolve unregistered provider when injected as a class", () => {
    const app = BootApplicationFactory.create({
      controllers: [FaultyController],
      providers: []
    });

    const instance = (app as unknown as { _resolver: Resolver })._resolver.resolve(
      FaultyController
    );
    expect(instance.service).toBeInstanceOf(UnregisteredService);
  });
});
