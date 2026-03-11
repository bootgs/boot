import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { PatchMapping } from "src/controller/decorators/routing";
import { RequestMethod } from "src/domain/enums";

describe("@PatchMapping: Boundary", () => {
  it("should handle multiple decorators (last one wins)", () => {
    class TestClass {
      @PatchMapping("/first")
      @PatchMapping("/second")
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.PATCH);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/first");
  });
});
