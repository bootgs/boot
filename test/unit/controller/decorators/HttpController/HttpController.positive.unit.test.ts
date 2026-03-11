import "reflect-metadata";
import { describe, expect, it } from "vitest";
import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  CONTROLLER_WATERMARK
} from "src/domain/constants";
import { HttpController, RestController } from "src/controller/decorators";

describe("HttpController Decorator: Positive", () => {
  it("should define CONTROLLER_WATERMARK, CONTROLLER_TYPE_METADATA as 'http', and PATH_METADATA within options", () => {
    const testBasePath = "/api/users";
    @HttpController(testBasePath)
    class TestControllerA {}

    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, TestControllerA)).toBe(true);
    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestControllerA)).toBe("http");
    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestControllerA)).toEqual({
      basePath: testBasePath
    });
  });

  it('should use "/" as the default base path if none is provided', () => {
    @HttpController()
    class TestControllerB {}

    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, TestControllerB)).toBe(true);
    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestControllerB)).toEqual({
      basePath: "/"
    });
  });

  it("RestController should be an alias for HttpController", () => {
    const aliasBasePath = "/products";
    @RestController(aliasBasePath)
    class TestControllerC {}

    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, TestControllerC)).toBe(true);
    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestControllerC)).toEqual({
      basePath: aliasBasePath
    });
  });

  it("should correctly handle a base path with a trailing slash", () => {
    const basePathWithTrailingSlash = "/admin/";
    @HttpController(basePathWithTrailingSlash)
    class TestControllerF {}

    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestControllerF)).toEqual({
      basePath: basePathWithTrailingSlash
    });
  });

  it("should correctly handle a base path without a leading slash", () => {
    const basePathWithoutLeadingSlash = "dashboard";
    @HttpController(basePathWithoutLeadingSlash)
    class TestControllerG {}

    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestControllerG)).toEqual({
      basePath: basePathWithoutLeadingSlash
    });
  });
});
