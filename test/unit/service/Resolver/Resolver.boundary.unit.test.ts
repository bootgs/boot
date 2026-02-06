import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { Resolver } from "src/service";
import { Inject, Injectable } from "src/controller/decorators";

import { InjectionToken } from "src/domain/types";

describe("Resolver: Boundary", () => {
  it("should handle circular dependencies (currently not supported by simple Resolver, might throw StackOverflow or error)", () => {
    // Note: Simple Resolver usually fails on circular dependencies.
    // Testing how it behaves.
    @Injectable()
    class _ServiceA {
      constructor(@Inject("ServiceB") public _b: unknown) {}
    }
    @Injectable()
    class _ServiceB {
      constructor(@Inject("ServiceA") public _a: unknown) {}
    }

    const providers = new Map<InjectionToken, unknown>();
    providers.set("ServiceA", null);
    providers.set("ServiceB", null);
    const resolver = new Resolver(new Map(), providers);

    expect(() => resolver.resolve("ServiceA")).toThrow();
  });
});
