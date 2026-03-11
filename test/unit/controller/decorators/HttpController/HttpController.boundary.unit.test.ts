import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { CONTROLLER_OPTIONS_METADATA } from "src/domain/constants";
import { HttpController } from "src/controller/decorators";

describe("HttpController Decorator: Boundary", () => {
  it('should handle undefined basePath by defaulting to "/"', () => {
    @HttpController(undefined)
    class TestControllerD {}

    const controllerOptions = Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestControllerD);
    expect(controllerOptions).toEqual({ basePath: "/" });
  });

  it("should correctly handle an empty string as basePath", () => {
    const emptyBasePath = "";
    @HttpController(emptyBasePath)
    class TestControllerE {}

    const controllerOptions = Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestControllerE);
    expect(controllerOptions).toEqual({ basePath: emptyBasePath });
  });

  it("should correctly handle a number as basePath", () => {
    const numberBasePath = 123 as unknown as string;
    @HttpController(numberBasePath)
    class TestControllerH {}

    const controllerOptions = Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestControllerH);
    expect(controllerOptions).toEqual({ basePath: numberBasePath });
  });

  it("should correctly handle null as basePath", () => {
    const nullBasePath = null as unknown as string;
    @HttpController(nullBasePath)
    class TestControllerI {}

    const controllerOptions = Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestControllerI);
    expect(controllerOptions).toEqual({ basePath: nullBasePath });
  });
});
