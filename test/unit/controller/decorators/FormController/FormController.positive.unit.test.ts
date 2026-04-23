import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { CONTROLLER_TYPE_METADATA, CONTROLLER_WATERMARK } from "src/domain/constants";
import { FormController, FormsController } from "src/controller/decorators";

describe("FormController Decorator: Positive", () => {
  it("should define correct metadata", () => {
    @FormController()
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, TestController)).toBe(true);
    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe("forms");
  });

  it("FormsController should be an alias", () => {
    @FormsController()
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe("forms");
  });
});
