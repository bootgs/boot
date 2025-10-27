import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { METHOD_METADATA, PATH_METADATA } from "../../src/config/constants";
import {
  Delete,
  DeleteMapping,
  Get,
  GetMapping,
  Head,
  HeadMapping,
  Options,
  OptionsMapping,
  Patch,
  PatchMapping,
  Post,
  PostMapping,
  Put,
  PutMapping
} from "../../src/decorators";
import { RequestMethod } from "../../src/types";

describe("HTTP Method Decorators", () => {
  function testHttpMethodDecorator(
    decorator: (path?: string) => MethodDecorator,
    expectedMethod: RequestMethod,
    decoratorName: string
  ) {
    describe(`@${decoratorName}`, () => {
      it(`should define METHOD_METADATA and PATH_METADATA with a given path for ${decoratorName}`, () => {
        const testPath = "/custom-path";

        class TestClass {
          @decorator(testPath)
          testMethod() {}
        }

        const methodFunction = TestClass.prototype.testMethod;

        const definedMethod = Reflect.getMetadata(
          METHOD_METADATA,
          methodFunction
        );
        expect(definedMethod).toBe(expectedMethod);

        const definedPath = Reflect.getMetadata(PATH_METADATA, methodFunction);
        expect(definedPath).toBe(testPath);
      });

      it(`should use "/" as the default path if none is provided for ${decoratorName}`, () => {
        class TestClass {
          @decorator()
          testMethod() {}
        }

        const methodFunction = TestClass.prototype.testMethod;

        const definedMethod = Reflect.getMetadata(
          METHOD_METADATA,
          methodFunction
        );
        expect(definedMethod).toBe(expectedMethod);

        const definedPath = Reflect.getMetadata(PATH_METADATA, methodFunction);
        expect(definedPath).toBe("/");
      });

      it(`should handle undefined path by defaulting to "/" for ${decoratorName}`, () => {
        class TestClass {
          @decorator(undefined)
          testMethod() {}
        }

        const methodFunction = TestClass.prototype.testMethod;

        const definedMethod = Reflect.getMetadata(
          METHOD_METADATA,
          methodFunction
        );
        expect(definedMethod).toBe(expectedMethod);

        const definedPath = Reflect.getMetadata(PATH_METADATA, methodFunction);
        expect(definedPath).toBe("/");
      });

      it(`should correctly handle an empty string as path for ${decoratorName}`, () => {
        const emptyPath = "";

        class TestClass {
          @decorator(emptyPath)
          testMethod() {}
        }

        const methodFunction = TestClass.prototype.testMethod;

        const definedPath = Reflect.getMetadata(PATH_METADATA, methodFunction);
        expect(definedPath).toBe("/");
      });

      it(`should correctly handle a path with a trailing slash for ${decoratorName}`, () => {
        const trailingSlashPath = "/users/";

        class TestClass {
          @decorator(trailingSlashPath)
          testMethod() {}
        }

        const methodFunction = TestClass.prototype.testMethod;

        const definedPath = Reflect.getMetadata(PATH_METADATA, methodFunction);
        expect(definedPath).toBe(trailingSlashPath);
      });

      it(`should correctly handle a path without a leading slash for ${decoratorName}`, () => {
        const noLeadingSlashPath = "users/profile";

        class TestClass {
          @decorator(noLeadingSlashPath)
          testMethod() {}
        }

        const methodFunction = TestClass.prototype.testMethod;

        const definedPath = Reflect.getMetadata(PATH_METADATA, methodFunction);
        expect(definedPath).toBe(noLeadingSlashPath);
      });

      it("should not define metadata if the decorator is not applied to the method", () => {
        class TestClass {
          anotherMethod() {}
        }

        const methodFunction = TestClass.prototype.anotherMethod;

        const definedMethod = Reflect.getMetadata(
          METHOD_METADATA,
          methodFunction
        );
        expect(definedMethod).toBeUndefined();

        const definedPath = Reflect.getMetadata(PATH_METADATA, methodFunction);
        expect(definedPath).toBeUndefined();
      });

      it("should not interfere with metadata of other methods in the same class", () => {
        class TestClass {
          @decorator("/method1")
          method1() {}

          @Get("/method2")
          method2() {}
        }

        const method1Function = TestClass.prototype.method1;
        const method2Function = TestClass.prototype.method2;

        const method1Path = Reflect.getMetadata(PATH_METADATA, method1Function);
        const method1Method = Reflect.getMetadata(
          METHOD_METADATA,
          method1Function
        );
        expect(method1Path).toBe("/method1");
        expect(method1Method).toBe(expectedMethod);

        const method2Path = Reflect.getMetadata(PATH_METADATA, method2Function);
        const method2Method = Reflect.getMetadata(
          METHOD_METADATA,
          method2Function
        );
        expect(method2Path).toBe("/method2");
        expect(method2Method).toBe(RequestMethod.GET);
      });
    });
  }

  testHttpMethodDecorator(Get, RequestMethod.GET, "Get");
  testHttpMethodDecorator(Post, RequestMethod.POST, "Post");
  testHttpMethodDecorator(Put, RequestMethod.PUT, "Put");
  testHttpMethodDecorator(Delete, RequestMethod.DELETE, "Delete");
  testHttpMethodDecorator(Patch, RequestMethod.PATCH, "Patch");
  testHttpMethodDecorator(Options, RequestMethod.OPTIONS, "Options");
  testHttpMethodDecorator(Head, RequestMethod.HEAD, "Head");

  testHttpMethodDecorator(GetMapping, RequestMethod.GET, "GetMapping");
  testHttpMethodDecorator(PostMapping, RequestMethod.POST, "PostMapping");
  testHttpMethodDecorator(PutMapping, RequestMethod.PUT, "PutMapping");
  testHttpMethodDecorator(DeleteMapping, RequestMethod.DELETE, "DeleteMapping");
  testHttpMethodDecorator(PatchMapping, RequestMethod.PATCH, "PatchMapping");
  testHttpMethodDecorator(
    OptionsMapping,
    RequestMethod.OPTIONS,
    "OptionsMapping"
  );
  testHttpMethodDecorator(HeadMapping, RequestMethod.HEAD, "HeadMapping");
});
