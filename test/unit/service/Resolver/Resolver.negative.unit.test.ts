import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { Resolver } from "src/service";
import { Inject, Injectable } from "src/controller/decorators";
import { InjectionToken } from "src/domain/types";

describe("Resolver: Negative", () => {
  it("should throw error if dependency is not registered", () => {
    class UnregisteredService {}
    @Injectable()
    class MainService {
      constructor(@Inject(UnregisteredService) public dep: UnregisteredService) {}
    }

    const providers = new Map<InjectionToken, unknown>();
    providers.set(MainService, null);
    const resolver = new Resolver(new Map(), providers);

    expect(() => resolver.resolve(MainService)).toThrow(/is not registered/);
  });

  it("should throw error if dependency token is missing (e.g. interface without @Inject)", () => {
    @Injectable()
    class MainService {
      constructor(public _dep: unknown) {} // No type, no @Inject
    }

    const providers = new Map<InjectionToken, unknown>();
    providers.set(MainService, null);
    const resolver = new Resolver(new Map(), providers);

    expect(() => resolver.resolve(MainService)).toThrow(/cannot be resolved \(no token\)/);
  });
});
