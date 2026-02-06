import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { DeleteMapping } from "src/controller/decorators/routing";
import { RequestMethod } from "src/domain/enums";

describe("@DeleteMapping: Boundary", () => {
  it("should handle multiple decorators (last one wins)", () => {
    class TestClass {
      @DeleteMapping("/first")
      @DeleteMapping("/second")
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.DELETE);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/first");
  });
});
