import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { isInjectable } from "src/shared/utils";
import { Injectable, Repository, Service } from "src/controller/decorators";

describe("isInjectable: Positive", () => {
  it("should return true for @Injectable", () => {
    @Injectable()
    class TestClass {}
    expect(isInjectable(TestClass)).toBe(true);
  });

  it("should return true for @Service", () => {
    @Service()
    class TestClass {}
    expect(isInjectable(TestClass)).toBe(true);
  });

  it("should return true for @Repository", () => {
    @Repository()
    class TestClass {}
    expect(isInjectable(TestClass)).toBe(true);
  });
});
