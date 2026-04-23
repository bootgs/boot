import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { CONTROLLER_TYPE_METADATA, CONTROLLER_WATERMARK } from "src/domain/constants";
import { SlideController, SlidesController } from "src/controller/decorators";

describe("SlideController Decorator: Positive", () => {
  it("should define correct metadata", () => {
    @SlideController()
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, TestController)).toBe(true);
    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe("slides");
  });

  it("SlidesController should be an alias", () => {
    @SlidesController()
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe("slides");
  });
});
