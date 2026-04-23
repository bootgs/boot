import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { CONTROLLER_TYPE_METADATA, CONTROLLER_WATERMARK } from "src/domain/constants";
import { DocController, DocsController } from "src/controller/decorators";

describe("DocController Decorator: Positive", () => {
  it("should define correct metadata", () => {
    @DocController()
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, TestController)).toBe(true);
    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe("docs");
  });

  it("DocsController should be an alias", () => {
    @DocsController()
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe("docs");
  });
});
