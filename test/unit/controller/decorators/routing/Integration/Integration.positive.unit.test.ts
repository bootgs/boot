import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "src/domain/constants";
import { Get, Post } from "src/controller/decorators/routing";
import { RequestMethod } from "src/domain/enums";

describe("HTTP Method Decorators: Integration", () => {
  it("should not interfere with metadata of other methods in the same class", () => {
    class TestClass {
      @Post("/method1")
      method1() {}

      @Get("/method2")
      method2() {}
    }

    const method1Function = TestClass.prototype.method1;
    const method2Function = TestClass.prototype.method2;

    const method1Path = Reflect.getMetadata(PATH_METADATA, method1Function);
    const method1Method = Reflect.getMetadata(METHOD_METADATA, method1Function);
    expect(method1Path).toBe("/method1");
    expect(method1Method).toBe(RequestMethod.POST);

    const method2Path = Reflect.getMetadata(PATH_METADATA, method2Function);
    const method2Method = Reflect.getMetadata(METHOD_METADATA, method2Function);
    expect(method2Path).toBe("/method2");
    expect(method2Method).toBe(RequestMethod.GET);
  });
});
