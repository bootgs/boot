import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { Delete, DeleteMapping } from "src/controller/decorators/routing";
import { RequestMethod } from "src/domain/enums";

describe("@Delete / @DeleteMapping: Positive", () => {
  it("should define METHOD_METADATA and PATH_METADATA with a given path", () => {
    const testPath = "/custom-path";
    class TestClass {
      @Delete(testPath)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.DELETE);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe(testPath);
  });

  it('should use "/" as the default path if none is provided', () => {
    class TestClass {
      @Delete()
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.DELETE);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/");
  });

  it("should correctly handle a path with a trailing slash", () => {
    const trailingSlashPath = "/users/";
    class TestClass {
      @Delete(trailingSlashPath)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe(trailingSlashPath);
  });

  it("should correctly handle a path without a leading slash", () => {
    const noLeadingSlashPath = "users/profile";
    class TestClass {
      @Delete(noLeadingSlashPath)
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe(noLeadingSlashPath);
  });

  it("DeleteMapping should be an alias for Delete", () => {
    class TestClass {
      @DeleteMapping("/alias")
      testMethod() {}
    }
    const methodFunction = TestClass.prototype.testMethod;
    expect(Reflect.getMetadata(METHOD_METADATA, methodFunction)).toBe(RequestMethod.DELETE);
    expect(Reflect.getMetadata(PATH_METADATA, methodFunction)).toBe("/alias");
  });
});
