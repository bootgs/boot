import "reflect-metadata";
import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  CONTROLLER_WATERMARK
} from "@/config/constants";
import { HttpController, RestController } from "@/decorators";
import { describe, expect, it } from "vitest";

describe("HttpController Decorator", () => {
  it("should define CONTROLLER_WATERMARK, CONTROLLER_TYPE_METADATA as 'http', and PATH_METADATA within options", () => {
    const testBasePath = "/api/users";

    @HttpController(testBasePath)
    class TestControllerA {}

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
    @HttpController()
    class TestControllerB {}

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

    @RestController(aliasBasePath)
    class TestControllerC {}

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
    @HttpController(undefined)
    class TestControllerD {}

    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerD
    );
    expect(controllerOptions).toEqual({ basePath: "/" });
    expect(controllerOptions.basePath).toBe("/");
  });

  it("should correctly handle an empty string as basePath", () => {
    const emptyBasePath = "";

    @HttpController(emptyBasePath)
    class TestControllerE {}

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

    @HttpController(basePathWithTrailingSlash)
    class TestControllerF {}

    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerF
    );
    expect(controllerOptions).toEqual({ basePath: basePathWithTrailingSlash });
    expect(controllerOptions.basePath).toBe(basePathWithTrailingSlash);
  });

  it("should correctly handle a base path without a leading slash", () => {
    const basePathWithoutLeadingSlash = "dashboard";

    @HttpController(basePathWithoutLeadingSlash)
    class TestControllerG {}

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
    const numberBasePath = 123 as any;

    @HttpController(numberBasePath)
    class TestControllerH {}

    const controllerOptions = Reflect.getMetadata(
      CONTROLLER_OPTIONS_METADATA,
      TestControllerH
    );
    expect(controllerOptions).toEqual({ basePath: numberBasePath });
    expect(controllerOptions.basePath).toBe(numberBasePath);
    expect(typeof controllerOptions.basePath).toBe("number");
  });

  it("should correctly handle null as basePath (TypeScript will warn, but JS runtime allows)", () => {
    const nullBasePath = null as any;

    @HttpController(nullBasePath)
    class TestControllerI {}

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
