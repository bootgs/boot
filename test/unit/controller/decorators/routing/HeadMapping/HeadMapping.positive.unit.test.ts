import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { HeadMapping } from "src/controller/decorators/routing";
import { RequestMethod } from "src/domain/enums";

describe("@HeadMapping: Positive", () => {
  it("should define METHOD_METADATA and PATH_METADATA with a given path", () => {
    const testPath = "/custom-path";
    class TestClass {
      @HeadMapping(testPath)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.HEAD);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe(testPath);
  });

  it('should use "/" as the default path if none is provided', () => {
    class TestClass {
      @HeadMapping()
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.HEAD);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/");
  });
});
