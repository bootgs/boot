import "reflect-metadata";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Resolver } from "src/service";
import { PARAMTYPES_METADATA } from "src/domain/constants";

describe("Resolver: Extra", () => {
  let resolver: Resolver;

  beforeEach(() => {
    resolver = new Resolver(new Map(), new Map());
  });

  it("should throw error for invalid injection token (not a function)", () => {
    class Target {
      constructor(_dep: unknown) {}
    }
    // Simulate invalid metadata
    Reflect.defineMetadata(PARAMTYPES_METADATA, [ undefined ], Target);

    // We need to make sure target.length is at least 1, or use explicit inject
    expect(() => resolver.resolve(Target)).toThrow(
      "[Resolve ERROR]: Dependency at index 0 of 'Target' cannot be resolved (no token)."
    );

    Reflect.defineMetadata(PARAMTYPES_METADATA, [ "not-a-function" ], Target);
    expect(() => resolver.resolve(Target)).toThrow("Invalid injection token");
  });

  it("should warn when resolving a class that is neither a controller nor injectable", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    class RawClass {}

    const instance = resolver.resolve(RawClass);

    expect(instance).toBeInstanceOf(RawClass);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("'RawClass' is not registered as a provider or controller")
    );
    warnSpy.mockRestore();
  });
});
