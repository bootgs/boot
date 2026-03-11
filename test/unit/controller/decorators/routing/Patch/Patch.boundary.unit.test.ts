import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PATH_METADATA } from "src/domain/constants";
import { Patch } from "src/controller/decorators/routing";

describe("@Patch: Boundary", () => {
  it('should handle undefined path by defaulting to "/"', () => {
    class TestClass {
      @Patch(undefined)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/");
  });

  it('should correctly handle an empty string as path by defaulting to "/"', () => {
    class TestClass {
      @Patch("")
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/");
  });
});
