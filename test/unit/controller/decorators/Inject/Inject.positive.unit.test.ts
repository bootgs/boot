import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { BootApplicationFactory } from "src/controller";
import { Resolver } from "src/service";
import { Get } from "src/controller/decorators/routing";
import { HttpController, Inject, Injectable } from "src/controller/decorators";

@Injectable()
class ServiceA {
  getValue() {
    return "A";
  }
}

@Injectable()
class ServiceB {
  getValue() {
    return "B";
  }
}

@HttpController()
class TestController {
  constructor(
    @Inject(ServiceA) public serviceA: ServiceA,
    @Inject(ServiceB) public serviceB: ServiceB
  ) {}

  @Get("/test")
  test() {
    return this.serviceA.getValue() + this.serviceB.getValue();
  }
}

describe("Inject Decorator: Positive", () => {
  it("should correctly inject dependencies using constructor and @Inject", () => {
    const app = BootApplicationFactory.create({
      controllers: [ TestController ],
      providers: [ ServiceA, ServiceB ]
    });

    const instance = (app as unknown as { _resolver: Resolver })._resolver.resolve(TestController);
    expect(instance.serviceA).toBeInstanceOf(ServiceA);
    expect(instance.serviceB).toBeInstanceOf(ServiceB);
    expect(instance.test()).toBe("AB");
  });
});
