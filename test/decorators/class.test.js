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
import "reflect-metadata";
import { HttpController, RestController } from "@/appsscript/utils/boot";
import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  CONTROLLER_WATERMARK
} from "@/appsscript/utils/boot/config/constants";
import { describe, expect, it } from "vitest";
describe("HttpController Decorator", () => {
  it("should define CONTROLLER_WATERMARK, CONTROLLER_TYPE_METADATA as 'http', and PATH_METADATA within options", () => {
    const testBasePath = "/api/users";
    let TestControllerA = class TestControllerA {};
    TestControllerA = __decorate(
      [HttpController(testBasePath)],
      TestControllerA
    );
    const isController = Reflect.getMetadata(
      CONTROLLER_WATERMARK,
      TestControllerA
    );
    expect(isController).toBe(true);
    const controllerType = Reflect.getMetadata(
      CONTROLLER_TYPE_METADATA,
      TestControllerA
    );
    expect(controllerType).toBe("http");
    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerA
    );
    expect(controllerOptions).toEqual({ basePath: testBasePath });
    expect(controllerOptions.basePath).toBe(testBasePath);
  });
  it('should use "/" as the default base path if none is provided', () => {
    let TestControllerB = class TestControllerB {};
    TestControllerB = __decorate([HttpController()], TestControllerB);
    const isController = Reflect.getMetadata(
      CONTROLLER_WATERMARK,
      TestControllerB
    );
    expect(isController).toBe(true);
    const controllerType = Reflect.getMetadata(
      CONTROLLER_TYPE_METADATA,
      TestControllerB
    );
    expect(controllerType).toBe("http");
    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerB
    );
    expect(controllerOptions).toEqual({ basePath: "/" });
    expect(controllerOptions.basePath).toBe("/");
  });
  it("RestController should be an alias for HttpController and work the same way", () => {
    const aliasBasePath = "/products";
    let TestControllerC = class TestControllerC {};
    TestControllerC = __decorate(
      [RestController(aliasBasePath)],
      TestControllerC
    );
    const isController = Reflect.getMetadata(
      CONTROLLER_WATERMARK,
      TestControllerC
    );
    expect(isController).toBe(true);
    const controllerType = Reflect.getMetadata(
      CONTROLLER_TYPE_METADATA,
      TestControllerC
    );
    expect(controllerType).toBe("http");
    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerC
    );
    expect(controllerOptions).toEqual({ basePath: aliasBasePath });
    expect(controllerOptions.basePath).toBe(aliasBasePath);
  });
  it('should handle undefined basePath by defaulting to "/"', () => {
    let TestControllerD = class TestControllerD {};
    TestControllerD = __decorate([HttpController(undefined)], TestControllerD);
    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerD
    );
    expect(controllerOptions).toEqual({ basePath: "/" });
    expect(controllerOptions.basePath).toBe("/");
  });
  it("should correctly handle an empty string as basePath", () => {
    const emptyBasePath = "";
    let TestControllerE = class TestControllerE {};
    TestControllerE = __decorate(
      [HttpController(emptyBasePath)],
      TestControllerE
    );
    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerE
    );
    expect(controllerOptions).toEqual({ basePath: emptyBasePath });
    expect(controllerOptions.basePath).toBe(emptyBasePath);
    expect(controllerOptions.basePath).not.toBe("/");
  });
  it("should correctly handle a base path with a trailing slash", () => {
    const basePathWithTrailingSlash = "/admin/";
    let TestControllerF = class TestControllerF {};
    TestControllerF = __decorate(
      [HttpController(basePathWithTrailingSlash)],
      TestControllerF
    );
    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerF
    );
    expect(controllerOptions).toEqual({ basePath: basePathWithTrailingSlash });
    expect(controllerOptions.basePath).toBe(basePathWithTrailingSlash);
  });
  it("should correctly handle a base path without a leading slash", () => {
    const basePathWithoutLeadingSlash = "dashboard";
    let TestControllerG = class TestControllerG {};
    TestControllerG = __decorate(
      [HttpController(basePathWithoutLeadingSlash)],
      TestControllerG
    );
    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerG
    );
    expect(controllerOptions).toEqual({
      basePath: basePathWithoutLeadingSlash
    });
    expect(controllerOptions.basePath).toBe(basePathWithoutLeadingSlash);
  });
  it("should correctly handle a number as basePath (TypeScript will warn, but JS runtime allows)", () => {
    const numberBasePath = 123;
    let TestControllerH = class TestControllerH {};
    TestControllerH = __decorate(
      [HttpController(numberBasePath)],
      TestControllerH
    );
    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerH
    );
    expect(controllerOptions).toEqual({ basePath: numberBasePath });
    expect(controllerOptions.basePath).toBe(numberBasePath);
    expect(typeof controllerOptions.basePath).toBe("number");
  });
  it("should correctly handle null as basePath (TypeScript will warn, but JS runtime allows)", () => {
    const nullBasePath = null;
    let TestControllerI = class TestControllerI {};
    TestControllerI = __decorate(
      [HttpController(nullBasePath)],
      TestControllerI
    );
    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerI
    );
    expect(controllerOptions).toEqual({ basePath: nullBasePath });
    expect(controllerOptions.basePath).toBe(nullBasePath);
    expect(controllerOptions.basePath).toBeNull();
  });
  it("should not define any metadata if HttpController is not applied", () => {
    class NonDecoratedController {}
    const isController = Reflect.getMetadata(
      CONTROLLER_WATERMARK,
      NonDecoratedController
    );
    expect(isController).toBeUndefined();
    const controllerType = Reflect.getMetadata(
      CONTROLLER_TYPE_METADATA,
      NonDecoratedController
    );
    expect(controllerType).toBeUndefined();
    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      NonDecoratedController
    );
    expect(controllerOptions).toBeUndefined();
  });
});
