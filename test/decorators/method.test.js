var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
import "reflect-metadata";
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
  PutMapping,
  RequestMethod
} from "@/appsscript/utils/boot";
import {
  METHOD_METADATA,
  PATH_METADATA
} from "@/appsscript/utils/boot/config/constants";
import { describe, expect, it } from "vitest";
describe("HTTP Method Decorators", () => {
  function testHttpMethodDecorator(decorator, expectedMethod, decoratorName) {
    describe(`@${decoratorName}`, () => {
      it(`should define METHOD_METADATA and PATH_METADATA with a given path for ${decoratorName}`, () => {
        const testPath = "/custom-path";
        class TestClass {
          testMethod() {}
        }
        __decorate(
          [
            decorator(testPath),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
          ],
          TestClass.prototype,
          "testMethod",
          null
        );
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
          testMethod() {}
        }
        __decorate(
          [
            decorator(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
          ],
          TestClass.prototype,
          "testMethod",
          null
        );
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
          testMethod() {}
        }
        __decorate(
          [
            decorator(undefined),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
          ],
          TestClass.prototype,
          "testMethod",
          null
        );
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
          testMethod() {}
        }
        __decorate(
          [
            decorator(emptyPath),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
          ],
          TestClass.prototype,
          "testMethod",
          null
        );
        const methodFunction = TestClass.prototype.testMethod;
        const definedPath = Reflect.getMetadata(PATH_METADATA, methodFunction);
        expect(definedPath).toBe("/");
      });
      it(`should correctly handle a path with a trailing slash for ${decoratorName}`, () => {
        const trailingSlashPath = "/users/";
        class TestClass {
          testMethod() {}
        }
        __decorate(
          [
            decorator(trailingSlashPath),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
          ],
          TestClass.prototype,
          "testMethod",
          null
        );
        const methodFunction = TestClass.prototype.testMethod;
        const definedPath = Reflect.getMetadata(PATH_METADATA, methodFunction);
        expect(definedPath).toBe(trailingSlashPath);
      });
      it(`should correctly handle a path without a leading slash for ${decoratorName}`, () => {
        const noLeadingSlashPath = "users/profile";
        class TestClass {
          testMethod() {}
        }
        __decorate(
          [
            decorator(noLeadingSlashPath),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
          ],
          TestClass.prototype,
          "testMethod",
          null
        );
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
          method1() {}
          method2() {}
        }
        __decorate(
          [
            decorator("/method1"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
          ],
          TestClass.prototype,
          "method1",
          null
        );
        __decorate(
          [
            Get("/method2"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
          ],
          TestClass.prototype,
          "method2",
          null
        );
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
