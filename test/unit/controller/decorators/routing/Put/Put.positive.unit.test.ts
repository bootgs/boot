import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { Put, PutMapping } from "src/controller/decorators/routing";
import { RequestMethod } from "src/domain/enums";

describe("@Put / @PutMapping: Positive", () => {
  it("should define METHOD_METADATA and PATH_METADATA with a given path", () => {
    const testPath = "/custom-path";
    class TestClass {
      @Put(testPath)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.PUT);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe(testPath);
  });

  it('should use "/" as the default path if none is provided', () => {
    class TestClass {
      @Put()
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.PUT);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/");
  });

  it("should correctly handle a path with a trailing slash", () => {
    const trailingSlashPath = "/users/";
    class TestClass {
      @Put(trailingSlashPath)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe(trailingSlashPath);
  });

  it("should correctly handle a path without a leading slash", () => {
    const noLeadingSlashPath = "users/profile";
    class TestClass {
      @Put(noLeadingSlashPath)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe(noLeadingSlashPath);
  });

  it("PutMapping should be an alias for Put", () => {
    class TestClass {
      @PutMapping("/alias")
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.PUT);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/alias");
  });
});
