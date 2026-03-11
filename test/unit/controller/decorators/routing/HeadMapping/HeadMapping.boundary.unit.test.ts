import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { HeadMapping } from "src/controller/decorators/routing";
import { RequestMethod } from "src/domain/enums";

describe("@HeadMapping: Boundary", () => {
  it("should handle multiple decorators (last one wins)", () => {
    class TestClass {
      @HeadMapping("/first")
      @HeadMapping("/second")
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.HEAD);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/first");
  });
});
