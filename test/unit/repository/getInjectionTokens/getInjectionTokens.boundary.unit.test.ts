import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { getInjectionTokens } from "src/repository";

describe("getInjectionTokens: boundary", () => {
  it("should return an empty object if no metadata is present on class", () => {
    class Test {}
    const result = getInjectionTokens(Test);
    expect(result).toEqual({});
  });

  it("should return an empty object if no metadata is present on method", () => {
    class Test {
      method() {}
    }
    const result = getInjectionTokens(Test.prototype, "method");
    expect(result).toEqual({});
  });
});
