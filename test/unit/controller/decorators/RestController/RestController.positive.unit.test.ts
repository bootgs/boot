import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { CONTROLLER_OPTIONS_METADATA, CONTROLLER_TYPE_METADATA, CONTROLLER_WATERMARK } from "src/domain/constants";
import { RestController } from "src/controller/decorators";

describe("@RestController: Positive", () => {
  it("should define correct metadata", () => {
    const basePath = "/api";

    @RestController(basePath)
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, TestController)).toBe(true);
    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe("http");
    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestController)).toEqual({ basePath });
  });

  it('should use "/" as default base path', () => {
    @RestController()
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestController)).toEqual({
      basePath: "/"
    });
  });
});
