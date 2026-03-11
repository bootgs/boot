import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { Get, GetMapping } from "src/controller/decorators/routing";
import { RequestMethod } from "src/domain/enums";

describe("@Get / @GetMapping: Positive", () => {
  it("should define METHOD_METADATA and PATH_METADATA with a given path", () => {
    const testPath = "/custom-path";
    class TestClass {
      @Get(testPath)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.GET);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe(testPath);
  });

  it('should use "/" as the default path if none is provided', () => {
    class TestClass {
      @Get()
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.GET);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/");
  });

  it("should correctly handle a path with a trailing slash", () => {
    const trailingSlashPath = "/users/";
    class TestClass {
      @Get(trailingSlashPath)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe(trailingSlashPath);
  });

  it("should correctly handle a path without a leading slash", () => {
    const noLeadingSlashPath = "users/profile";
    class TestClass {
      @Get(noLeadingSlashPath)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe(noLeadingSlashPath);
  });

  it("GetMapping should be an alias for Get", () => {
    class TestClass {
      @GetMapping("/alias")
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.GET);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/alias");
  });
});
