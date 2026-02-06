import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { PATH_METADATA } from "src/domain/constants";
import { Put } from "src/controller/decorators/routing";

describe("@Put: Boundary", () => {
  it('should handle undefined path by defaulting to "/"', () => {
    class TestClass {
      @Put(undefined)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/");
  });

  it('should correctly handle an empty string as path by defaulting to "/"', () => {
    class TestClass {
      @Put("")
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/");
  });
});
