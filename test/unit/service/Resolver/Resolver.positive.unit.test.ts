import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { Resolver } from "src/service";
import { Inject, Injectable } from "src/controller/decorators";
import { InjectionToken } from "src/domain/types";

describe("Resolver: Positive", () => {
  it("should resolve a simple class without dependencies", () => {
    @Injectable()
    class SimpleService {}

    const providers = new Map<InjectionToken, unknown>();
    providers.set(SimpleService, null);
    const resolver = new Resolver(new Map(), providers);

    const instance = resolver.resolve(SimpleService);
    expect(instance).toBeInstanceOf(SimpleService);
  });

  it("should resolve a class with dependencies", () => {
    @Injectable()
    class DepService {}

    @Injectable()
    class MainService {
      constructor(@Inject(DepService) public dep: DepService) {}
    }

    const providers = new Map<InjectionToken, unknown>();
    providers.set(DepService, null);
    providers.set(MainService, null);
    const resolver = new Resolver(new Map(), providers);

    const instance = resolver.resolve(MainService);
    expect(instance).toBeInstanceOf(MainService);
    expect(instance.dep).toBeInstanceOf(DepService);
  });

  it("should resolve a singleton (return same instance)", () => {
    @Injectable()
    class SingletonService {}

    const providers = new Map<InjectionToken, unknown>();
    providers.set(SingletonService, null);
    const resolver = new Resolver(new Map(), providers);

    const instance1 = resolver.resolve(SingletonService);
    const instance2 = resolver.resolve(SingletonService);
    expect(instance1).toBe(instance2);
  });
});
