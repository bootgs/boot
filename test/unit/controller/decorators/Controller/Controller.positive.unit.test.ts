import "reflect-metadata";
import { describe, expect, it } from "vitest";
import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  CONTROLLER_WATERMARK
} from "src/domain/constants";
import { Controller } from "src/controller/decorators";

describe("@Controller: Positive", () => {
  it("should define correct metadata", () => {
    const type = "custom";
    const options = { basePath: "/custom" };

    @Controller(type, options)
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_WATERMARK, TestController)).toBe(true);
    expect(Reflect.getMetadata(CONTROLLER_TYPE_METADATA, TestController)).toBe(type);
    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestController)).toEqual(options);
  });

  it("should use empty options by default", () => {
    @Controller("simple")
    class TestController {}

    expect(Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA, TestController)).toEqual({});
  });
});
