import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { OptionsMapping } from "src/controller/decorators/routing";
import { RequestMethod } from "src/domain/enums";

describe("@OptionsMapping: Boundary", () => {
  it("should handle multiple decorators (last one wins)", () => {
    class TestClass {
      @OptionsMapping("/first")
      @OptionsMapping("/second")
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.OPTIONS);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/first");
  });
});
